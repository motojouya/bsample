import path from "node:path";
import { fileURLToPath } from "node:url";

// import { readFileSync } from 'fs';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { DataSource } from "typeorm"

import { resolvers } from 'src/resolver/index.js';
import { SessionData } from 'express-session';
import { RequestWithContext } from 'src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ApolloContext {
  rdbSource: DataSource,
  session?: SessionData,
}

export const getApolloServer = (httpServer) => {
  // const typeDefs = readFileSync('../api/schema/schema.graphql', { encoding: 'utf-8' });
  //
  // return new ApolloServer<ApolloContext>({
  //   typeDefs,
  //   resolvers,
  //   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // });
  const schema = loadSchemaSync(path.join(__dirname, '../../../api/schema/*.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

  return new ApolloServer<ApolloContext>({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

export const getApolloExpressMiddleware = (server) => expressMiddleware(server, {
  context: async ({ req }: { req: RequestWithContext }) => ({
    rdbSource: req.context.rdbSource,
    session: req.session,
  }),
});
