import { types } from 'resolver/type';
import { queries } from 'resolver/query';
import { mutations } from 'resolver/mutation';
import { Resolvers } from 'generated/graphql/resolver';

export const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types,
};
