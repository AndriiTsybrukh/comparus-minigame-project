import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_REF } from '../../../shared/dialog/dialog.model';
import { GameplayService } from '../../services/gameplay.service';
import { map, Observable } from 'rxjs';
import { EndGameStatus, Score } from '../../models/gameplay.model';
import { AsyncPipe } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'cmp-minigame-end-game-dialog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './minigame-end-game-dialog.component.html',
  styleUrl: './minigame-end-game-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinigameEndGameDialogComponent {
  private readonly dialogRef: HTMLDialogElement = inject(DIALOG_REF);
  private readonly gameplayService: GameplayService = inject(GameplayService);
  private readonly gameStateService: GameStateService =
    inject(GameStateService);

  protected readonly endGameMessage$: Observable<string> =
    this.gameplayService.gameEnded$.pipe(
      map((result) =>
        result === EndGameStatus.Win
          ? "Well done, you're the winner!"
          : "Keep trying, you'll succeed!",
      ),
    );

  protected readonly score$: Observable<Score> = this.gameplayService.score$;

  public closeModal(): void {
    this.gameStateService.endGame();
    this.dialogRef.close();
  }
}
