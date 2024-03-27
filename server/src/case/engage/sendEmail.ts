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

export const sendEmail = async (rdbConnection, loginUser: User | null, email: string): Promise<string | RecordAlreadyExistError> => {

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
