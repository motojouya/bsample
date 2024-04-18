import engage from "src/resolver/mutation/engage";
import { MutationResolvers } from 'src/generated/graphql/resolver';

export const mutations: MutationResolvers = {
  ...engage,
};
