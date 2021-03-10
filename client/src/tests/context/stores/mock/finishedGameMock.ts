// this provides the following finished board
/*
 crossFinishedGame:
  with the following situation: ( . = not finished, - = draw )
  . . X
  . X .
  X - O
*/

import { Move } from '../../../../types/game';

export const finishedGameMoves: Move[] = [
  {
    boardPosition: { x: 0, y: 0 },
    tilePosition: { x: 1, y: 0 }
  },
  {
    boardPosition: { x: 1, y: 0 },
    tilePosition: { x: 1, y: 1 }
  },
  {
    boardPosition: { x: 1, y: 1 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 1, y: 2 }
  },
  {
    boardPosition: { x: 1, y: 2 },
    tilePosition: { x: 0, y: 0 }
  },
  {
    boardPosition: { x: 0, y: 0 },
    tilePosition: { x: 2, y: 2 }
  },
  {
    boardPosition: { x: 2, y: 2 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 2, y: 2 }
  },
  {
    boardPosition: { x: 2, y: 2 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 2, y: 2 }
  },
  {
    boardPosition: { x: 2, y: 2 },
    tilePosition: { x: 1, y: 0 }
  },
  {
    boardPosition: { x: 1, y: 0 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 1, y: 1 }
  },
  {
    boardPosition: { x: 1, y: 1 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 0, y: 2 }
  },
  {
    boardPosition: { x: 0, y: 2 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 0, y: 2 }
  },
  {
    boardPosition: { x: 0, y: 2 },
    tilePosition: { x: 1, y: 0 }
  },
  {
    boardPosition: { x: 1, y: 0 },
    tilePosition: { x: 1, y: 2 }
  },
  {
    boardPosition: { x: 1, y: 2 },
    tilePosition: { x: 1, y: 1 }
  },
  {
    boardPosition: { x: 1, y: 1 },
    tilePosition: { x: 1, y: 1 }
  },
  {
    boardPosition: { x: 1, y: 1 },
    tilePosition: { x: 2, y: 2 }
  },
  {
    boardPosition: { x: 2, y: 2 },
    tilePosition: { x: 0, y: 0 }
  },
  {
    boardPosition: { x: 0, y: 0 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 0, y: 0 }
  },
  {
    boardPosition: { x: 0, y: 0 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 0, y: 1 }
  },
  {
    boardPosition: { x: 0, y: 1 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 1, y: 0 }
  },
  {
    boardPosition: { x: 1, y: 0 },
    tilePosition: { x: 0, y: 2 }
  },
  {
    boardPosition: { x: 0, y: 2 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 0, y: 1 }
  },
  {
    boardPosition: { x: 0, y: 1 },
    tilePosition: { x: 2, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 1, y: 0 }
  },
  {
    boardPosition: { x: 1, y: 0 },
    tilePosition: { x: 2, y: 2 }
  },
  {
    boardPosition: { x: 2, y: 1 },
    tilePosition: { x: 1, y: 2 }
  },
  {
    boardPosition: { x: 1, y: 2 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 1, y: 1 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 2, y: 0 }
  },
  {
    boardPosition: { x: 2, y: 0 },
    tilePosition: { x: 0, y: 0 }
  },
  {
    boardPosition: { x: 0, y: 0 },
    tilePosition: { x: 0, y: 2 }
  },
  {
    boardPosition: { x: 0, y: 2 },
    tilePosition: { x: 0, y: 2 }
  },
  {
    boardPosition: { x: 0, y: 2 },
    tilePosition: { x: 2, y: 2 }
  },
  {
    boardPosition: { x: 0, y: 2 },
    tilePosition: { x: 1, y: 1 }
  }
];
