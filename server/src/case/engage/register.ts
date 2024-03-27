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

export const register = async (rdbConnection, register_session_id, name, email, password): Promise<User | RecordNotFoundError> => {

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
