import { types } from 'resolver/type';
import { queries } from 'resolver/query';
import { mutations } from 'resolver/mutation';

export const resolvers = {
  Query: queries,
  Mutation: mutations,
  ...types,
};

