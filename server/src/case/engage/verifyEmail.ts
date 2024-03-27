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

export const verifyEmail = async (rdbConnection, loginUser: User, register_session_id: string, email: string, email_pin: string): Promis<null | RecordNotFoundError> => {

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
