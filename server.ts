import { createServer } from 'http';
import { urlencoded, json } from 'body-parser';
import express from 'express';
import cors from 'cors';
import Morgan from 'morgan';
import path from 'path';
import { Server, Socket } from 'socket.io';

import { routes } from './routes';
import { ResponseError } from './types';

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(Morgan('dev'));

// API Route
app.use('/api/', routes);

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
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket: Socket) => {
  console.log('New client connected', socket.id);
  console.log(io.sockets.adapter.rooms);

  if (socket.handshake.headers.referer) {
    const referer = socket.handshake.headers.referer.split('/');
    const rand = referer[referer.length - 1];

    socket.join(rand);

    const room = io.sockets.adapter.rooms.get(rand);
    if (room) {
      if (room.size === 1) {
        socket.emit('joinGame', 'X');
      } else if (room.size === 2) {
        socket.emit('joinGame', 'O');
      } else {
        socket.emit('spectate');
      }
    }
  }

  // var room = io.adapter.rooms[rand];
  // if (!room.game) {
  //   room.game = {
  //     players: [],
  //     history: []
  //   };
  // }
  // if (room.game.players.length === 0) {
  //   if (Math.random() < 0.5) {
  //     socket.player = 'X';
  //   } else {
  //     socket.player = 'O';
  //   }
  // } else if (room.game.players.indexOf('X') === -1) {
  //   socket.player = 'X';
  // } else if (room.game.players.indexOf('O') === -1) {
  //   socket.player = 'O';
  // } else {
  //   socket.player = null;
  // }
  // if (socket.player) {
  //   room.game.players.push(socket.player);
  // }
  // socket.emit('connection', socket.player, room);
  // io.to(rand).emit('someone connected', room);
  // socket.on('move', function (move) {
  //   room.game.history.push(move);
  //   socket.broadcast.to(rand).emit('move', move);
  // });
  // socket.on('disconnect', function () {
  //   if (socket.player) {
  //     var i = room.game.players.indexOf(socket.player);
  //     room.game.players.splice(i, 1);
  //   }
  //   io.to(rand).emit('someone disconnected', room);
  // });
});

export default server;
