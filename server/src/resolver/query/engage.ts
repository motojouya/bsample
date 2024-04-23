import { getUserById } from 'src/case/engage/user.js';
import { QueryResolvers, ResolversParentTypes } from 'src/generated/graphql/resolver.js';
import { ApolloContext } from 'src/infra/apollo.js';

const loginUser: QueryResolvers<ApolloContext, ResolversParentTypes['Query']>['loginUser'] = async (
  parent,
  args,
  contextValue,
  info,
) => {
  const loginUser = contextValue.session.loginUser;
  if (!loginUser) {
    return null;
  }
  return await getUserById(contextValue.rdbSource)(loginUser.user_id);
};

export default {
  loginUser,
};
