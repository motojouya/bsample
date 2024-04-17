import { UserResolvers } from 'generated/graphql/resolver';
import { getEmail } from "case/engage/user";

const email = async (parent, args, contextValue, info) => {
  const { user_id, email } = args;
  return await getEmail(contextValue.rdbSource)(user_id, email);
}

export const User: UserResolvers = {
  email,
};
