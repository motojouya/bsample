import { QueryResolvers } from 'src/generated/graphql/resolver';
import engage from "src/resolver/query/engage";

export const queries: QueryResolvers = {
  ...engage,
};
