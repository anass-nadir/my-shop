import express from 'express';
import cors from 'cors';
import session from 'cookie-session';
import Routes from './routes';
import {
  currentUser,
  isAuthenticated,
  errorHandler,
  NotFoundError
} from '@anass-nadir/my-shop-common';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.PUBLIC_URL,
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ['set-cookie']
  })
);
const sessOptions = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
  maxAge: 60 * 60 * 24 * 1000
};
app.set('trust proxy', 1);

app.use(session(sessOptions));
app.use([currentUser, isAuthenticated]);
app.use('/api/payment', Routes);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
