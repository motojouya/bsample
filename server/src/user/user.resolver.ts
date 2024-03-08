import { Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query()
  async loginUser() {
    const id = "identifier"; // TODO from session
    return this.userService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }

  // register(input: RegisterInput): Void
  // login(input: LoginInput): User
  // changeUserInformation(input: UserInput!): User
  // changeEmail(input: EmailInput!): User
  // changePassword(input: PasswordInput!): User
  // loginUser: User

}
