import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

@Resolver('User')
export class EngageResolver {
  constructor(
    private userService: UserService,
    private userEmailService: UserEmailService,
    private engageService: EngageService,
  ) {}

  @Query()
  async loginUser() {
    const id = "identifier"; // TODO from session
    return await this.userService.findOneById(id);
  }

  @Mutation()
  async sendEmail(@Args('input') input: SendEmailInput) {
    const { email } = input;
    const loginUser = session.user; // TODO
    const mailer = {}; // TODO

    return await engageService.sendEmail(mailer, loginUser, email);
  }

  @Mutation()
  async verifyEmail(@Args('input') input: VerifyEmailInput) {
    const {
      register_session_id,
      email,
      email_pin,
    } = input;
    const loginUser = session.user; // TODO

    return await engageService.verifyEmail(loginUser, register_session_id, email, email_pin);
  }

  @Mutation()
  async register(@Args('input') input: RegisterInput) {
    const {
      register_session_id,
      name,
      email,
      password,
    } = input;

    return await engageService.register(register_session_id, name, email, password);
  }

  // TODO
  @Mutation()
  async login(@Args('input') input: LoginInput) {
    const {
      email,
      password,
    } = input;

    const user = this.userRepository.get({
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

  // TODO LoginGuard
  @Mutation()
  async changeUserInformation(@Args('input') input: ChangeUserInformationInput) {
    const { name } = input;
    const loginUser = session.user; // TODO
    return await engageService.changeUserInformation(loginUser, name);
  }

  // TODO LoginGuard
  @Mutation()
  async changePassword(@Args('input') input: ChangePasswordInput) {
    const { password } = input;
    const loginUser = session.user; // TODO
    return await engageService.changePassword(loginUser, password);
  }

  // TODO LoginGuard
  @Mutation()
  async changeEmail(@Args('input') input: ChangeEmailInput) {
    const { email } = input;
    const loginUser = session.user; // TODO
    return await engageService.changeEmail(loginUser, email);
  }
}
