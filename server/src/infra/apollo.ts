import { join } from 'path';
// import { readFileSync } from 'fs';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { resolvers } from 'resolver';

interface AppContext {
  token?: string;
  conn?: object, // TODO 型違う
  session?: object,
}

export const getApolloServer = (httpServer) => {
  // const typeDefs = readFileSync('../api/schema/schema.graphql', { encoding: 'utf-8' });
  //
  // return new ApolloServer<AppContext>({
  //   typeDefs,
  //   resolvers,
  //   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // });
  const schema = loadSchemaSync(join(__dirname, '../../../api/schema/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

  return new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

export const getApolloExpressMiddleware = (server) => expressMiddleware(server, {
  context: async ({ req }) => ({
    token: req.headers.token,
    conn: req.context.conn,
    session: req.session,
  }),
});
