import { Repository } from 'typeorm';
import { User } from './user';
import { UserEmail } from './user_email';
import { UserPassword } from './user_password';

export const changeUserInformation = async (rdbConnection, loginUser: User, name: string): Promise<User> => {
  await this.userRepository.update({
    user_id: loginUser.id,
    name: name,
  });

  return await this.userRepository.get({
    user_id: loginUser.id,
  });
}
