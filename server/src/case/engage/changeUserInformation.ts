import { Repository, DataSource } from 'typeorm';
import { User } from 'entity/user';
import { transact } from 'infra/rdb'

export type ChangeUserInformation = (rdbSource: DataSource, loginUser: User, name: string) => Promise<User>;
export const changeUserInformation: ChangeUserInformation = async (rdbSource, loginUser, name) => {
  return transact(rdbSource, async (manager) => {
    await manager.update(User, {
      user_id: loginUser.user_id,
    },{
      name: name,
    });

    return await manager.findOne(User, {
      where: {
        user_id: loginUser.user_id,
      }
    });
  });
}
