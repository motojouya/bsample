import http from 'http';

import cors from 'cors';
import express from 'express';

import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import "reflect-metadata"; // for typeorm

import { getApolloServer, getApolloExpressMiddleware } from 'src/infra/apollo';
import { getSessionConfig } from 'src/infra/redisSession';
import { getDataSource } from 'src/infra/rdb'
import { getMailer } from "src/infra/mail";

const run = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const apollo = getApolloServer(httpServer);

  await apollo.start();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    req.context = {};
    next();
  });

  const sessionConfig = getSessionConfig();
  app.use(sessionConfig);

  const rdbSource = await getDataSource();
  const mailer = await getMailer();
  app.use(async (req, res, next) => {
    req.context.rdbSource = rdbSource;
    req.context.mailer = mailer;
    next();
  });

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
    getApolloExpressMiddleware(apollo),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀  Server ready`);
};

run();
