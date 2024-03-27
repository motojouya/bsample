import { Repository } from 'typeorm';
import { User } from './user';
import { UserEmail } from './user_email';
import { UserPassword } from './user_password';

export class RecordNotFoundError {
  constructor(
    readonly table: string,
    readonly keys: object,
    readonly message: string,
  ) {}
}

export const changePassword = async (rdbConnection, loginUser: User, password: string): Promise<User> => {
  await this.userPasswordRepository.update({
    user_id: loginUser.id,
    password: password, // TODO 暗号化
  });

  return await this.userRepository.get({
    user_id: loginUser.id,
  });
}
