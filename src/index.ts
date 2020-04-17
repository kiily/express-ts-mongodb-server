import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';
import { app } from './app';
import * as packageJson from '../package.json';
import mongoose from 'mongoose';

dotenv.config();

// Certificate
const key = fs.readFileSync(path.join(__dirname, '/certificates/key.pem'), 'utf8');
const cert = fs.readFileSync(path.join(__dirname, '/certificates/cert.pem'), 'utf8');

const credentials = {
  key,
  cert,
  passphrase: 'omnidebate',
};

app.get('/', (_req, res) => {
  res.send(`Connected to omnidebate server. Version: ${packageJson.version}`);
});

const httpsServer = https.createServer(credentials, app);
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/omnidebate';

httpsServer.listen(PORT, () => {
  console.log(`\n\nMAGIC HAPPENING ON PORT ${PORT}!\n\n`);
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('open', () => {
    console.info('Connected to Mongo !');
  });
  mongoose.connection.on('error', err => {
    console.error('Mongo Connection Error', err);
  });
});
