import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
    private userEmailService: UserEmailService,
  ) {}

  @Query()
  async loginUser() {
    const id = "identifier"; // TODO from session
    return this.userService.findOneById(id);
  }

  @ResolveField()
  async email(@Parent() user) {
    const { user_id, email } = user;
    return this.userEmailService.findAll({ userId: user_id, email: email });
  }

  @Mutation()
  async sendEmail(@Args('input') input: SendEmailInput) {
    const { email } = input;

    let user = session.user; // TODO
    let registerSessionId = null;
    const email_pin = ''; // TODO random
    if (!user) {
      // TODO ここでは、assignされておらず、かつassign_expiredされていないemailを探す
      // select *
      //   from user_email as ue
      //   left outer join user as u
      //                on ue.user_id = u.user_id
      //               and ue.email = u.email
      //  where (u.id is null or ue.assign_expired_date > now())
      //      ;
      const userEmail = userEmailService.findOne({
        email: email,
        assign_expired_date: new Date(),
      });
      if (userEmail) {
        console.log('email exists already!');
        return;
      }
      registerSessionId = ''; // TODO ramdome
      user = this.userService.create({ 
        identifier: null,
        name: null,
        register_session_id: registerSessionId,
        email: null,
        active: false,
      });
    }

    const userEmail = this.userEmailService.create({ 
      user_id: user.id
      email: email
      email_pin: email_pin,
      verified_date: null,
      assign_expired_date: (new Date()).add(HOUR, 1),
    });

    sendEmail(email, email_pin); // TODO

    return registerSessionId;
  }

  @Mutation()
  async sendEmail(@Args('input') input: VerifyEmailInput) {
    const {
      register_session_id,
      email,
      email_pin,
    } = input;

    let user = session.user; // TODO
    let userEmail = null;
    // select *
    //   from user as u
    //  inner join user_email as ue
    //          on u.user_id = ue.user_id
    //  where ue.email = <email>
    //    and ue.email_pin = <email_pin>
    //    and assign_expired_date < now()
    if (user) {
      //    and u.user_id = <user_id>
      userEmail = this.userEmailService.get({ 
        user_id: user.id
        email: email,
        email_pin: email_pin,
        assign_expired_date: new Date(),
      });
    } else {
      //    and u.register_session_id = <register_session_id>
      userEmail = this.userEmailService.get({ 
        register_session_id: register_session_id
        email: email,
        email_pin: email_pin,
        assign_expired_date: new Date(),
      });
    }

    if (!userEmail) {
      return false;
    }

    userEmail = this.userEmailService.update({ 
      user_id: userEmail.user_id
      email: userEmail.email,
      verified_date: new Date(),
    });
    return true;
  }

  @Mutation()
  async register(@Args('input') input: RegisterInput) {
    const {
      register_session_id,
      name,
      email,
      password,
    } = input;

    const user = this.userService.get({
      register_session_id: register_session_id,
    });
    if (!user) {
      console.log('who are you!?');
      return;
    }

    const userEmail = userEmailService.get({
      user_id: user.id
      email,
      verified: true,
    });
    if (!userEmail) {
      console.log('email is not verified!');
      return;
    }

    const user = this.userService.update({
      user_id: user.id,
      identifier: email,
      name: name,
      email: email,
      password: password,
    });

    return user;
  }

  @Mutation()
  async login(@Args('input') input: LoginInput) {
    const {
      email,
      password,
    } = input;

    const user = this.userService.get({
      identifier: email,
      password: password, // TODO 暗号化
    });
    if (!user) {
      console.log('who are you!?');
      return null;
    }

    session.user = user; // TODO

    return user;
  }

  @Mutation()
  async changeUserInformation(@Args('input') input: ChangeUserInformationInput) {
    const {
      name,
    } = input;

    const user = session.user; // TODO

    const user = this.userService.get({
      identifier: user.id,
    });
    if (!user) {
      console.log('who are you!?');
      return null;
    }

    const user = this.userService.update({
      identifier: user.id,
      name: name,
    });
    return user;
  }

  @Mutation()
  async changePassword(@Args('input') input: ChangePasswordInput) {
    const {
      password,
    } = input;

    const user = session.user; // TODO

    const user = this.userService.get({
      identifier: user.id,
    });
    if (!user) {
      console.log('who are you!?');
      return null;
    }

    const user = this.userService.update({
      identifier: user.id,
      password: password, // TODO 暗号化
    });
    return user;
  }

  @Mutation()
  async changeEmail(@Args('input') input: ChangeEmailInput) {
    const {
      register_session_id,
      name,
      email,
      password,
    } = input;

    const user = this.userService.get({
      register_session_id: register_session_id,
    });
    if (!user) {
      console.log('who are you!?');
      return;
    }

    const userEmail = userEmailService.get({
      user_id: user.id
      email,
      verified: true,
    });
    if (!userEmail) {
      console.log('email is not verified!');
      return;
    }

    const user = this.userService.update({
      user_id: user.id,
      identifier: email,
      name: name,
      email: email,
      password: password,
    });

    return user;
  }
}














