import engage from "resolver/mutation/engage";
import { MutationResolvers } from 'generated/graphql/resolver';

export const mutations: MutationResolvers = {
  ...engage,
};
