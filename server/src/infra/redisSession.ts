import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

import { User } from 'src/entity/user.js';

declare module 'express-session' {
  export interface SessionData {
    loginUser: User;
  }
}

export const getSessionConfig = () => {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string), // TODO 本当はnull checkしたほうがいい
    password: '',
  });

  return session({
    secret: process.env.SESSION_SECRET as string, // TODO 本当はnull checkしたほうがいい
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // TODO 一旦1h
    },
  });
};
