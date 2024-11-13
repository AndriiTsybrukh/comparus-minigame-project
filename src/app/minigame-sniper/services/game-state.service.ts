import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DEFAULT_GAME_CONFIGURATION,
  GameConfiguration,
  GameState,
} from '../models/gameplay.model';

@Injectable()
export class GameStateService {
  private readonly currentGameStateSubject: BehaviorSubject<GameState> =
    new BehaviorSubject<GameState>(GameState.MainMenu);
  private readonly currentGameConfigSubject: BehaviorSubject<GameConfiguration> =
    new BehaviorSubject<GameConfiguration>(DEFAULT_GAME_CONFIGURATION);

  public readonly currentGameState$: Observable<GameState> =
    this.currentGameStateSubject.asObservable();

  public get currentGameConfig(): GameConfiguration {
    return this.currentGameConfigSubject.value;
  }

  public startGame(gameConfiguration?: Partial<GameConfiguration>): void {
    this.currentGameConfigSubject.next({
      ...this.currentGameConfig,
      ...gameConfiguration,
    });
    this.currentGameStateSubject.next(GameState.Prepare);
  }

  public endGame(): void {
    this.currentGameStateSubject.next(GameState.MainMenu);
  }
}
