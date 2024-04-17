import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/user_email';
import { transact, RecordNotFoundError } from 'src/infra/rdb'

export type ChangeEmail = (rdbSource: DataSource, loginUser: User, email: string) => Promise<User | RecordNotFoundError>;
export const changeEmail: ChangeEmail = async (rdbSource, loginUser, email) => {
  return transact({ userRepo: User, emailRepo: UserEmail }, rdbSource, async (repos) => {
    const userEmail = repos.emailRepo.findOne({
      where: {
        user_id: loginUser.id,
        email: email,
        verified: Not(IsNull()),
      },
    });
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { user_id: loginUser.id, email: email }, 'email is not verified!');
    }

    await repos.userRepo.update({
      user_id: loginUser.id,
    },{
      email: email,
    });

    return await repos.userRepo.findOne({
      where: {
        user_id: loginUser.id,
      }
    });
  });
};
