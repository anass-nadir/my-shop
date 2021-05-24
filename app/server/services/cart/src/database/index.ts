import { connect } from 'mongoose';
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URIS, MONGO_DB } = process.env;

export default connect(`mongodb://${MONGO_URIS}`, {
  dbName: MONGO_DB,
  auth: {
    user: MONGO_USERNAME!,
    password: MONGO_PASSWORD!
  },
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
});
