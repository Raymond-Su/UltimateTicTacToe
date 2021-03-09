import './Game.scss';

import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import Board from '../../components/Board';
import Button from '../../components/Button';
import Container from '../../components/Container';
import MoveHistoryTable from '../../components/MoveHistoryTable';
import Panel from '../../components/Panel';
import PanelBody from '../../components/PanelBody';
import PanelHeading from '../../components/PanelHeading';
import SelectForm from '../../components/SelectForm';
import { useStateValue } from '../../context/AppContext';
import { AIDifficulty, Opponent, Winner } from '../../types/game';
import { displayPlayerValue } from '../../utils/game';

const difficultyList = Object.keys(AIDifficulty).filter(
  (k) => typeof AIDifficulty[k as any] === 'number'
);

const Game: FC = () => {
  const game = useStateValue().gameStore;
  const [gameMode, setGameMode] = useState<string>(Opponent.Player);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [firstTurn, setFirstTurn] = useState<string>(Opponent.Player);
  const [aiDifficulty, setAIifficulty] = useState(AIDifficulty.Easy);

  const renderTitle = () => {
    if (!gameStarted) {
      return 'Game has not started yet ';
    }

    if (!game.getWinResult.isFinished) {
      return game.getMoves.length === 0
        ? 'Click any Square to start'
        : `${displayPlayerValue[game.getCurrentPlayer]}'s Turn`;
    } else {
      return game.getWinResult.winningPlayer === Winner.Draw
        ? 'Draw'
        : `${displayPlayerValue[game.getWinResult.winningPlayer]} Won`;
    }
  };

  const handleNewGameClick = () => {
    if (gameStarted) {
      game.restart();
    } else {
      setGameStarted(true);
    }
  };

  const handleGameModeChange = (value: string) => {
    game.restart();
    setGameStarted(false);
    setGameMode(value);
  };

  return (
    <Container>
      <div className="col-8 col-pull-4">
        <Panel>
          <PanelHeading>{renderTitle()}</PanelHeading>
          <Board
            newGame={game.getMoves.length === 0}
            isFinished={game.getWinResult.isFinished || !gameStarted}
            board={game.getBoard}
            activeInnerBoards={game.getCurrentActiveBoards}
            makeMove={(move) => gameStarted && game.applyMove(move)}
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
              onSelect={handleGameModeChange}
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
            <Button
              id="new-game"
              primary={!gameStarted}
              onClick={handleNewGameClick}
            >
              {!gameStarted ? 'New Game' : 'Restart Game'}
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
