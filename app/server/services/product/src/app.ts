import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import session from 'cookie-session';
import {
  errorHandler,
  NotFoundError,
  currentUser
} from '@anass-nadir/my-shop-common';
import { privateRoutes, publicRoutes } from './routes';

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
  name: 'my-shop-sess',
  secret: process.env.SESSION_SECRET,
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
  maxAge: 60 * 60 * 24 * 1000
};
app.set('trust proxy', 1);

app.use(session(sessOptions));
app.use(currentUser);

app.use('/api/products', [publicRoutes, privateRoutes]);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
