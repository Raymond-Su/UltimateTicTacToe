import { TileValue } from '../../../../types/game';
// this not a finished board
/*
 with the following situation: ( . = not finished )
 X X .
 . O .
 . O .
 */

const unfinishedBoardMock = [
  {
    value: TileValue.Cross,
    position: {
      x: 0,
      y: 0
    },
    tiles: [
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Cross,
    position: {
      x: 0,
      y: 1
    },
    tiles: [
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 1
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Empty,
    position: {
      x: 0,
      y: 2
    },
    tiles: [
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 0,
          y: 2
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Empty,
    position: {
      x: 1,
      y: 0
    },
    tiles: [
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 1,
          y: 0
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Circle,
    position: {
      x: 1,
      y: 1
    },
    tiles: [
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 1
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Empty,
    position: {
      x: 1,
      y: 2
    },
    tiles: [
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 1,
          y: 2
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Empty,
    position: {
      x: 2,
      y: 0
    },
    tiles: [
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 2,
          y: 0
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Circle,
    position: {
      x: 2,
      y: 1
    },
    tiles: [
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Circle
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 1
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  },
  {
    value: TileValue.Empty,
    position: {
      x: 2,
      y: 2
    },
    tiles: [
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 0,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 0,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 0,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 1,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 1,
          y: 1
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 1,
          y: 2
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 2,
          y: 0
        },
        value: TileValue.Empty
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 2,
          y: 1
        },
        value: TileValue.Cross
      },
      {
        boardPosition: {
          x: 2,
          y: 2
        },
        position: {
          x: 2,
          y: 2
        },
        value: TileValue.Empty
      }
    ]
  }
];

const movesForUnfinishedBoardMock = [
  {
    boardPosition: {
      x: 0,
      y: 0
    },
    tilePosition: {
      x: 1,
      y: 1
    },
    player: 0,
    moveNumber: 1
  },
  {
    boardPosition: {
      x: 1,
      y: 1
    },
    tilePosition: {
      x: 0,
      y: 0
    },
    player: 1,
    moveNumber: 2
  },
  {
    boardPosition: {
      x: 0,
      y: 0
    },
    tilePosition: {
      x: 1,
      y: 2
    },
    player: 0,
    moveNumber: 3
  },
  {
    boardPosition: {
      x: 1,
      y: 2
    },
    tilePosition: {
      x: 0,
      y: 0
    },
    player: 1,
    moveNumber: 4
  },
  {
    boardPosition: {
      x: 0,
      y: 0
    },
    tilePosition: {
      x: 1,
      y: 0
    },
    player: 0,
    moveNumber: 5
  },
  {
    boardPosition: {
      x: 1,
      y: 0
    },
    tilePosition: {
      x: 0,
      y: 1
    },
    player: 1,
    moveNumber: 6
  },
  {
    boardPosition: {
      x: 0,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 1
    },
    player: 0,
    moveNumber: 7
  },
  {
    boardPosition: {
      x: 1,
      y: 1
    },
    tilePosition: {
      x: 0,
      y: 1
    },
    player: 1,
    moveNumber: 8
  },
  {
    boardPosition: {
      x: 0,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 2
    },
    player: 0,
    moveNumber: 9
  },
  {
    boardPosition: {
      x: 1,
      y: 2
    },
    tilePosition: {
      x: 0,
      y: 1
    },
    player: 1,
    moveNumber: 10
  },
  {
    boardPosition: {
      x: 0,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 0
    },
    player: 0,
    moveNumber: 11
  },
  {
    boardPosition: {
      x: 1,
      y: 0
    },
    tilePosition: {
      x: 1,
      y: 1
    },
    player: 1,
    moveNumber: 12
  },
  {
    boardPosition: {
      x: 1,
      y: 1
    },
    tilePosition: {
      x: 0,
      y: 2
    },
    player: 0,
    moveNumber: 13
  },
  {
    boardPosition: {
      x: 0,
      y: 2
    },
    tilePosition: {
      x: 0,
      y: 2
    },
    player: 1,
    moveNumber: 14
  },
  {
    boardPosition: {
      x: 0,
      y: 2
    },
    tilePosition: {
      x: 1,
      y: 1
    },
    player: 0,
    moveNumber: 15
  },
  {
    boardPosition: {
      x: 1,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 0
    },
    player: 1,
    moveNumber: 16
  },
  {
    boardPosition: {
      x: 1,
      y: 0
    },
    tilePosition: {
      x: 0,
      y: 0
    },
    player: 0,
    moveNumber: 17
  },
  {
    boardPosition: {
      x: 1,
      y: 1
    },
    tilePosition: {
      x: 2,
      y: 0
    },
    player: 1,
    moveNumber: 18
  },
  {
    boardPosition: {
      x: 2,
      y: 0
    },
    tilePosition: {
      x: 2,
      y: 1
    },
    player: 0,
    moveNumber: 19
  },
  {
    boardPosition: {
      x: 2,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 1
    },
    player: 1,
    moveNumber: 20
  },
  {
    boardPosition: {
      x: 1,
      y: 0
    },
    tilePosition: {
      x: 2,
      y: 1
    },
    player: 0,
    moveNumber: 21
  },
  {
    boardPosition: {
      x: 2,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 0
    },
    player: 1,
    moveNumber: 22
  },
  {
    boardPosition: {
      x: 1,
      y: 0
    },
    tilePosition: {
      x: 1,
      y: 2
    },
    player: 0,
    moveNumber: 23
  },
  {
    boardPosition: {
      x: 1,
      y: 2
    },
    tilePosition: {
      x: 1,
      y: 1
    },
    player: 1,
    moveNumber: 24
  },
  {
    boardPosition: {
      x: 2,
      y: 2
    },
    tilePosition: {
      x: 2,
      y: 1
    },
    player: 0,
    moveNumber: 25
  },
  {
    boardPosition: {
      x: 2,
      y: 1
    },
    tilePosition: {
      x: 1,
      y: 2
    },
    player: 1,
    moveNumber: 26
  },
  {
    boardPosition: {
      x: 1,
      y: 2
    },
    tilePosition: {
      x: 2,
      y: 1
    },
    player: 0,
    moveNumber: 27
  }
];

export { movesForUnfinishedBoardMock, unfinishedBoardMock };
