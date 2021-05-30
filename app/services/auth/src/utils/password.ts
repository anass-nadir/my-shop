import { genSalt, hash, compare } from 'bcryptjs';
import { Document } from 'mongoose';

export const PasswordUtil = {
  async hash(this: Document, next: () => void): Promise<void> {
    if (this.isModified('password')) {
      const salt = await genSalt();
      const derivedKey = await hash(this.get('password'), salt);
      this.set('password', derivedKey);
    }
    next();
  },
  compare(this: Document, passwordReceived: string): Promise<boolean> {
    return compare(passwordReceived, this.get('password'));
  }
};
