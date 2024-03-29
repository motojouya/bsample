import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entity/user';
import { transact } from 'src/infra/rdb'

export type GetUser = (rdbSource: DataSource, loginUser: User | null) => Promise<User | null>
export const getUser: GetUser = async (rdbSource, loginUser) => {
  if (!loginUser) {
    return null;
  }
  const userRepository: Repository<User> = rdbSource.getRepository(User);
  return userRepository.find({
    where: {
      user_id: loginUser.user_id,
    }
  });
}
