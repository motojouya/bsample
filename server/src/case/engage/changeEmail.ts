import { Repository } from 'typeorm';
import { User } from './user';
import { UserEmail } from './user_email';

export class RecordNotFoundError {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) {}
}

export const changeEmail = async (rdbConnection, loginUser: User, email: string): Promise<User | RecordNotFoundError> => {
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
