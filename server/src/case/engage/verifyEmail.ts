import { EntityManager, DataSource, Raw } from 'typeorm';
import { User } from 'src/entity/user.js';
import { UserEmail } from 'src/entity/userEmail.js';
import { transact, RecordNotFoundError } from 'src/infra/rdb.js';

export type VerifyEmail = (
  rdbSource: DataSource,
  loginUser: User,
  register_session_id: number,
  email: string,
  email_pin: number,
) => Promise<UserEmail | null | RecordNotFoundError>;
export const verifyEmail: VerifyEmail = async (rdbSource, loginUser, registerSessionId, email, emailPin) => {
  return await transact(rdbSource, async manager => {
    const userEmail = await getUserEmail(manager, loginUser, email, emailPin, registerSessionId);
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { email }, 'email is not found or pin is not correct!');
    }

    await manager.update(
      UserEmail,
      {
        user_id: userEmail.user_id,
        email: userEmail.email,
      },
      {
        verified_date: new Date(),
      },
    );

    return manager.findOne(UserEmail, {
      where: {
        user_id: userEmail.user_id,
        email: userEmail.email,
      },
    });
  });
};

// select *
//   from user as u
//  inner join user_email as ue
//          on u.user_id = ue.user_id
//  where ue.email = <email>
//    and ue.email_pin = <email_pin>
//    and ue.assign_expired_date < now()
//    and (u.user_id = <user_id> or u.register_session_id = <register_session_id>)
//      ;
type GetUserEmail = (
  manager: EntityManager,
  user: User | null,
  email: string,
  emailPin: number,
  registerSessionId: number | null,
) => Promise<UserEmail | null>;
const getUserEmail: GetUserEmail = async (manager, user, email, emailPin, registerSessionId) => {
  return await manager.findOne(UserEmail, {
    relations: ['user'],
    where: {
      email: email,
      email_pin: emailPin,
      assign_expired_date: Raw(alias => `${alias} > NOW()`),
      user: user
        ? {
            user_id: user.user_id,
          }
        : {
            register_session_id: registerSessionId,
          },
    },
  });
};
