import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MinigameHeaderComponent } from './feautres/minigame-header/minigame-header.component';
import { MinigameGameplayComponent } from './feautres/minigame-gameplay/minigame-gameplay.component';
import { Observable } from 'rxjs';
import { GameState } from './models/gameplay.model';
import { AsyncPipe } from '@angular/common';
import { MinigameMainMenuComponent } from './feautres/minigame-main-menu/minigame-main-menu.component';
import { GameStateService } from './services/game-state.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'cmp-minigame-sniper',
  standalone: true,
  imports: [
    AsyncPipe,
    MinigameHeaderComponent,
    MinigameMainMenuComponent,
    MinigameGameplayComponent,
  ],
  providers: [GameStateService],
  templateUrl: './minigame-sniper.component.html',
  styleUrl: './minigame-sniper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInFadeOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('200ms ease-in', style({ opacity: 1 }))]),
    ]),
  ],
})
export class MinigameSniperComponent {
  public readonly GameState: typeof GameState = GameState;

  private readonly gameStateService: GameStateService =
    inject(GameStateService);

  protected readonly currentGameState$: Observable<GameState> =
    this.gameStateService.currentGameState$;
}
