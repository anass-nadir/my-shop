import { app } from './app';
import connectDb from './database';

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
