import * as jwt from 'jsonwebtoken';

const SECRET = 'omnidebatejwtauth';

export function decodeToken(token: string, scopes: string[] = []): Promise<string | object> {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('No token provided'));
    }
    if (token.includes('Bearer')) {
      token = token.substr(7);
    }
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      for (const scope of scopes) {
        if (!(decoded as any).scopes.includes(scope)) {
          reject(new Error('JWT does not contain required scope.'));
        }
      }
      resolve(decoded);
    });
  });
}

export function signToken(email: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({ email }, SECRET, { expiresIn: 60 * 60 }, (err: Error, encoded: string) => {
      if (err) {
        reject(err);
      }
      resolve(encoded);
    });
  });
}
