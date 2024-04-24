import { UserResolvers, ResolversParentTypes } from 'src/generated/graphql/resolver.js';
import { getEmail } from 'src/case/engage/user.js';
import { ApolloContext } from 'src/infra/apollo.js';
import { User as UserEntity } from 'src/entity/user.js';

type IdentifierResolver = UserResolvers<ApolloContext, ResolversParentTypes['User'] & Partial<UserEntity>>['id'];
const identifier: IdentifierResolver = (parent, args, contextValue, info) => {
  if (!parent.identifier) {
    console.log('parent user', parent);
    throw new TypeError('parent shoud be TypeORM User type. [resolver/type/user#identifier]');
  }
  return parent.identifier;
};

// TODO data loader
type EmailInformationResolver = UserResolvers<
  ApolloContext,
  ResolversParentTypes['User'] & Partial<UserEntity>
>['email_information'];
const emailInformation: EmailInformationResolver = async (parent, args, contextValue, info) => {

  if (!parent.user_id || !parent.email) {
    console.log('parent user', parent);
    throw new TypeError('parent shoud be TypeORM User type. [resolver/type/user#emailInformation]');
  }
  const { user_id, email } = parent;

  const userEmail = await getEmail(contextValue.rdbSource)(user_id, email);
  if (!userEmail) {
    throw new TypeError('user shoud have userEmail. [resolver/type/user#emailInformation]');
  }
  return userEmail;
};

export const User: UserResolvers = {
  id: identifier,
  email_information: emailInformation,
};
