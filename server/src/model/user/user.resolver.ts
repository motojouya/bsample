import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  constructor(
    private userEmailService: UserEmailService,
  ) {}

  @ResolveField()
  async email(@Parent() user) {
    const { user_id, email } = user;
    return this.userEmailService.findAll({ user_id, email, });
  }
}
