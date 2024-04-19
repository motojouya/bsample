import { UserResolvers } from 'src/generated/graphql/resolver.js';
import { getEmail } from "src/case/engage/user.js";

const identifier = (parent, args, contextValue, info) => parent.identifier;

// TODO data loader
const emailInformation = async (parent, args, contextValue, info) => {
  // const { user_id, email } = args;
  const { user_id, email } = parent;
  return await getEmail(contextValue.rdbSource)(user_id, email);
}

export const User: UserResolvers = {
  id: identifier,
  email_information: emailInformation,
};
