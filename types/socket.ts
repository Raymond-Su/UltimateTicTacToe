export enum SocketCore {
  CONNECTION = 'connection',
  ERROR = 'error',
  DISCONNECT = 'disconnect'
}

export enum GameSocketClientMessage {
  MAKE_MOVE = 'MAKE_MOVE'
}

export enum GameSocketServerMessage {
  MOVE_MADE = 'MOVE_MADE',
  SET_PLAYER = 'SET_PLAYER',
  CURRENT_BOARD = 'CURRENT_BOARD'
}
