const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

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
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { error: 'User not found.' });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err || !isMatch)
            return done(null, false, { error: 'Incorrect password.' });
          return done(null, Object.assign(user, { password: undefined }));
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(({ _id, email, name }, done) => {
  done(null, { _id, name, email });
});

passport.deserializeUser((user, done) => {
  /* User.findById(id, (err, user) => {
    done(err, user);
  }); */
  done(null, user);
});
module.exports = passport;
