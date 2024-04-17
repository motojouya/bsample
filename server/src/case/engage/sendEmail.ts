import { EntityManager, DataSource } from 'typeorm';
import { User } from 'entity/user';
import { UserEmail } from 'entity/user_email';
import { transact, RecordAlreadyExistError } from 'infra/rdb'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export type SendEmail = (rdbSource: DataSource, mailer: Mailer, loginUser: User | null, email: string) => Promise<string | RecordAlreadyExistError>;
export const sendEmail: SendEmail = async (rdbSource, mailer, loginUser, email) => {
  return await transact(rdbSource, async (manager) => {
    const duplicatedEmail = getDuplicatedEmail(manager, email);
    if (duplicatedEmail) {
      return new RecordAlreadyExistError('user_email', duplicatedEmail, 'email exists already!');
    }

    let registerSessionId = null;
    let user = loginUser;
    if (!user) {
      registerSessionId = getRandomInt(10000); // TODO UID
      user = await manager.create(User, {
        identifier: null,
        name: null,
        register_session_id: registerSessionId,
        email: null,
        active: false,
      });
    }

    const email_pin = getRandomInt(999999);
    await manager.create(UserEmail, {
      user_id: user.user_id,
      email: email,
      email_pin: email_pin,
      verified_date: null,
      assign_expired_date: (new Date()).add(HOUR, 1),
    });

    const error = await mailer.send(email, `PINコードの送付 PIN:${email_pin}`, "PINコードを送付します");
    if (error) {
      return error;
    }

    return registerSessionId;
  });
};

type GetDuplicatedEmail = (manager: EntityManager, email: string) => Promise<UserEmail | null>
const getDuplicatedEmail: GetDuplicatedEmail = async (manager, email) => {
  // TODO ここでは、assignされておらず、かつassign_expiredされていないemailを探す
  // select *
  //   from user_email as ue
  //   left outer join user as u
  //                on ue.user_id = u.user_id
  //               and ue.email = u.email
  //  where (u.id is not null or ue.assign_expired_date > now())
  //      ;
  return await manager.findOne(UserEmail, {
    join: {
      alias: "email",
      leftOuterJoin: { user: "email.user" },
      // where: { "user.user_id": "email.user_id" },
      where: (qb: SelectQueryBuilder<User>) => {
        qb
          .where("email.email = user.email")
          .andWhere("email.user_id = user.user_id");
      },
    },
    where: (qb: SelectQueryBuilder<User>) => {
      qb
        .where("email.email = :email", { email: email })
        .andWhere(sub => {
          sub
            .where("user.id is not null")
            .orWhere("ue.assign_expired_date > now()");
        });
    },
  });
};

