import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

declare module 'express-session' {
  interface SessionData {
    user: object;
  }
}

export const getSessionConfig = () => {
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

