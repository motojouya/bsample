import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';

// TODO docker mailserverというのでdocker上から送れそうなので実装したい
// https://github.com/docker-mailserver/docker-mailserver
// template engineはhandlebarsがよさそう
@Injectable()
export class MailService {
  // constructor(
  //   private readonly mailerService: MailerService
  // ) {}

  async sendEmailPin(email: string, emailPin: string, name: string): void {
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
}
