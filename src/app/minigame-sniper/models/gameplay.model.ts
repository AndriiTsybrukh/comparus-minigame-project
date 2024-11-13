export enum GameState {
  MainMenu = 'MainMenu',
  Prepare = 'Prepare',
  InProgress = 'InProgress',
  Finished = 'Finished',
}

export enum EndGameStatus {
  Win = 'Win',
  Lose = 'Lose',
}

export interface Score {
  player: number;
  computer: number;
}

export interface GameConfiguration {
  sizeX: number;
  sizeY: number;
  initDelay: number;
  targetDuration: number;
  scoreToWin: number;
}

export const DEFAULT_GAME_CONFIGURATION: GameConfiguration = {
  sizeX: 10,
  sizeY: 10,
  targetDuration: 1000,
  scoreToWin: 10,
  initDelay: 1000,
};
