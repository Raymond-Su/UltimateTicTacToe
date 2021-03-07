import './OnlineGame.scss';

import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import Board from '../../components/Board';
import Container from '../../components/Container';
import InputFormCopy from '../../components/InputFormCopy';
import MoveHistoryTable from '../../components/MoveHistoryTable';
import Panel from '../../components/Panel';
import PanelBody from '../../components/PanelBody';
import PanelHeading from '../../components/PanelHeading';
import { SOCKET_HOST } from '../../constants/socket';
import { useStateValue } from '../../context/AppContext';
import { Move, Player, Winner } from '../../types/game';
import {
  GameSocketClientMessage,
  GameSocketServerMessage
} from '../../types/socket';
import { displayPlayerValue, playerToWinner } from '../../utils/game';

const OnlineGame: FC = () => {
  const game = useStateValue().onlineGameStore;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [role, setRole] = useState<Player>(Player.Spectator);

  const isPlayerTurn =
    role != Player.Spectator && game.getCurrentPlayer === role;

  useEffect(() => {
    const socket = io(SOCKET_HOST, {
      query: { gameId: window.location.pathname.split('/')[2] }
    });
    socket.on(GameSocketServerMessage.SET_PLAYER, (player: Player) => {
      setRole(player);
    });

    socket.on(GameSocketServerMessage.CURRENT_BOARD, (moves: Move[]) =>
      game.applyMoves(moves)
    );
    socket.on(GameSocketServerMessage.MOVE_MADE, (move: Move) =>
      game.applyMove(move)
    );

    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  const renderTitle = () => {
    if (!game.getWinResult.isFinished) {
      if (game.getMoves.length === 0) {
        return 'Click any Square to start';
      }
      let playerTurn = `${displayPlayerValue[game.getCurrentPlayer]}'s Turn`;
      if (role !== Player.Spectator) {
        playerTurn += isPlayerTurn ? ' (Your turn)' : ' (Waiting for opponent)';
      }
      return playerTurn;
    }

    if (game.getWinResult.winningPlayer === Winner.Draw) {
      return 'Draw';
    }

    return playerToWinner(role) === game.getWinResult.winningPlayer
      ? `You Won!`
      : 'You Lost!';
  };
  return (
    <Container>
      <div className="col-8 col-pull-4">
        <Panel>
          <PanelHeading>{renderTitle()}</PanelHeading>
          <Board
            activeGame={isPlayerTurn}
            newGame={game.getMoves.length === 0}
            isFinished={game.getWinResult.isFinished}
            board={game.getBoard}
            activeInnerBoards={game.getCurrentActiveBoards}
            makeMove={(move) =>
              isPlayerTurn &&
              socket?.emit(GameSocketClientMessage.MAKE_MOVE, move)
            }
          />
        </Panel>
      </div>
      <div className="col-4 col-push-8">
        <Panel>
          <PanelHeading>Online Game</PanelHeading>
          <PanelBody>
            <div id="connection-status" className="alert" role="alert"></div>
            <InputFormCopy
              label="Send link to friends"
              text={window.location.toString()}
            />
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

export default observer(OnlineGame);
