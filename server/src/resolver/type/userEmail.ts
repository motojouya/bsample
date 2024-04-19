import { EmailResolvers } from 'src/generated/graphql/resolver.js';
import { getEmail } from "src/case/engage/user.js";

const verified = async (parent, args, contextValue, info) => {
  const { verified, verified_date } = parent;
  if (verified === true || verified === false) {
    return verified;
  } else {
    return !!verified_date;
  }
}

export const Email: EmailResolvers = {
  verified,
};