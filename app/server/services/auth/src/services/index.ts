import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: `http://localhost:${process.env.NODE_PORT}/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      if (!profile.emails) {
        return done('something goes wrong');
      }
      const email = profile.emails[0]?.value;
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            new User({
              googleId: profile.id,
              name: profile.displayName,
              email: email
            })
              .save()
              .then(newUser => {
                done(null, Object.assign(newUser, { password: undefined }));
              })
              .catch(err => done(err));
          } else {
            done(null, Object.assign(user, { password: undefined }));
          }
        })
        .catch(err => done(err));
    }
  )
);
export default passport;
