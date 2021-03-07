import GameStore from './gameStore';

class RootStore {
  gameStore: GameStore;
  onlineGameStore: GameStore;

  constructor() {
    this.gameStore = new GameStore();
    this.onlineGameStore = new GameStore();
  }
}

export default RootStore;
