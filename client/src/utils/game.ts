import { Player, Point, TileValue, Winner } from '../types/game';

export const displayTileValue: Record<TileValue, string> = {
  [TileValue.Cross]: 'X',
  [TileValue.Circle]: 'O',
  [TileValue.Destroyed]: '/',
  [TileValue.Empty]: ''
};

export const displayPlayerValue: Record<Player, string> = {
  [Player.Cross]: 'X',
  [Player.Circle]: 'O',
  [Player.Spectator]: 'Spectator'
};

export const playerToWinner = (player: Player): Winner => {
  switch (player) {
    case Player.Circle:
      return Winner.Cross;
    case Player.Cross:
      return Winner.Circle;
    default:
      return Winner.None;
  }
};

export const playerToTileValue = (
  player: Winner | Player,
  isForFullInnerBoard = false
): TileValue => {
  if (isForFullInnerBoard && player === Winner.Draw) {
    return TileValue.Destroyed;
  } else if (player === Winner.Cross) {
    return TileValue.Cross;
  } else if (player === Winner.Circle) {
    return TileValue.Circle;
  } else {
    return TileValue.Empty;
  }
};

export const arePointsEqual = (point1: Point, point2: Point): boolean => {
  if (point1.x === point2.x && point1.y === point2.y) {
    return true;
  }
  return false;
};
