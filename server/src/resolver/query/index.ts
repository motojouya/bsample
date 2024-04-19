import { QueryResolvers } from 'src/generated/graphql/resolver.js';
import engage from "src/resolver/query/engage.js";

export const queries: QueryResolvers = {
  ...engage,
};
