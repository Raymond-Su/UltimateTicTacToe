import React, { FC } from 'react';

import './Game.scss';
import { Winner } from '../../types/game';
import { useStateValue } from '../../context/AppContext';
import { displayTileValue } from '../../context/stores/gameStore';
import { observer } from 'mobx-react-lite';
import Board from '../../components/Board';
const Game: FC = () => {
  const game = useStateValue();
  const renderTitle = () => {
    if (!game.getWinResult.isFinished) {
      return game.getMoves.length === 0
        ? 'Click a square to start'
        : `${displayTileValue[game.getCurrentPlayer]}'s Turn`;
    }

    return game.getWinResult.winningPlayer === Winner.Draw
      ? 'Draw'
      : `${displayTileValue[game.getWinResult.winningPlayer]} Won`;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-pull-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 id="game-caption" className="panel-title">
                {renderTitle()}
              </h1>
            </div>
            <Board
              newGame={game.getMoves.length === 0}
              isFinished={game.getWinResult.isFinished}
              board={game.getBoard}
              activeInnerBoards={game.getCurrentActiveBoards}
              makeMove={(move) => game.applyMove(move)}
            />
          </div>
        </div>
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
                  onClick={() => game.restart()}
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
                {game.getMoves.map((move, index) => (
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
      </div>
    </div>
  );
};

export default observer(Game);
