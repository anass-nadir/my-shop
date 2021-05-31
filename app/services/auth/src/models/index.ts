import { IUserSchema } from 'IUser';
import { Schema, Document, Model, model } from 'mongoose';

import { PasswordUtil } from '../utils';

interface UserDoc extends IUserSchema, Document {
  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: IUserSchema): UserDoc;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['m', 'f'] },
    address: { type: String, required: true },
    town: { type: String, required: true },
    country: { type: String, required: true },
    stripeId: { type: String },
    googleId: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String
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
userSchema.pre('save', PasswordUtil.hash);
userSchema.methods.comparePassword = PasswordUtil.compare;
userSchema.indexes();

userSchema.statics.build = attrs => new User(attrs);

const User = model<UserDoc, UserModel>('User', userSchema);

export default User;
