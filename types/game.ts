export enum Player {
  Cross = 0,
  Circle = 1,
  Spectator = 2
}

export interface GameState {
  playerCount: number;
  playerX: string | null;
  playerO: string | null;
  history: Move[];
}

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Move {
  boardPosition: Point;
  tilePosition: Point;
}
