const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const User = new Schema(
  {
    googleId: { type: String },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: { type: String, required: () => this.googleId === null }
  },
  { timestamps: { currentTime: () => Date.now() } }
);
User.pre("save", function (next) {
  if (!this.isModified("password") || this.googleId) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});
User.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
User.indexes();
module.exports = mongoose.model("user", User);
