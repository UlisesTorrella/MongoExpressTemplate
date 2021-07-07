import { UserDoc } from '@entities/User';
import { Express } from 'express';
import session from 'express-session';
import { NativeError } from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './db/Auth';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { jwtSecret } from '@shared/constants';

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

    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    }

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload._id}, function(err: NativeError, user: UserDoc) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}