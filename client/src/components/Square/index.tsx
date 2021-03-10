import './Square.scss';

import classNames from 'classnames';
import React, { FC } from 'react';

import { TileValue } from '../../types/game';
import { displayTileValue } from '../../utils/gameUtils';

interface SquareProps {
  isActive?: boolean;
  notationPosition?: string;
  tileValue: TileValue;
  makeMove: () => void;
}

const Square: FC<SquareProps> = ({
  isActive = false,
  notationPosition = '',
  tileValue,
  makeMove
}: SquareProps) => {
  return (
    <td
      className={classNames(`cell ${notationPosition}`, {
        enabled: isActive && tileValue === TileValue.Empty
      })}
      onClick={makeMove}
      data-testid="game-square"
    >
      {displayTileValue[tileValue]}
    </td>
  );
};

export default Square;
