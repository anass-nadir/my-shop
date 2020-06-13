const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { createToken } = require('./index');
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientId,
      clientSecret: process.env.clientSecret,
      callbackURL: `http://localhost:${process.env.NODE_PORT}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (!user) {
            new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value
            })
              .save()
              .then((newUser) => {
                done(null, { token: createToken(newUser, 24 * 10 * 60) });
              })
              .catch((err) => console.log(err));
          } else {
            done(null, { token: createToken(user, 24 * 10 * 60) });
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
