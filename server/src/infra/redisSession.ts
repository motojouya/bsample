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
    host: process.env.REDIS_HOST, //'memory',
    port: parseInt(process.env.REDIS_PORT),
    password: '',
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
    },
  });
};
