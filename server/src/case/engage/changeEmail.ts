import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/user_email';
import { transact, RecordNotFoundError } from 'src/infra/rdb'

export type ChangeEmail = (rdbSource: DataSource, loginUser: User, email: string): Promise<User | RecordNotFoundError>;
export const changeEmail: ChangeEmail = async (rdbSource, loginUser, email) => {
  return transact({ user: User, email: UserEmail }, rdbSource, async (repos) => {
    const userEmail = repos.email.findOne({
      where: {
        user_id: loginUser.id
        email,
        verified: Not(IsNull()),
      },
    });
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { user_id: loginUser.id, email: email }, 'email is not verified!');
    }

    await repos.user.update({
      user_id: loginUser.id,
    },{
      email: email,
    });

    return await repos.user.findOne({
      where: {
        user_id: loginUser.id,
      }
    });
  });
};
