import { Repository, DataSource } from 'typeorm';
import { User } from 'src/entity/user';
import { UserEmail } from 'src/entity/user_email';
import { transact, RecordNotFoundError } from 'src/infra/rdb'

export type VerifyEmail = (
  rdbSource: DataSource,
  loginUser: User,
  register_session_id: string,
  email: string,
  email_pin: string
) => Promise<null | RecordNotFoundError>;
export const verifyEmail: VerifyEmail = async (rdbSource, loginUser, registerSessionId, email, emailPin) => {
  return await transact({ user: User, email: UserEmail }, rdbSource, async (repos) => {
    const userEmail = getUserEmail(repos.email, loginUser, email, emailPin, registerSessionId);
    if (!userEmail) {
      return new RecordNotFoundError('user_email', { email }, 'email is not found or pin is not correct!');
    }

    await repos.email.update({
      user_id: userEmail.user_id
      email: userEmail.email,
    },{
      verified_date: new Date(),
    });

    return null;
  });
}

type GetUserEmail = (
  emailRepository: Repository<UserEmail>,
  user: User | null,
  email: string,
  emailPin: string
  registerSessionId: string | null,
) => Primise<UserEmail | null>;
const getUserEmail: GetUserEmail = (emailRepository, user, email, emailPin, registerSessionId) => {
  // select *
  //   from user as u
  //  inner join user_email as ue
  //          on u.user_id = ue.user_id
  //  where ue.email = <email>
  //    and assign_expired_date < now()
  //    and (u.user_id = <user_id> or u.register_session_id = <register_session_id>)
  return await emailRepository.findOne({
    join: {
      alias: "email",
      leftOuterJoin: { user: "email.user" },
      // where: { "user.user_id": "email.user_id" },
      // where: (qb: SelectQueryBuilder<User>) => {
      //   qb.andWhere("email.user_id = user.user_id");
      // },
    },
    where: (qb: SelectQueryBuilder<User>) => {
      qb
        .where("email.email = :email", { email: email })
        .andWhere("email.assign_expired_date < now()")
        .andWhere("email.email_pin = emailPin", { emailPin: emailPin });

      if (user) {
        qb.andWhere("user.user_id = :userId", { userId: user.id });
      } else {
        qb.andWhere("user.register_session_id = :registerSessionId", { registerSessionId: registerSessionId });
      }
    },
  });
};

