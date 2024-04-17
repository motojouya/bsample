import {
  Repository,
  DataSource,
  Not,
  IsNull
} from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/user_email';
import { UserPassword } from 'src/entity/user_password';
import { transact, RecordNotFoundError } from 'src/infra/rdb'

export type Register = (
  rdbConnection: DataSource,
  register_session_id: string,
  name: string,
  email: string,
  password: string
) => Promise<User | RecordNotFoundError>;
export const register: Register = async (rdbConnection, register_session_id, name, email, password): Promise<User | RecordNotFoundError> => {

  return await transact({ userRepo: User, emailRepo: UserEmail, passwordRepo: UserPassword }, rdbSource, async (repos) => {
    // TODO register_session_idをexpiredさせるタイミングがあったほうがいいかも
    const user = await repos.userRepo.findOne({
      where: {
        register_session_id: register_session_id,
      }
    });
    if (!user) {
      return new RecordNotFoundError('user', { register_session_id }, 'user is not found!');
    }

    const userEmail = await repos.emailRepo.findOne({
      where: {
        user_id: user.id,
        email,
        verified_date: Not(IsNull()),
      },
    });
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { user_id: user.id, email: email, }, 'user_email is not found!');
    }

    await repos.userRepo.update({
      user_id: user.id,
    },{
      identifier: email,
      name: name,
      email: email,
    });

    await repos.passwordRepo.create({
      user_id: user.id,
      password: password,
    });

    return await repos.userRepo.findOne({
      where: {
        user_id: user.id,
      }
    });
  });
};
