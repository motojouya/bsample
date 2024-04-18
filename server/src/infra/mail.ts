import nodemailer from "nodemailer";

export type Send = (to: string, subject: string, text: string, from?: string) => Promise<null | MailSendError>;
export type Mailer = {
  send: Send;
};

export type MailContents = {
  from: string,
  to: string,
  subject: string,
  text: string,
};

export class MailSendError extends Error {
  constructor(
    readonly contents: MailContents,
    readonly exception: object,
    readonly message: string,
  ) { super(); }
}

export const getMailer = async () => {

  const defaultFrom = process.env.MAIL_FROM || '';
  const transporter = nodemailer.createTransport({
    ignoreTLS:true,
    host: process.env.MAIL_HOST,
    // auth: {
    //   user: process.env.MAIL_USER,
    //   pass: process.env.MAIL_PASSWORD,
    // },
    port: process.env.MAIL_PORT, // 1025
    secure: false, // true for 465, false for other ports
    defaults: {
      from: process.env.MAIL_FROM,
    },
  });

  const send: Send = async (to, subject, text, from) => {
    const mailContents: MailContents = {
      from: from || defaultFrom,
      to: to,
      subject: subject,
      text: text,
    };

    try {
      const sendResult = await transporter.sendMail(mailContents);
      console.log('send result.', sendResult);
      return null;

    } catch (e) {
      console.log('send failed.', e);
      return new MailSendError(e, mailContents, 'failed send email');
    }
  };

  return { send };
};
