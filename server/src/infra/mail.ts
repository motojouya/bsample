import nodemailer from "nodemailer";

export type Send = (to: string, subject: string, text: string, from: string) => Promise<void>;

export const getMailer = async () => {

  const defaultFrom = process.env.MAIL_FROM;
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
    const fromEmail = from || defaultFrom;
    const sendResult = await transporter.sendMail({
      from: fromEmail,
      to: to,
      subject: subject,
      text: text,
    });

    console.log('send result.', sendResult);
  };

  return { send };
};
