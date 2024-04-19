import { EntityManager, DataSource, Raw } from 'typeorm';
import { User } from 'src/entity/user.js';
import { UserEmail } from 'src/entity/userEmail.js';
import { transact, RecordAlreadyExistError } from 'src/infra/rdb.js';
import { Mailer, MailSendError } from 'src/infra/mail.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export type AnonymousUser = {
  register_session_id: number | null,
  email: string,
};

export type SendEmail = (rdbSource: DataSource, mailer: Mailer, loginUser: User | null, email: string) => Promise<AnonymousUser | RecordAlreadyExistError | MailSendError>;
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
    const assignExpiredDate = new Date();
    assignExpiredDate.setHours(assignExpiredDate.getHours() + 1);

    await manager.create(UserEmail, {
      user_id: user.user_id,
      email: email,
      email_pin: email_pin,
      verified_date: null,
      assign_expired_date: assignExpiredDate,
    });

    const error = await mailer.send(email, `PINコードの送付 PIN:${email_pin}`, "PINコードを送付します");
    if (error) {
      return error;
    }

    return {
      register_session_id: registerSessionId,
      email: email,
    };
  });
};

// TODO ここでは、assignされておらず、かつassign_expiredされていないemailを探す
// select *
//   from user_email as ue
//  inner join user as u
//          on ue.user_id = u.user_id
//  where ue.email <> u.email
//    and ue.assign_expired_date > now()
//      ;
type GetDuplicatedEmail = (manager: EntityManager, email: string) => Promise<UserEmail | null>
const getDuplicatedEmail: GetDuplicatedEmail = async (manager, email) => {
  return await manager.findOne(UserEmail, {
    relations: [ 'user' ],
    where: {
      email: Raw((alias) => `${alias} > user.email`),
      assign_expired_date: Raw((alias) => `${alias} > NOW()`),
    }
  });
};
