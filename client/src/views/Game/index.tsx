import React, { FC, useState } from 'react';
import { AIDifficulty, Opponent, Winner } from '../../types/game';
import { useStateValue } from '../../context/AppContext';
import { displayTileValue } from '../../context/stores/gameStore';
import { observer } from 'mobx-react-lite';

import Board from '../../components/Board';
import PanelHeading from '../../components/PanelHeading';
import SelectForm from '../../components/SelectForm';
import Button from '../../components/Button';
import PanelBody from '../../components/PanelBody';
import Panel from '../../components/Panel';
import MoveHistoryTable from '../../components/MoveHistoryTable';
import Container from '../../components/Container';

import './Game.scss';

const difficultyList = Object.keys(AIDifficulty).filter(
  (k) => typeof AIDifficulty[k as any] === 'number'
);

const Game: FC = () => {
  const game = useStateValue();
  const [gameMode, setGameMode] = useState<string>(Opponent.AI);
  const [firstTurn, setFirstTurn] = useState<string>(Opponent.AI);
  const [aiDifficulty, setAIifficulty] = useState(AIDifficulty.Easy);

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
          <PanelHeading>Local Game</PanelHeading>
          <PanelBody>
            <SelectForm
              id="Opponent"
              labelTitle="Opponent"
              value={gameMode}
              onSelect={(value) => setGameMode(value)}
              options={[
                [Opponent.Player, 'Play with friend'],
                [Opponent.AI, 'Play against computer']
              ]}
            />

            {gameMode === Opponent.AI && (
              <>
                <SelectForm
                  id="first-turn"
                  labelTitle="Who goes first"
                  value={firstTurn}
                  onSelect={(value) => setFirstTurn(value)}
                  options={[
                    [Opponent.Player, 'Player'],
                    [Opponent.AI, 'Computer']
                  ]}
                />
                <SelectForm
                  id="ai-difficulty"
                  labelTitle="Difficulty"
                  value={String(aiDifficulty)}
                  onSelect={(value) => setAIifficulty(parseInt(value))}
                  options={difficultyList.map((difficulty, index) => [
                    String(index),
                    difficulty
                  ])}
                />
              </>
            )}
            <Button id="new-game" primary onClick={() => game.restart()}>
              New Game
            </Button>
          </PanelBody>
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

export default observer(Game);
