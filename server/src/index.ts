import { readFileSync } from 'fs';
import http from 'http';

import cors from 'cors';
import express from 'express';
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import passport from "passport";
import LocalStrategy from "passport-local";

import { resolvers } from 'resolver';

interface AppContext {
  token?: string;
  conn?: object, // TODO 型違う
  session?: object,
}

export const run = () => {
  const app = express();
  const httpServer = http.createServer(app);

  const typeDefs = readFileSync('../api/schema/schema.graphql', { encoding: 'utf-8' });

  const apollo = new ApolloServer<AppContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apollo.start();

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



if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const bcrypt = require("bcrypt");
const passport = require("passport");

const session = require("express-session");
const initializePassport = require("./middleware/authMiddleware.js");

const users = [];

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(3000);




import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cookieSession from "cookie-session";
import secret from "secretCuisine123";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

import session from 'express-session';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  await User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
  }, function (username, password, done) {
    // TODO dbアクセスして認証
    knex("users")
      .where({
        name: username,
      })
      .select("*")
      .then(async function (results) {
        if (results.length === 0) {
          return done(null, false, {message: "Invalid User"});
        } else if (await bcrypt.compare(password, results[0].password)) {
          return done(null, results[0]);
        } else {
          return done(null, false, {message: "Invalid User"});
        }
      })
      .catch(function (err) {
        console.error(err);
        return done(null, false, {message: err.toString()})
      });
  }
));

app.use(
  cookieSession({
    name: "session",
    keys: [secret],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), function(req, res) {
  // TODO
  res.redirect('/users/' + req.user.username);
});

app.post('/',
  passport.authenticate('local',
    {
      failureRedirect : '/failure',
      successRedirect : '/success'
    }
  )
);

router.post('/logout', (req, res) => {
  req.session.passport.user = undefined;
  res.redirect('/');
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

