import express from 'express';
import { decodeToken } from '../utils';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes: string[] = [],
): Promise<string | object> {
  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['authorization'];
    return decodeToken(token, scopes);
  }
  return Promise.reject('Invalid securityName');
}
