import React, { FC } from 'react';
import { Winner } from '../../types/game';
import { useStateValue } from '../../context/AppContext';
import { displayTileValue } from '../../context/stores/gameStore';
import { observer } from 'mobx-react-lite';

import Board from '../../components/Board';
import PanelHeading from '../../components/PanelHeading';
import PanelBody from '../../components/PanelBody';
import Panel from '../../components/Panel';
import MoveHistoryTable from '../../components/MoveHistoryTable';
import Container from '../../components/Container';

import './OnlineGame.scss';

const OnlineGame: FC = () => {
  const game = useStateValue();

  const renderTitle = () => {
    if (!game.getWinResult.isFinished) {
      return game.getMoves.length === 0
        ? 'Click any Square to start'
        : `${displayTileValue[game.getCurrentPlayer]}'s Turn`;
    }
    return game.getWinResult.winningPlayer === Winner.Draw
      ? 'Draw'
      : `${displayTileValue[game.getWinResult.winningPlayer]} Won`;
  };

  return (
    <Container>
      <div className="col-8 col-pull-4">
        <Panel>
          <PanelHeading>{renderTitle()}</PanelHeading>
          <Board
            newGame={game.getMoves.length === 0}
            isFinished={game.getWinResult.isFinished}
            board={game.getBoard}
            activeInnerBoards={game.getCurrentActiveBoards}
            makeMove={(move) => game.applyMove(move)}
          />
        </Panel>
      </div>
      <div className="col-4 col-push-8">
        <Panel>
          <PanelHeading>Online Game</PanelHeading>
          <PanelBody>TODO: PUT Link</PanelBody>
        </Panel>
        {game.getMoves.length !== 0 && (
          <Panel>
            <PanelHeading>History</PanelHeading>
            <PanelBody>
              <MoveHistoryTable moves={game.getMoves} />
            </PanelBody>
          </Panel>
        )}
      </div>
    </Container>
  );
};

export default observer(OnlineGame);
