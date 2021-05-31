import { checkEnvVars } from '@anass-nadir/my-shop-common';
import { app } from './app';
import connectDb from './database';

const missingEnvVars = checkEnvVars(['JWT_SECRET_PRIV']);

if (missingEnvVars.length) {
  throw new Error(
    `Cannot find these required environment variables [${missingEnvVars}]`
  );
}
connectDb
  .then(() => {
    console.info('MongoDB connected');
    app.listen(3000, () => {
      console.log(`🚀 Server running on port 3000`);
    });
  })
  .catch(err => {
    console.error('Connection error', err.message);
  });
