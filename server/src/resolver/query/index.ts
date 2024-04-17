import { QueryResolvers } from 'generated/graphql/resolver';
import engage from "resolver/query/engage";

export const queries: QueryResolvers = {
  ...engage,
};
