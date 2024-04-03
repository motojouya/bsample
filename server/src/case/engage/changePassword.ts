import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/user_email';
import { UserPassword } from 'src/entity/user_password';
import { transact } from 'src/infra/rdb'

export type ChangePassword = (rdbSource: DataSource, loginUser: User, password: string) => Promise<User>;
export const changePassword: ChangePassword = async (rdbSource, loginUser, password) => {
  return transact({ password: UserPassword, user: User }, rdbSource, (repos) => {
    await repos.password.update({
      user_id: loginUser.id,
    }, {
      password: password, // TODO 暗号化
    });

    return await repos.password.user.findOne({
      where: {
        user_id: loginUser.id,
      },
    });
  });
}
