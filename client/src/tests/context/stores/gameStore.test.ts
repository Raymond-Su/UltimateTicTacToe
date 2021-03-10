import GameStore from '../../../context/stores/gameStore';
import { Move, Player, TileValue, Winner } from '../../../types/game';
import {
  activeBoardsForBoardWithThreeMovesMock,
  boardWithOneMoveMock,
  boardWithThreeMovesMock,
  boardWithTwoMovesMock,
  finishedGameMoves,
  movesForBoardWithThreeMovesMock,
  movesForCircleFinishedBoardMock,
  movesForCrossFinishedBoardMock,
  movesForDrawFinishedBoardMock,
  movesForUnfinishedBoardMock,
  unfinishedBoardMock
} from './mock';

describe('TicTacToe Game-Engine', () => {
  describe('constructor', () => {
    test('should initialize the game', () => {
      const game = new GameStore();
      game.getBoard.forEach((board) => {
        expect(board.value).toEqual(TileValue.Empty);
        board.tiles.forEach((tile) => {
          expect(tile.value).toEqual(TileValue.Empty);
        });
      });
      expect(game.getMoves).toEqual([]);
      expect(game.getCurrentPlayer).toEqual(Player.Cross);
    });

    test('should apply the moves given an array of moves', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock);

      expect(game.getMoves.length).toEqual(
        movesForBoardWithThreeMovesMock.length
      );
      expect(game.getMoves).toEqual(movesForBoardWithThreeMovesMock);
      expect(game.getBoard).toEqual(boardWithThreeMovesMock);
      expect(game.getCurrentPlayer).toEqual(Player.Circle);
    });
  });

  describe('applyMove', () => {
    test('should apply the given move', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock.slice(0, 2));
      expect(game.getCurrentPlayer).toEqual(Player.Cross);
      expect(game.getMoves.length).toEqual(2);

      game.applyMove(movesForBoardWithThreeMovesMock[2]);
      expect(game.getMoves.length).toEqual(3);
      expect(game.getBoard).toEqual(boardWithThreeMovesMock);
    });

    test('should apply the given move and update activeBoard', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock.slice(0, 2));
      expect(game.getCurrentPlayer).toEqual(Player.Cross);
      expect(game.getMoves.length).toEqual(2);

      game.applyMove(movesForBoardWithThreeMovesMock[2]);
      expect(game.getMoves.length).toEqual(3);
      expect(game.getBoard).toEqual(boardWithThreeMovesMock);
    });

    test('should not apply move if board position does not match last move tile position', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock.slice(0, 1));
      const invalidMove: Move = {
        boardPosition: { x: 0, y: 0 },
        tilePosition: { x: 0, y: 0 }
      };
      const moveResult = game.applyMove(invalidMove);
      expect(moveResult).toEqual(false);
      expect(game.getMoves.length).toEqual(1);
      expect(game.getBoard).toEqual(boardWithOneMoveMock);
    });
    test('should not apply move when tile is already filled', () => {
      const game = new GameStore([
        { boardPosition: { x: 1, y: 1 }, tilePosition: { x: 1, y: 1 } }
      ]);
      const invalidMove: Move = {
        boardPosition: { x: 1, y: 1 },
        tilePosition: { x: 1, y: 1 }
      };
      const moveResult = game.applyMove(invalidMove);
      expect(moveResult).toEqual(false);
      expect(game.getMoves.length).toEqual(1);
    });
  });

  describe('applyMoves', () => {
    test('should apply the given moves', () => {
      const game = new GameStore([]);
      game.applyMoves(movesForBoardWithThreeMovesMock.slice(0, 2));

      expect(game.getBoard).toEqual(boardWithTwoMovesMock);
    });
  });

  describe('getCurrentPlayer', () => {
    test('should return Circle when in second move', () => {
      const game = new GameStore([]);
      game.applyMove(movesForBoardWithThreeMovesMock[0]);

      expect(game.getCurrentPlayer).toEqual(Player.Circle);
    });

    test('should return Cross when in third move', () => {
      const game = new GameStore([]);
      game.applyMove(movesForBoardWithThreeMovesMock[0]);
      game.applyMove(movesForBoardWithThreeMovesMock[1]);

      expect(game.getCurrentPlayer).toEqual(Player.Cross);
    });
  });

  describe('getWinResult', () => {
    test('should indicate that game is not finished', () => {
      const game = new GameStore(movesForUnfinishedBoardMock);

      const winResult = game.getWinResult;
      expect(winResult.isFinished).toBe(false);
      expect(winResult.winningPlayer).toBe(Winner.None);
    });

    test('should indicate a draw', () => {
      const game = new GameStore(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResult;
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Draw);
    });

    test('should indicate that Cross won', () => {
      const game = new GameStore(movesForCrossFinishedBoardMock);

      const winResult = game.getWinResult;
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Cross);
    });

    test('should indicate that Circle won', () => {
      const game = new GameStore(movesForCircleFinishedBoardMock);

      const winResult = game.getWinResult;
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Circle);
    });
  });

  describe('getWinResultForInnerBoard', () => {
    test('should indicate that inner board is not finished', () => {
      const game = new GameStore(movesForUnfinishedBoardMock);

      const winResult = game.getWinResultForInnerBoard({ x: 2, y: 2 });
      expect(winResult.isFinished).toBe(false);
      expect(winResult.winningPlayer).toBe(Winner.None);
    });

    test('should indicate that inner board resulted in a draw', () => {
      const game = new GameStore(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResultForInnerBoard({ x: 0, y: 1 });
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Draw);
    });

    test('should indicate that Cross won the inner board', () => {
      const game = new GameStore(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResultForInnerBoard({ x: 0, y: 0 });
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Cross);
    });

    test('should indicate that Circle won the inner board', () => {
      const game = new GameStore(movesForDrawFinishedBoardMock);

      const winResult = game.getWinResultForInnerBoard({ x: 2, y: 2 });
      expect(winResult.isFinished).toBe(true);
      expect(winResult.winningPlayer).toBe(Winner.Circle);
    });

    test('should indicate no winner if inner board is not found', () => {
      const game = new GameStore();

      const winResult = game.getWinResultForInnerBoard({ x: 3, y: 3 });
      expect(winResult.isFinished).toBe(false);
      expect(winResult.winningPlayer).toBe(Winner.None);
    });
  });

  describe('getCurrentActiveBoards', () => {
    test('should return all boards when no moves were applied', () => {
      const game = new GameStore([]);

      expect(game.getCurrentActiveBoards).toHaveLength(9);
    });

    test('should return the current active board when moves were applied', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock);

      expect(game.getCurrentActiveBoards).toEqual(
        activeBoardsForBoardWithThreeMovesMock
      );
    });

    test('should return all empty when last move points to finished board', () => {
      const game = new GameStore(movesForUnfinishedBoardMock);

      const emptyBoards = unfinishedBoardMock.filter(
        (b) => b.value === TileValue.Empty
      ).length;
      expect(game.getCurrentActiveBoards).toHaveLength(emptyBoards);
    });

    test('should return all empty when game is finished', () => {
      const game = new GameStore(finishedGameMoves);
      expect(game.getCurrentActiveBoards).toHaveLength(0);
    });
  });

  describe('restart', () => {
    test('should do nothing when restarting new game', () => {
      const game = new GameStore([]);
      game.restart();
      game.getBoard.forEach((board) => {
        expect(board.value).toEqual(TileValue.Empty);
        board.tiles.forEach((tile) => {
          expect(tile.value).toEqual(TileValue.Empty);
        });
      });
      expect(game.getMoves).toEqual([]);
      expect(game.getCurrentPlayer).toEqual(Player.Cross);
    });

    test('should restart to new game when moves are applied', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock);
      game.restart();
      game.getBoard.forEach((board) => {
        expect(board.value).toEqual(TileValue.Empty);
        board.tiles.forEach((tile) => {
          expect(tile.value).toEqual(TileValue.Empty);
        });
      });
      expect(game.getMoves).toEqual([]);
      expect(game.getCurrentPlayer).toEqual(Player.Cross);
    });
  });

  describe('setPlayer', () => {
    test('should set player to Player Cricle when input is Player Circle', () => {
      const game = new GameStore();
      expect(game.getCurrentPlayer).toEqual(Player.Cross);
      game.setPlayer(Player.Circle);
      expect(game.getCurrentPlayer).toEqual(Player.Circle);
    });
    test('should do nothing when player is already Player Circle and input is Player Circle', () => {
      const game = new GameStore(movesForBoardWithThreeMovesMock.slice(0, 1));
      expect(game.getCurrentPlayer).toEqual(Player.Circle);
      game.setPlayer(Player.Circle);
      expect(game.getCurrentPlayer).toEqual(Player.Circle);
    });
  });
});
