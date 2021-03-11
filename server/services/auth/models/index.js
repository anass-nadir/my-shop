const mongoose = require('mongoose');
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);
const Schema = mongoose.Schema;

const User = new Schema(
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
    password: { type: String, required: () => this.googleId === null }
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
User.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = randomBytes(8).toString('hex');

    const derivedKey = await scryptAsync(this.password, salt, 64);
    this.password = `${derivedKey.toString('hex')}.${salt}`;
  }
  next();
});
User.methods.comparePassword = async function (password) {
  const [hashedPassword, salt] = this.password.split('.');

  const suppliedPassword = await scryptAsync(password, salt, 64);
  return suppliedPassword.toString('hex') === hashedPassword;
};
User.indexes();
module.exports = mongoose.model('User', User);
