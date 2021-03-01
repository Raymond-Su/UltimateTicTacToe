import TicTacToeGame from '../utils/gameEngine';
import { GameAction } from './gameDisplay';

export interface AppState {
  game: TicTacToeGame;
}

export interface StateAction {
  type: GameAction;
  payload?: any;
}
