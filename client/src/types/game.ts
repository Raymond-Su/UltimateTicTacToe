// Enums
export enum Opponent {
  Player = 'player',
  AI = 'ai'
}

export enum AIDifficulty {
  Easy,
  Medium,
  Hard,
  Expert,
  Grandmaster,
  Impossible
}

export enum Player {
  Cross = 0,
  Circle = 1,
  Spectator = 2
}

export enum TileValue {
  Cross = 0,
  Circle = 1,
  Empty = 2,
  Destroyed = 3
}

export enum Winner {
  Cross = 0,
  Circle = 1,
  None = 2,
  Draw = 3
}

// Interfaces
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Move {
  boardPosition: Point;
  tilePosition: Point;
}

export interface TileInformation {
  position: Point;
  value: TileValue;
}

export interface innerBoardInformation extends TileInformation {
  tiles: SquareInformation[];
}

export interface SquareInformation extends TileInformation {
  boardPosition: Point;
}

export interface WinResult {
  isFinished: boolean;
  winningPlayer: Winner;
}
