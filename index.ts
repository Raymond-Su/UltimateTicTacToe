import path from 'path';
import dotenv from 'dotenv';
import { startServer } from './server';

const apiPort = process.env.PORT || 5000;
startServer(apiPort);
