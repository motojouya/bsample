import { readFileSync } from 'fs';

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { resolvers } from 'src/resolver';

interface AppContext {
  token?: string;
  conn?: object, // TODO 型違う
  session?: object,
}

export const getApolloServer = (httpServer) => {
  const typeDefs = readFileSync('../api/schema/schema.graphql', { encoding: 'utf-8' });

  return new ApolloServer<AppContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

export const getApolloExpressMiddleware = (server) => {
  return expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token
      conn: req.context.conn,
      session: req.session,
    }),
  }),
};
