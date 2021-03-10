import { Player, TileValue, Winner } from '../../types/game';
import {
  arePointsEqual,
  playerToTileValue,
  playerToWinner
} from '../../utils/gameUtils';

describe('playerToTileValue', () => {
  it('should return an empty tile when Winner is Draw', () => {
    const input = Winner.Draw;
    const expectedResult = TileValue.Empty;
    const actualResult = playerToTileValue(input);
    expect(actualResult).toEqual(expectedResult);
  });
  it('should return TileValue Cross when player is Cross', () => {
    const input = Player.Cross;
    const expectedResult = TileValue.Cross;
    const actualResult = playerToTileValue(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Circle when player is Circle', () => {
    const input = Player.Circle;
    const expectedResult = TileValue.Circle;
    const actualResult = playerToTileValue(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Destroyed when Winner is Draw and Inner board is full', () => {
    const input = Winner.Draw;
    const expectedResult = TileValue.Destroyed;
    const actualResult = playerToTileValue(input, true);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Cross when player is Cross and Inner board is full', () => {
    const input = Player.Cross;
    const expectedResult = TileValue.Cross;
    const actualResult = playerToTileValue(input, true);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return TileValue Cross when player is Cross and Inner board is full', () => {
    const input = Player.Circle;
    const expectedResult = TileValue.Circle;
    const actualResult = playerToTileValue(input, true);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe('playerToWinner', () => {
  it('should return an Winner Cross when Player is Cross', () => {
    const input = Player.Cross;
    const expectedResult = Winner.Cross;
    const actualResult = playerToWinner(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return an Winner Circle when Player is Circle', () => {
    const input = Player.Circle;
    const expectedResult = Winner.Circle;
    const actualResult = playerToWinner(input);
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return an Winner None when Player is Spectator', () => {
    const input = Player.Spectator;
    const expectedResult = Winner.None;
    const actualResult = playerToWinner(input);
    expect(actualResult).toEqual(expectedResult);
  });
});

describe('arePointsEqual', () => {
  it('should return true when Points are equal', () => {
    const point1 = { x: 1, y: 2 };
    const point2 = { x: 1, y: 2 };
    const result1 = arePointsEqual(point1, point2);
    expect(result1).toEqual(true);

    const point11 = { x: 0, y: 0 };
    const point12 = { x: 0, y: 0 };
    const result2 = arePointsEqual(point11, point12);
    expect(result2).toEqual(true);
  });

  it('should return false when Points are not equal', () => {
    const point1 = { x: 1, y: 0 };
    const point2 = { x: 1, y: 2 };
    const result1 = arePointsEqual(point1, point2);
    expect(result1).toEqual(false);

    const point11 = { x: 0, y: 1 };
    const point12 = { x: 0, y: 0 };
    const result2 = arePointsEqual(point11, point12);
    expect(result2).toEqual(false);
  });
});
