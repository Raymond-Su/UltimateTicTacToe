import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import Board from '../../components/Board';
import InputFormCopy from '../../components/InputFormCopy';
import MoveHistoryTable from '../../components/MoveHistoryTable';
import {
  StyledContainer,
  StyledPanel,
  StyledPanelBody,
  StyledPanelHeading,
  StyledPanelTitle,
  StyledResizeableLargeColumn,
  StyledResizeableSmallColumn
} from '../../components/StyledComponents';
import { SOCKET_HOST_DEV } from '../../constants/socket';
import { useStateValue } from '../../context/AppContext';
import { Move, Player, Winner } from '../../types/game';
import {
  GameSocketClientMessage,
  GameSocketServerMessage
} from '../../types/socket';
import { displayPlayerValue, playerToWinner } from '../../utils/gameUtils';

const OnlineGame: FC = () => {
  const game = useStateValue().onlineGameStore;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [role, setRole] = useState<Player>(Player.Spectator);

  const isPlayerTurn =
    role != Player.Spectator && game.getCurrentPlayer === role;

  useEffect(() => {
    const socketParams = { gameId: window.location.pathname.split('/')[2] };
    const socket =
      process.env.NODE_ENV === 'development'
        ? io(SOCKET_HOST_DEV, { query: socketParams })
        : io({ query: socketParams });
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
      if (game.getMoves.length === 0 && game.getCurrentPlayer === role) {
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
    <StyledContainer>
      <StyledResizeableLargeColumn>
        <StyledPanel>
          <StyledPanelHeading>
            <StyledPanelTitle>{renderTitle()}</StyledPanelTitle>
          </StyledPanelHeading>
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
        </StyledPanel>
      </StyledResizeableLargeColumn>
      <StyledResizeableSmallColumn>
        <StyledPanel>
          <StyledPanelHeading>
            <StyledPanelTitle>Online Game</StyledPanelTitle>
          </StyledPanelHeading>
          <StyledPanelBody>
            <div id="connection-status" className="alert" role="alert"></div>
            <InputFormCopy
              label="Send link to friends"
              text={window.location.toString()}
            />
          </StyledPanelBody>
        </StyledPanel>
        {game.getMoves.length !== 0 && (
          <StyledPanel>
            <StyledPanelHeading>
              <StyledPanelTitle>History</StyledPanelTitle>
            </StyledPanelHeading>
            <StyledPanelBody>
              <MoveHistoryTable moves={game.getMoves} />
            </StyledPanelBody>
          </StyledPanel>
        )}
      </StyledResizeableSmallColumn>
    </StyledContainer>
  );
};

export default observer(OnlineGame);
