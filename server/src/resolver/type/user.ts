import { UserResolvers } from 'generated/graphql/resolver';

const email = async (parent, args, contextValue, info) => {
  const rdbConnection = contextValue.rdbConnection;
  const { user_id, email } = paramater;
  return this.userEmailService.findAll(rdbConnection, { user_id, email, });
}

export const User: UserResolvers = {
  email,
};
