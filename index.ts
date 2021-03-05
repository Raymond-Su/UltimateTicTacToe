import path from 'path';
import dotenv from 'dotenv';
import { startServer } from './server';

dotenv.config({
  path: path.join(__dirname, '../.env')
});

const apiPort = process.env.PORT || 5000;
startServer(apiPort);
