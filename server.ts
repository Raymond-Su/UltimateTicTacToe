import { createServer } from 'http';
import { urlencoded, json } from 'body-parser';
import express from 'express';
import cors from 'cors';
import Morgan from 'morgan';
import path from 'path';
import { Server } from 'socket.io';

import { ResponseError } from './types';
import { SocketServer, socketServerConfig } from './service/SocketServer';
import { LoggerService } from './service/LoggerService';

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(Morgan('dev'));

// Client
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Handle Errors
app.use((req, res, next) => {
  const error = new Error('Not Found') as ResponseError;
  error.status = 404;
  next(error);
});

app.use((error: ResponseError, req: express.Request, res: express.Response) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//  IO Server
const httpServer = createServer(app);
const ioServer = new Server(httpServer, socketServerConfig);

/**
 * Starts the server.
 * @param done The callback executes after the server is started.
 */
export function startServer(port: string | number) {
  httpServer.listen(port, () => {
    LoggerService.log(
      'Server Started:',
      `Server started and listening at port ${port}`
    );
  });

  const ioHandlers = new SocketServer(ioServer);
  ioHandlers.watchConnection();
}

/**
 * Stops the server.
 * @param done The callback executes after the server is stopped.
 */
export function stopServer() {
  ioServer.close(() => {
    httpServer.close();
  });
}
