import React, { FC, useCallback } from 'react';
import classNames from 'classnames';

import './Game.css';
import { TileValue } from '../../types/game';
import { useAppState } from '../../context/AppContext';
import { GameAction } from '../../types/gameDisplay';
import { displayTileValue } from '../../utils/gameEngine';
const Game: FC = () => {
  const [state, dispatch] = useAppState();

  const isActiveBoard = useCallback(
    (boardRow, boardCol) =>
      state.game
        .getCurrentActiveBoards()
        .some((board) => board.x == boardRow && board.y == boardCol),
    [state.game]
  );

  const getTileValue = useCallback(
    (boardRow, boardCol, tileRow, tileCol) =>
      state.game.getBoard()[boardRow * 3 + boardCol].tiles[
        tileRow * 3 + tileCol
      ],
    [state.game]
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-push-8">
          <div
            id="player-display"
            className="alert alert-info"
            role="alert"
            style={{ display: 'none' }}
          />
          <div className="panel panel-default">
            <div className="panel-body">
              <form>
                {/* <div className="form-group">
                  <label htmlFor="opponent">Opponent</label>
                  <select className="form-control" id="opponent">
                    <option value="friend">Play with friend</option>
                    <option value="computer">Play against computer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="first">Who goes first</label>
                  <select className="form-control" id="first">
                    <option value="player">Player</option>
                    <option value="computer">Computer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="difficulty">Difficulty</label>
                  <select id="difficulty" className="form-control">
                    <option value="1">Piece of cake</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                    <option value="4">Very hard</option>
                    <option value="5">Extremely hard</option>
                    <option value="6">Expert</option>
                    <option value="7">Grandmaster</option>
                    <option value="8">Impossible</option>
                  </select>
                </div> */}
                <button
                  type="button"
                  id="new-game"
                  className="btn btn-primary"
                  onClick={() => dispatch({ type: GameAction.RESTART })}
                >
                  New game
                </button>
              </form>
            </div>
          </div>
          <div className="panel panel-default hidden-xs hidden-sm">
            <div className="panel-heading">
              <h2 className="panel-title">History</h2>
            </div>
            <table className="table" id="history-table">
              <thead>
                <tr className="table-row">
                  <th scope="col">Turn</th>
                  <th scope="col">Player</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                {state.game.getMoves().map((move, index) => (
                  <tr key={`move-${index}`} className="table-row">
                    <td>{index + 1}</td>
                    <td>{index % 2 ? 'O' : 'X'}</td>
                    <td>{`(${move.boardPosition.x},${move.boardPosition.y}) (${move.tilePosition.x},${move.tilePosition.y})`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-8 col-md-pull-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 id="game-caption" className="panel-title">
                {!state.game.getWinResult().isFinished
                  ? state.game.getMoves().length === 0
                    ? 'Click a square to start'
                    : `${
                        displayTileValue[state.game.getCurrentPlayer()]
                      }'s Turn`
                  : `${
                      displayTileValue[state.game.getWinResult().winningPlayer]
                    } Won`}
              </h1>
            </div>
            <div className="panel-body">
              <div
                id="game"
                className={classNames({
                  disabled: state.game.getWinResult().isFinished
                })}
              >
                <table>
                  <tbody>
                    {[0, 1, 2].map((boardRowIndex) => (
                      <tr key={`board-col-${boardRowIndex}`}>
                        {[0, 1, 2].map((boardColIndex) =>
                          !state.game.getWinResultForSmallBoard({
                            x: boardRowIndex,
                            y: boardColIndex
                          }).isFinished ? (
                            <td
                              key={`board-col-${boardColIndex}`}
                              className={classNames('smallBoard', {
                                enabled:
                                  state.game.getMoves().length > 0 &&
                                  isActiveBoard(boardRowIndex, boardColIndex)
                              })}
                            >
                              <table>
                                <tbody>
                                  {['N', '', 'S'].map(
                                    (rowPosition, tileRowIndex) => (
                                      <tr key={`tile-row-${rowPosition}`}>
                                        {['W', '', 'E'].map(
                                          (colPosition, tileColIndex) => (
                                            <td
                                              key={`tile-col-${colPosition}`}
                                              className={classNames(
                                                `cell ${rowPosition}${colPosition}`,
                                                {
                                                  enabled:
                                                    isActiveBoard(
                                                      boardRowIndex,
                                                      boardColIndex
                                                    ) &&
                                                    getTileValue(
                                                      boardRowIndex,
                                                      boardColIndex,
                                                      tileRowIndex,
                                                      tileColIndex
                                                    ).value === TileValue.Empty
                                                }
                                              )}
                                              onClick={() =>
                                                dispatch({
                                                  type: GameAction.MOVE,
                                                  payload: {
                                                    boardPosition: {
                                                      x: boardRowIndex,
                                                      y: boardColIndex
                                                    },
                                                    tilePosition: {
                                                      x: tileRowIndex,
                                                      y: tileColIndex
                                                    }
                                                  }
                                                })
                                              }
                                            >
                                              {getTileValue(
                                                boardRowIndex,
                                                boardColIndex,
                                                tileRowIndex,
                                                tileColIndex
                                              ).value === TileValue.Cross &&
                                                'X'}
                                              {getTileValue(
                                                boardRowIndex,
                                                boardColIndex,
                                                tileRowIndex,
                                                tileColIndex
                                              ).value === TileValue.Circle &&
                                                'O'}
                                            </td>
                                          )
                                        )}
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </td>
                          ) : (
                            <td
                              key={`board-col-${boardColIndex}`}
                              className="smallBoard"
                            >
                              {
                                displayTileValue[
                                  state.game.getWinResultForSmallBoard({
                                    x: boardRowIndex,
                                    y: boardColIndex
                                  }).winningPlayer
                                ]
                              }
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
