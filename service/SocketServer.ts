import { Server, Socket } from 'socket.io';
import { LoggerService } from './LoggerService';
export class SocketServer {
  /**
   * The socket server.
   */
  public ioServer: Server;

  /**
   * Initializes a new instance of the class SocketServer.
   * @param ioServer The socket server instance.
   */

  constructor(ioServer: Server) {
    this.ioServer = ioServer;
  }

  /**
   * Listen socket
   */
  public watchConnection() {
    this.ioServer.on('connection', (socket: Socket) => {
      LoggerService.log('Connected Socket', `Socket connected - ${socket.id}`);
      if (socket.handshake.headers.referer) {
        const referer = socket.handshake.headers.referer.split('/');
        const roomId = referer[referer.length - 1];

        socket.join(roomId);

        this.subscribe(socket, roomId);
      }
    });
  }

  /**
   * Subscribes to the socket events.
   * @param socket The socket instance
   * @param roomId The room the socket is in
   */
  private subscribe(socket: Socket, roomId: string) {
    socket.on('data', (data) => this.onDataHandler(socket, roomId, data));
    socket.on('error', (error) => this.onErrorHandler(socket, error));
    socket.on('disconnect', () => this.onDisconnectHandler(socket, roomId));
  }

  /**
   * The handler listens to the events emitted by the clients.
   * @param socket The socket instance
   * @param roomId The romom the user is in
   * @param data The data recieved from the client
   */
  private onDataHandler(socket: Socket, roomId: string, data: any) {
    console.log(data, roomId);
  }

  /**
   * Error handler
   * @param socket The socket instance
   * @param error The error message
   */
  private onErrorHandler(socket: Socket, error: any) {
    LoggerService.logError('Error in socket', error);
  }

  /**
   * The handler gets called on socket disconnect.
   * Can be used to close or clean gracefully when required.
   * @param socket The socket instance.
   * @param roomId The room that the socket is within
   */
  private onDisconnectHandler(socket: Socket, roomId: string) {
    LoggerService.log(
      'Disconnect Socket',
      `Attempting to disconnect ${socket.id}`
    );
    if (socket.connected) {
      socket.leave(roomId);
      socket.disconnect();
      LoggerService.log(
        'Disconnect Socket',
        `Socket ${socket.id} disconnected`
      );
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
