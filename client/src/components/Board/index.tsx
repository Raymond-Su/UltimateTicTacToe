import React, { FC } from 'react';
import classNames from 'classnames';
import { Move, Point, innerBoardInformation } from '../../types/game';
import InnerBoard from '../InnerBoard';
import './Board.scss';

interface BoardProps {
  isFinished: boolean;
  newGame: boolean;
  board: innerBoardInformation[];
  activeInnerBoards: Point[];
  makeMove: (move: Move) => void;
}

const Board: FC<BoardProps> = ({
  isFinished,
  newGame,
  board,
  activeInnerBoards,
  makeMove
}: BoardProps) => {
  const getInnerBoard = (row: number, col: number) => board[row * 3 + col];
  return (
    <div
      id="game"
      className={classNames({
        disabled: isFinished
      })}
    >
      <table className="innerboard-table">
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={`InnerBoard-row-${row}`}>
              {[0, 1, 2].map((col) => (
                <InnerBoard
                  key={`innerBoard-${row * 3 + col}`}
                  newGame={newGame}
                  boardActive={activeInnerBoards.some(
                    (board) => board.x === row && board.y === col
                  )}
                  boardValue={getInnerBoard(row, col).value}
                  makeMove={makeMove}
                  tiles={getInnerBoard(row, col).tiles}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
