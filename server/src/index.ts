import { readFileSync } from 'fs';
import http from 'http';

import cors from 'cors';
import express from 'express';

import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { resolvers } from 'resolver';

interface AppContext {
  token?: string;
  conn?: object, // TODO 型違う
  session?: object,
}

declare module 'express-session' {
  interface SessionData {
    user: object;
  }
}

const getApolloServer = (httpServer) => {
  const typeDefs = readFileSync('../api/schema/schema.graphql', { encoding: 'utf-8' });

  return new ApolloServer<AppContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

const getSessionConfig = () => {
  const RedisStore = connectRedis(session);
  const redisClient = new Redis({
    host: '172.17.0.2',
    port: 6379,
    password: 'redispass',
  });

  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 1000,
    }
  });
};

export const run = () => {
  const app = express();
  const httpServer = http.createServer(app);
  const apollo = getApolloServer(httpServer);

  await apollo.start();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  const sessionConfig = getSessionConfig();
  app.use(sessionConfig);

  app.use(function(req, res, next) {
    next(createError(404));
  });

  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token
        conn: req.context.conn,
        session: req.session,
      }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀  Server ready`);
};

