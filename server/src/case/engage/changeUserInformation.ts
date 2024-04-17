import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entity/user';
import { transact } from 'src/infra/rdb'

export type ChangeUserInformation = (rdbSource: DataSource, loginUser: User, name: string) => Promise<User>;
export const changeUserInformation: ChangeUserInformation = async (rdbSource, loginUser, name) => {
  return transact({ userRepo: User }, rdbSource, (repos) => {
    await repos.userRepo.update({
      user_id: loginUser.id,
    },{
      name: name,
    });

    return await repos.useruserRepo.findOne({
      where: {
        user_id: loginUser.id,
      }
    });
  });
}
