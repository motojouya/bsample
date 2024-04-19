import engage from "src/resolver/mutation/engage.js";
import { MutationResolvers } from 'src/generated/graphql/resolver.js';

export const mutations: MutationResolvers = {
  ...engage,
};
