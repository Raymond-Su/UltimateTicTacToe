import { makeAutoObservable } from 'mobx';
import {
  Point,
  Move,
  Player,
  innerBoardInformation,
  SquareInformation,
  TileInformation,
  TileValue,
  Winner,
  WinResult
} from '../../types/game';

export const displayTileValue: Record<TileValue | Player, string> = {
  [TileValue.Cross]: 'X',
  [TileValue.Circle]: 'O',
  [TileValue.Destroyed]: '/',
  [TileValue.Empty]: ''
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

const arePointsEqual = (point1: Point, point2: Point): boolean => {
  if (point1.x === point2.x && point1.y === point2.y) {
    return true;
  }
  return false;
};

class GameStore {
  private board: innerBoardInformation[];
  private moves: Move[];
  private currentPlayer: Player;

  constructor(moves: Move[] = []) {
    this.board = this.getInitialInnerBoards();
    this.currentPlayer = Player.Cross;
    this.moves = [];
    this.applyMoves(moves);
    makeAutoObservable(this);
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

  applyMoves(moves: Move[]): boolean[] {
    return moves.map((move) => this.applyMove(move));
  }

  getWinResultForInnerBoard(boardPosition: Point): WinResult {
    const affectedBoard = this.board.find((board) =>
      arePointsEqual(board.position, boardPosition)
    );
    return this.getWinResultForGivenBoard(
      affectedBoard ? affectedBoard.tiles : []
    );
  }
  restart(): void {
    this.moves = [];
    this.board = this.getInitialInnerBoards();
    this.currentPlayer = Player.Cross;
  }

  get getCurrentActiveBoards(): Point[] {
    if (this.moves.length === 0) {
      const allBoards: Point[] = [];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          allBoards.push({ x, y });
        }
      }

      return allBoards;
    }

    if (this.getWinResult.isFinished) {
      return [];
    }

    const lastMove = this.moves[this.moves.length - 1].tilePosition;
    let activeBoards = [lastMove];
    const boardLastMovePointsTo = this.board.find(
      (board: innerBoardInformation) => arePointsEqual(board.position, lastMove)
    );
    if (
      boardLastMovePointsTo &&
      boardLastMovePointsTo.value !== TileValue.Empty
    ) {
      const allUnfinishedBoards = this.board.filter(
        (board: innerBoardInformation) => board.value === TileValue.Empty
      );
      activeBoards = allUnfinishedBoards.map(
        (board: innerBoardInformation) => board.position
      );
    }

    return activeBoards;
  }

  get getWinResult(): WinResult {
    return this.getWinResultForGivenBoard(this.board);
  }

  get getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  get getMoves(): Move[] {
    return this.moves;
  }

  get getBoard(): innerBoardInformation[] {
    return this.board;
  }

  private getInitialInnerBoards() {
    const getInitialTilesOfInnerBoard = (boardPosition: Point) => {
      const tiles: SquareInformation[] = [];
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

    const innerBoards: innerBoardInformation[] = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        innerBoards.push({
          value: TileValue.Empty,
          position: { x, y },
          tiles: getInitialTilesOfInnerBoard({ x, y })
        });
      }
    }
    return innerBoards;
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

  private validMove(
    move: Move,
    boardToChange: innerBoardInformation,
    tileToChange: SquareInformation
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

    // Check if innerBoard is filled or is valid.
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
}

export default GameStore;
