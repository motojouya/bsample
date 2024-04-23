import { UserResolvers, ResolversParentTypes } from 'src/generated/graphql/resolver.js';
import { getEmail } from 'src/case/engage/user.js';
import { ApolloContext } from  'src/infra/apollo.js'
import { User as UserEntity } from 'src/entity/user.js';

type IdentifierResolver = UserResolvers<
  ApolloContext,
  ResolversParentTypes['User'] & Partial<UserEntity>
>['id'];
const identifier: IdentifierResolver = (parent, args, contextValue, info) => parent.identifier;

// TODO data loader
type EmailInformationResolver = UserResolvers<
  ApolloContext,
  ResolversParentTypes['User'] & Partial<UserEntity>
>['email_information'];
const emailInformation: EmailInformationResolver = async (parent, args, contextValue, info) => {
  const { user_id, email } = parent;
  return await getEmail(contextValue.rdbSource)(user_id, email);
};

export const User: UserResolvers = {
  id: identifier,
  email_information: emailInformation,
};
