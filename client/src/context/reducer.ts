import produce from 'immer';
import { AppState, StateAction } from '../types/context';
import { GameAction } from '../types/gameDisplay';
import TicTacToeGame from '../utils/gameEngine';

export const initialState: AppState = {
  game: new TicTacToeGame()
};

export const AppReducer = produce((state: AppState, action: StateAction) => {
  switch (action.type) {
    case GameAction.MOVE:
      state.game.applyMove(action.payload);
      break;
    case GameAction.RESTART:
      return initialState;
  }
  return state;
}, initialState);
