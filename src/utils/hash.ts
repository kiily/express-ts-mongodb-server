import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
}

export function compareHash(password: string, hashedPassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}
