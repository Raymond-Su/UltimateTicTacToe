import './InnerBoard.scss';

import classNames from 'classnames';
import React, { FC } from 'react';

import { Move, SquareInformation, TileValue } from '../../types/game';
import { displayTileValue } from '../../utils/gameUtils';
import Square from '../Square';

interface InnerBoardProps {
  newGame: boolean;
  boardActive: boolean;
  boardValue: TileValue;
  tiles: SquareInformation[];
  makeMove: (move: Move) => void;
}

const InnerBoard: FC<InnerBoardProps> = ({
  newGame,
  boardActive,
  boardValue,
  tiles,
  makeMove
}: InnerBoardProps) => {
  const getTile = (row: number, col: number) => tiles[row * 3 + col];

  return (
    <td
      className={classNames('innerBoard', {
        enabled: !newGame && boardActive
      })}
    >
      {boardValue === TileValue.Empty ? (
        <table className="square-table">
          <tbody>
            {['N', '', 'S'].map((rowNotation, row) => (
              <tr key={`square-row-${rowNotation}`}>
                {['W', '', 'E'].map((colNotation, col) => (
                  <Square
                    key={`square-${rowNotation + colNotation}`}
                    isActive={boardActive}
                    notationPosition={rowNotation + colNotation}
                    tileValue={getTile(row, col).value}
                    makeMove={() =>
                      makeMove({
                        boardPosition: getTile(row, col).boardPosition,
                        tilePosition: { x: row, y: col }
                      })
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        displayTileValue[boardValue]
      )}
    </td>
  );
};

export default InnerBoard;
