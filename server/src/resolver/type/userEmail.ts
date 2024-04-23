import { EmailResolvers, ResolversParentTypes } from 'src/generated/graphql/resolver.js';
import { ApolloContext } from 'src/infra/apollo.js';
import { UserEmail } from 'src/entity/userEmail.js';

type VerifiedResolver = EmailResolvers<ApolloContext, ResolversParentTypes['Email'] & Partial<UserEmail>>['verified'];
const verified: VerifiedResolver = (parent, args, contextValue, info) => {
  const { verified, verified_date } = parent;
  if (verified === true || verified === false) {
    return verified;
  } else {
    return !!verified_date;
  }
};

export const Email: EmailResolvers = {
  verified,
};
