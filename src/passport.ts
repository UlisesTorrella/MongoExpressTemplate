import { UserDoc } from '@entities/User';
import { Express } from 'express';
import session from 'express-session';
import { NativeError } from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './db/Auth';

export default function (app: Express) {
  app.use(session({
    // change secret for production
    secret: 'The Puzzle',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'sid',
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  // Not the best to use the mongo _id publicly but it's only a demo, should be imporoved to uuid
  passport.serializeUser<any, any>((req, user, done) => {
    done(null, (user as UserDoc)._id);
  });
  passport.deserializeUser(function (userId, done) {
    User.findById(userId)
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      });
  });

  passport.use(new LocalStrategy((username, password, done) => {
    const errorMsg = 'Invalid username or password';

    User.findOne({username},
      (err: NativeError, user: UserDoc) => {
        if (!user) {
          return done(null, false, {message: errorMsg});
        }
        return user.validatePassword(password)
          .then((isMatch: Boolean) => {
            return done(null, isMatch ? user : false, isMatch ? undefined : { message: errorMsg });
          });
      })
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}