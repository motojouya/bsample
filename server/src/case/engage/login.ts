import { Repository } from 'typeorm';
import { User } from './user';
import { UserEmail } from './user_email';
import { UserPassword } from './user_password';

export class RecordAlreadyExistError {
  constructor(
    readonly table: string,
    readonly data: object,
    readonly message: string,
  ) {}
}

export class RecordNotFoundError {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) {}
}

const sendEmail = async (rdbConnection, loginUser: User | null, email: string): Promise<string | RecordAlreadyExistError> => {

  // TODO ここでは、assignされておらず、かつassign_expiredされていないemailを探す
  // select *
  //   from user_email as ue
  //   left outer join user as u
  //                on ue.user_id = u.user_id
  //               and ue.email = u.email
  //  where (u.id is not null or ue.assign_expired_date > now())
  //      ;
  const sameEmail = await this.userEmailRepository.findOne({
    email: email,
    assign_expired_date: new Date(),
  });
  if (sameEmail) {
    return new RecordAlreadyExistError('user_email', sameEmail, 'email exists already!');
  }

  let registerSessionId = null;
  let user = loginUser;
  if (!user) {
    registerSessionId = ''; // TODO ramdome
    user = await this.userRepository.create({ 
      identifier: null,
      name: null,
      register_session_id: registerSessionId,
      email: null,
      active: false,
    });
  }

  const email_pin = ''; // TODO random
  await this.userEmailRepository.create({ 
    user_id: user.id
    email: email
    email_pin: email_pin,
    verified_date: null,
    assign_expired_date: (new Date()).add(HOUR, 1),
  });

  const error = await mailService.sendEmailPin(email, email_pin, user.name);
  if (error) {
    return error;
  }

  return registerSessionId;
}

const verifyEmail = async (rdbConnection, loginUser: User, register_session_id: string, email: string, email_pin: string): Promis<null | RecordNotFoundError> => {

  let user = loginUser;
  let userEmail = null;
  // select *
  //   from user as u
  //  inner join user_email as ue
  //          on u.user_id = ue.user_id
  //  where ue.email = <email>
  //    and assign_expired_date < now()
  if (user) {
    //    and u.user_id = <user_id>
    userEmail = await this.userEmailRepository.get({ 
      user_id: user.id
      email: email,
      email_pin: email_pin,
      assign_expired_date: new Date(),
    });
  } else {
    //    and u.register_session_id = <register_session_id>
    userEmail = await this.userEmailRepository.get({ 
      register_session_id: register_session_id
      email: email,
      email_pin: email_pin,
      assign_expired_date: new Date(),
    });
  }

  if (!userEmail) {
    return new RecordNotFoundError('user_email', { email }, 'email is not found or pin is not correct!');
  }

  await this.userEmailRepository.update({ 
    user_id: userEmail.user_id
    email: userEmail.email,
    verified_date: new Date(),
  });

  return null;
}

const register = async (rdbConnection, register_session_id, name, email, password): Promise<User | RecordNotFoundError> => {

  // TODO register_session_idをexpiredさせるタイミングがあったほうがいいかも
  const user = await this.userRepository.get({
    register_session_id: register_session_id,
  });
  if (!user) {
    return new RecordNotFoundError('user', { register_session_id }, 'user is not found!');
  }

  const userEmail = await this.userEmailRepository.get({
    user_id: user.id
    email,
    verified: true,
  });
  if (!userEmail) {
    return new RecordNotFoundError('user_email', { user_id: user.id, email: email, }, 'user_email is not found!');
  }

  const user = await this.userRepository.update({
    user_id: user.id,
    identifier: email,
    name: name,
    email: email,
  });

  await this.userPasswordRepositry.create({
    user_id: user.id,
    password: password,
  });

  return user;
}

const changeUserInformation = async (rdbConnection, loginUser: User, name: string): Promise<User> => {
  await this.userRepository.update({
    user_id: loginUser.id,
    name: name,
  });

  return await this.userRepository.get({
    user_id: loginUser.id,
  });
}

const changePassword = async (rdbConnection, loginUser: User, password: string): Promise<User> => {
  await this.userPasswordRepository.update({
    user_id: loginUser.id,
    password: password, // TODO 暗号化
  });

  return await this.userRepository.get({
    user_id: loginUser.id,
  });
}

const changeEmail = async (rdbConnection, loginUser: User, email: string): Promise<User | RecordNotFoundError> => {
  const userEmail = this.userEmailRepository.get({
    user_id: loginUser.id
    email,
    verified: true,
  });
  if (!userEmail) {
    return new RecordNotFoundError('user_email', { user_id: loginUser.id, email: email }, 'email is not verified!');
  }

  this.userRepository.update({
    user_id: loginUser.id,
    email: email,
  });

  return await this.userRepository.get({
    user_id: loginUser.id,
  });
}
