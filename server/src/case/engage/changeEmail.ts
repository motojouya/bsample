import { Repository, DataSource, Not, IsNull } from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/userEmail';
import { transact, RecordNotFoundError } from 'src/infra/rdb'

export type ChangeEmail = (rdbSource: DataSource, loginUser: User, email: string) => Promise<User | RecordNotFoundError>;
export const changeEmail: ChangeEmail = async (rdbSource, loginUser, email) => {
  return transact(rdbSource, async (manager) => {
    const userEmail = manager.findOne(UserEmail, {
      where: {
        user_id: loginUser.user_id,
        email: email,
        verified_date: Not(IsNull()),
      },
    });
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { user_id: loginUser.user_id, email: email }, 'email is not verified!');
    }

    await manager.update(User, {
      user_id: loginUser.user_id,
    },{
      email: email,
    });

    return await manager.findOne(User, {
      where: {
        user_id: loginUser.user_id,
      }
    });
  });
};
