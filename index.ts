import path from 'path';
import dotenv from 'dotenv';
import server from './server';

const apiPort = process.env.PORT || 5000;

dotenv.config({
  path: path.join(__dirname, '../.env')
});

server.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});
