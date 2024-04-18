import { types } from 'src/resolver/type';
import { queries } from 'src/resolver/query';
import { mutations } from 'src/resolver/mutation';
import { Resolvers } from 'src/generated/graphql/resolver';

export const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types,
};
