const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientId,
      clientSecret: process.env.clientSecret,
      callbackURL: `http://localhost:${process.env.NODE_PORT}/api/auth/google/callback`
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
                done(null, Object.assign(newUser, { password: undefined }));
              })
              .catch((err) => done(err));
          } else {
            done(null, Object.assign(user, { password: undefined }));
          }
        })
        .catch((err) => done(err));
    }
  )
);
module.exports = passport;
