import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as http from "http";

// import { readFileSync } from 'fs';

import type express from 'express';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';

import { ApolloServer, ContextFunction } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { DataSource } from 'typeorm';

import { resolvers } from 'src/resolver/index.js';
import { Session, SessionData } from 'express-session';
import { RequestWithContext } from 'src/index.js';
import { Mailer } from 'src/infra/mail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ApolloContext {
  rdbSource: DataSource;
  mailer: Mailer;
  session?: Session & Partial<SessionData>;
}

export type GetApolloServer = (httpServer: http.Server) => ApolloServer<ApolloContext>;
export const getApolloServer: GetApolloServer = httpServer => {
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

// eslint-disable-next-line @typescript-eslint/require-await
const getContext: ContextFunction<[{ req: RequestWithContext }], ApolloContext> = async ({ req }) => {
  return {
    rdbSource: req.context.rdbSource,
    mailer: req.context.mailer,
    session: req.session,
  }
};

export type GetApolloExpressMiddleware = (apollo: ApolloServer<ApolloContext>) => express.RequestHandler;
export const getApolloExpressMiddleware: GetApolloExpressMiddleware = apollo => expressMiddleware(apollo, { context: getContext, });
