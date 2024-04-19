import { types } from 'src/resolver/type/index.js';
import { queries } from 'src/resolver/query/index.js';
import { mutations } from 'src/resolver/mutation/index.js';
import { Resolvers } from 'src/generated/graphql/resolver.js';

export const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types,
};
