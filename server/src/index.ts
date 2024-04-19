import http from 'http';

import cors from 'cors';
import express from 'express';
import { NextFunction, Request, Response } from "express"

import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import "reflect-metadata"; // for typeorm
import { DataSource } from "typeorm"

import { getApolloServer, getApolloExpressMiddleware } from 'src/infra/apollo.js';
import { getSessionConfig } from 'src/infra/redisSession.js';
import { getDataSource } from 'src/infra/rdb.js'
import { Mailer, getMailer } from "src/infra/mail.js";

type ExpressContext = {
  rdbSource: DataSource;
  mailer: Mailer;
};

// declare namespace e {
//   // export interface Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
//   export interface Request {
//     context?: ExpressContext
//   }
// }

export interface RequestWithContext extends Request {
  context?: ExpressContext
}

const run = async () => {
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

  const rdbSource = await getDataSource();
  const mailer = await getMailer();
  app.use(async (req: RequestWithContext, res: Response, next: NextFunction) => {
    req.context = {
      rdbSource,
      mailer,
    };
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
