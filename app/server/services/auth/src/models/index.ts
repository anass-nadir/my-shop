import { Schema, Document, Model, model } from 'mongoose';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

interface IUser {
  name: string;
  email: string;
  password: string;
  googleId: string;
  customerId: string;
}

interface UserDoc extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: IUser): IUser;
}

const userSchema = new Schema(
  {
    googleId: { type: String },
    name: { type: String, required: true },
    customerId: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: () => this!['googleId'] && this!['googleId'] === null
    }
  },
  {
    timestamps: { currentTime: () => Date.now() },
    toJSON: {
      transform(doc, user) {
        delete user.password;
        delete user.__v;
      }
    }
  }
);
userSchema.pre('save', async function (next): Promise<void> {
  if (this.isModified('password')) {
    const salt = randomBytes(8).toString('hex');

    const derivedKey = (await scryptAsync(
      this.get('password'),
      salt,
      64
    )) as Buffer;
    this.set('password', `${derivedKey.toString('hex')}.${salt}`);
  }
  next();
});
userSchema.methods.comparePassword = async function (password: string) {
  const [hashedPassword, salt] = this.get('password').split('.');

  const suppliedPassword = (await scryptAsync(password, salt, 64)) as Buffer;
  return suppliedPassword.toString('hex') === hashedPassword;
};
userSchema.indexes();

userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export default User;
