import { scrypt, randomBytes } from 'crypto';
import { Document, CallbackError } from 'mongoose';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordService {
  static async hash(
    this: Document,
    next: (err?: CallbackError) => void
  ): Promise<void> {
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
  }

  static async compare(
    this: Document,
    passwordReceived: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = this.get('password').split('.');

    const suppliedPassword = (await scryptAsync(
      passwordReceived,
      salt,
      64
    )) as Buffer;
    return suppliedPassword.toString('hex') === hashedPassword;
  }
}
