import { Server, Socket } from 'socket.io';
import { Move, Player } from '../client/src/types/game';
import { GameState } from '../types/game';
import {
  SocketCore,
  GameSocketClientMessage,
  GameSocketServerMessage
} from '../types/socket';
import { LoggerService } from './LoggerService';

export class SocketServer {
  /**
   * The socket server.
   */
  public ioServer: Server;
  private games: Record<string, GameState>;

  /**
   * Initializes a new instance of the class SocketServer.
   * @param ioServer The socket server instance.
   */

  constructor(ioServer: Server) {
    this.ioServer = ioServer;
    this.games = {};
  }

  /**
   * Listen socket
   */
  public watchConnection() {
    this.ioServer.on(SocketCore.CONNECTION, (socket: Socket) => {
      LoggerService.log('Socket', `connected ${socket.id}`);

      const gameId = socket.handshake.query['gameId'] as string;
      socket.join(gameId);

      this.handleJoinGame(socket, gameId);
      this.subscribe(socket, gameId);
    });
  }

  /**
   * Subscribes to the socket events.
   * @param socket The socket instance
   * @param gameId The room the socket is in
   */
  private subscribe(socket: Socket, gameId: string) {
    socket.on(GameSocketClientMessage.MAKE_MOVE, (move: Move) =>
      this.onGameMoveMade(gameId, move)
    );
    socket.on(SocketCore.ERROR, (error) => this.onErrorHandler(socket, error));
    socket.on(SocketCore.DISCONNECT, () =>
      this.onDisconnectHandler(socket, gameId)
    );
  }

  /**
   * handle players joining games. All players should see current state of the board
   * @param socket The socket instance
   * @param error The error message
   */
  private handleJoinGame(socket: Socket, gameId: string) {
    // Create new game if it doesn't exist
    if (!this.games.hasOwnProperty(gameId)) {
      this.games[gameId] = {
        playerCount: 0,
        playerX: null,
        playerO: null,
        history: []
      };
      LoggerService.gameLog(`New Game`, gameId);
    }
    // Send current board state to the client
    socket.emit(
      GameSocketServerMessage.CURRENT_BOARD,
      this.games[gameId].history
    );

    this.games[gameId].playerCount++;
    if (!this.games[gameId].playerX) {
      this.games[gameId].playerX = socket.id;
      socket.emit(GameSocketServerMessage.SET_PLAYER, Player.Cross);
      LoggerService.gameLog(gameId, `Found player X: ${socket.id}`);
      return;
    }
    if (!this.games[gameId].playerO) {
      this.games[gameId].playerO = socket.id;
      socket.emit(GameSocketServerMessage.SET_PLAYER, Player.Circle);
      LoggerService.gameLog(gameId, `Found player O: ${socket.id}`);
      return;
    }
    socket.emit(GameSocketServerMessage.SET_PLAYER, Player.Spectator);
  }

  /**
   * handle players joining games. All players should see current state of the board
   * @param socket The socket instance
   * @param error The error message
   */
  private onGameMoveMade(gameId: string, move: Move) {
    LoggerService.gameLog(gameId, `Move made: ${move}`);
    this.games[gameId].history.push(move);

    // update client with move
    this.ioServer.to(gameId).emit(GameSocketServerMessage.MOVE_MADE, move);
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
   * @param gameId The room that the socket is within
   */
  private onDisconnectHandler(socket: Socket, gameId: string) {
    if (socket.disconnected) {
      LoggerService.log('Socket', `Socket ${socket.id} disconnected`);
    }
    socket.leave(gameId);
    if (this.games.hasOwnProperty(gameId)) {
      this.games[gameId].playerCount--;

      if (this.games[gameId].playerO === socket.id) {
        this.games[gameId].playerO = null;
      } else if (this.games[gameId].playerX === socket.id) {
        this.games[gameId].playerX = null;
      }
      if (this.games[gameId].playerCount === 0) {
        delete this.games[gameId];
        LoggerService.gameLog(`END game`, gameId);
      }
    }
  }
}

export const socketServerConfig =
  process.env.NODE_ENV === 'development'
    ? {
        cors: {
          origin: 'http://localhost:3000'
        }
      }
    : undefined;
