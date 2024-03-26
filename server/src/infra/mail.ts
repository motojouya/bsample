
// TODO docker mailserverというのでdocker上から送れそうなので実装したい
// https://github.com/docker-mailserver/docker-mailserver
// template engineはhandlebarsがよさそう
const sendEmailPin = async (email: string, emailPin: string, name: string): void => {
  console.log(email, emailPin, name);
  // await this.mailerService.sendMail({
  //   to: mailAdress,
  //   subject: 'テストメール',
  //   template: './test',
  //   context: {
  //     name: 'テスト'
  //   },
  // });
}

const mailConfig = {
  transport: {
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  defaults: {
    from: process.env.MAIL_FROM,
  },
  // template: {
  //   dir: join(__dirname, '/templates'),
  //   adapter: new HandlebarsAdapter(),
  //   options: {
  //     strict: true,
  //   },
  // },
}
