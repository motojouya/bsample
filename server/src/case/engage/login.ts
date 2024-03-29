import { Repository } from 'typeorm';
import { User } from './user';
import { UserEmail } from './user_email';
import { UserPassword } from './user_password';
import { transact, RecordAlreadyExistError, RecordNotFoundError } from 'src/infra/rdb'
import { Repository, DataSource, Entity } from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/user_email';
import { UserPassword } from 'src/entity/user_password';
import { transact } from 'src/infra/rdb'


const login = async (rdbSource, loginUser: User | null, email: string): Promise<string | RecordAlreadyExistError> => {

  return await transact({ user: User }, rdbSource, async (repos) => {
    return repos.user.find({
      where: {
        user_id: loginUser.user_id,
      }
    });
  })
  return await transact(rdbSource, async (tem) => {
    const userRepository: Repository<User> = tem.getRepository(User);
    return userRepository.find({
      where: {
        user_id: loginUser.user_id,
      }
    });
  })
  // TODO ここでは、assignされておらず、かつassign_expiredされていないemailを探す
  // select *
  //   from user_email as ue
  //   left outer join user as u
  //                on ue.user_id = u.user_id
  //               and ue.email = u.email
  //  where (u.id is not null or ue.assign_expired_date > now())
  //      ;
  const sameEmail = await this.userEmailRepository.findOne({
    email: email,
    assign_expired_date: new Date(),
  });
  if (sameEmail) {
    return new RecordAlreadyExistError('user_email', sameEmail, 'email exists already!');
  }

  let registerSessionId = null;
  let user = loginUser;
  if (!user) {
    registerSessionId = ''; // TODO ramdome
    user = await this.userRepository.create({ 
      identifier: null,
      name: null,
      register_session_id: registerSessionId,
      email: null,
      active: false,
    });
  }

  const email_pin = ''; // TODO random
  await this.userEmailRepository.create({ 
    user_id: user.id
    email: email
    email_pin: email_pin,
    verified_date: null,
    assign_expired_date: (new Date()).add(HOUR, 1),
  });

  const error = await mailService.sendEmailPin(email, email_pin, user.name);
  if (error) {
    return error;
  }

  return registerSessionId;
};
