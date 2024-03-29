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
    host: process.env.REDIS_HOST, //'memory',
    port: process.env.REDIS_PORT,
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
    }
  });
};

