import {
  Point,
  Move,
  Player,
  SmallBoardInformation,
  SmallTileInformation,
  TileInformation,
  TileValue,
  Winner,
  WinResult
} from '../types/game';
import { immerable } from 'immer';

export const displayTileValue: Record<TileValue | Player, string> = {
  [TileValue.Cross]: 'X',
  [TileValue.Circle]: 'O',
  [TileValue.Destroyed]: '/',
  [TileValue.Empty]: ''
};

export const playerToTileValue = (
  player: Winner | Player,
  isForFullSmallBoard = false
): TileValue => {
  if (isForFullSmallBoard && player === Winner.Draw) {
    return TileValue.Destroyed;
  } else if (player === Winner.Cross) {
    return TileValue.Cross;
  } else if (player === Winner.Circle) {
    return TileValue.Circle;
  } else {
    return TileValue.Empty;
  }
};

const arePointsEqual = (point1: Point, point2: Point): boolean => {
  if (point1.x === point2.x && point1.y === point2.y) {
    return true;
  }
  return false;
};

class TicTacToeGame {
  [immerable] = true;
  private board: SmallBoardInformation[];
  private moves: Move[];
  private currentPlayer: Player;

  constructor(moves: Move[] = []) {
    this.board = this.getInitialSmallBoards();
    this.currentPlayer = Player.Cross;
    this.moves = [];
    this.applyMoves(moves);
  }

  applyMove(move: Move): boolean {
    const boardToChange = this.board.find((board) =>
      arePointsEqual(board.position, move.boardPosition)
    );

    const tileToChange = boardToChange?.tiles.find((tile) =>
      arePointsEqual(tile.position, move.tilePosition)
    );

    // Invalid moves
    if (
      !boardToChange ||
      !tileToChange ||
      !this.validMove(move, boardToChange, tileToChange)
    ) {
      return false;
    }

    tileToChange.value = playerToTileValue(this.currentPlayer);
    const winResult = this.getWinResultForGivenBoard(boardToChange.tiles);
    if (winResult.isFinished) {
      boardToChange.value = playerToTileValue(winResult.winningPlayer, true);
    }

    this.moves.push(move);
    this.changePlayer();
    return true;
  }

  private validMove(
    move: Move,
    boardToChange: SmallBoardInformation,
    tileToChange: SmallTileInformation
  ): boolean {
    if (this.moves.length === 0) return true;

    let isValidMove = false;
    // Check last move to determine valid small board position
    const lastBoard = this.board.find((board) =>
      arePointsEqual(
        board.position,
        this.moves[this.moves.length - 1].tilePosition
      )
    );

    // Check if smallboard is filled or is valid.
    if (
      lastBoard &&
      (lastBoard.value != TileValue.Empty ||
        arePointsEqual(lastBoard.position, move.boardPosition))
    ) {
      // Check if tile or board is not filled
      if (
        boardToChange.value === TileValue.Empty &&
        tileToChange.value === TileValue.Empty
      ) {
        isValidMove = true;
      }
    }
    return isValidMove;
  }

  applyMoves(moves: Move[]): boolean[] {
    return moves.map((move) => this.applyMove(move));
  }

  getWinResultForSmallBoard(boardPosition: Point): WinResult {
    const affectedBoard = this.board.find((board) =>
      arePointsEqual(board.position, boardPosition)
    );
    return this.getWinResultForGivenBoard(
      affectedBoard ? affectedBoard.tiles : []
    );
  }

  getCurrentActiveBoards(): Point[] {
    if (this.moves.length === 0) {
      const allBoards: Point[] = [];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          allBoards.push({ x, y });
        }
      }

      return allBoards;
    }

    if (this.getWinResult().isFinished) {
      return [];
    }

    const lastMove = this.moves[this.moves.length - 1].tilePosition;
    let activeBoards = [lastMove];
    const boardLastMovePointsTo = this.board.find(
      (board: SmallBoardInformation) => arePointsEqual(board.position, lastMove)
    );
    if (
      boardLastMovePointsTo &&
      boardLastMovePointsTo.value !== TileValue.Empty
    ) {
      const allUnfinishedBoards = this.board.filter(
        (board: SmallBoardInformation) => board.value === TileValue.Empty
      );
      activeBoards = allUnfinishedBoards.map(
        (board: SmallBoardInformation) => board.position
      );
    }

    return activeBoards;
  }

  getWinResult(): WinResult {
    return this.getWinResultForGivenBoard(this.board);
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  getMoves(): Move[] {
    return this.moves;
  }

  getBoard(): SmallBoardInformation[] {
    return this.board;
  }

  private getInitialSmallBoards() {
    const getInitialTilesOfSmallBoard = (boardPosition: Point) => {
      const tiles: SmallTileInformation[] = [];
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          tiles.push({
            boardPosition: boardPosition,
            position: { x, y },
            value: TileValue.Empty
          });
        }
      }
      return tiles;
    };

    const smallBoards: SmallBoardInformation[] = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        smallBoards.push({
          value: TileValue.Empty,
          position: { x, y },
          tiles: getInitialTilesOfSmallBoard({ x, y })
        });
      }
    }
    return smallBoards;
  }

  private changePlayer() {
    if (this.currentPlayer === Player.Circle) {
      this.currentPlayer = Player.Cross;
    } else {
      this.currentPlayer = Player.Circle;
    }
  }

  private getWinResultForGivenBoard = (board: TileInformation[]): WinResult => {
    const countInLine = (player: Player, row: TileInformation[]): number => {
      return row.filter((el) => el.value === playerToTileValue(player)).length;
    };

    const hasWonLine = (player: Player, row: TileInformation[]): boolean => {
      return countInLine(player, row) === 3;
    };

    // Check every possible winning combination
    const getWinResultForPlayer = (player: Player): boolean => {
      return [
        // Row 0
        hasWonLine(
          player,
          board.filter((el) => el.position.x === 0)
        ),
        // Row 1
        hasWonLine(
          player,
          board.filter((el) => el.position.x === 1)
        ),
        // Row 2
        hasWonLine(
          player,
          board.filter((el) => el.position.x === 2)
        ),
        // Column 0
        hasWonLine(
          player,
          board.filter((el) => el.position.y === 0)
        ),
        // Column 1
        hasWonLine(
          player,
          board.filter((el) => el.position.y === 1)
        ),
        // Column 2
        hasWonLine(
          player,
          board.filter((el) => el.position.y === 2)
        ),
        // Left slant
        hasWonLine(
          player,
          board.filter((el) => el.position.x === el.position.y)
        ),
        // Right slant
        hasWonLine(
          player,
          board.filter((el) => el.position.x + el.position.y === 2)
        )
      ].includes(true);
    };

    const hasCrossWon = getWinResultForPlayer(Player.Cross);
    const hasCircleWon = getWinResultForPlayer(Player.Circle);
    const boardIsFull = board.every((element) => {
      return element.value !== TileValue.Empty;
    });

    if (hasCrossWon) {
      return {
        isFinished: true,
        winningPlayer: Winner.Cross
      };
    } else if (hasCircleWon) {
      return {
        isFinished: true,
        winningPlayer: Winner.Circle
      };
    } else if (boardIsFull) {
      return {
        isFinished: true,
        winningPlayer: Winner.Draw
      };
    } else {
      return {
        isFinished: false,
        winningPlayer: Winner.None
      };
    }
  };
}

export default TicTacToeGame;
