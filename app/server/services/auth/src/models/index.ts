import { Schema, Document, Model, model } from 'mongoose';

import { PasswordService } from '../services/password';

interface UserDoc extends IUser.Schema, Document {
  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: IUser.Schema): UserDoc;
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
userSchema.pre('save', PasswordService.hash);
userSchema.methods.comparePassword = PasswordService.compare;
userSchema.indexes();

userSchema.statics.build = (attrs: IUser.Schema) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export default User;
