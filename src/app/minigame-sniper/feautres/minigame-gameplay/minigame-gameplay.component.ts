import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { GameplayService } from '../../services/gameplay.service';
import { CellId, FieldCell } from '../../models/field.model';
import { MinigameFieldCellComponent } from '../minigame-field-cell/minigame-field-cell.component';
import { GameStateService } from '../../services/game-state.service';
import { GameConfiguration, Score } from '../../models/gameplay.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MinigameEndGameDialogComponent } from '../minigame-end-game-dialog/minigame-end-game-dialog.component';

@UntilDestroy()
@Component({
  selector: 'cmp-minigame-gameplay',
  standalone: true,
  imports: [CommonModule, MinigameFieldCellComponent],
  providers: [GameplayService, DialogService],
  templateUrl: './minigame-gameplay.component.html',
  styleUrl: './minigame-gameplay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinigameGameplayComponent implements OnInit {
  private readonly gameplayService: GameplayService =
    inject<GameplayService>(GameplayService);
  private readonly gameStateService: GameStateService =
    inject<GameStateService>(GameStateService);
  private readonly dialogService: DialogService =
    inject<DialogService>(DialogService);
  private readonly injector: Injector = inject<Injector>(Injector);

  protected readonly config: GameConfiguration =
    this.gameStateService.currentGameConfig;
  protected readonly fieldCells$: Observable<FieldCell[]> =
    this.gameplayService.fieldCells$;
  protected readonly activeCellId$: Observable<CellId | null> =
    this.gameplayService.activeCellId$;
  protected readonly score$: Observable<Score> = this.gameplayService.score$;

  protected get columnSize(): number {
    return this.config.sizeX;
  }

  protected get rowSize(): number {
    return this.config.sizeY;
  }

  public ngOnInit(): void {
    this.gameplayService.generateField(this.config);
    this.gameplayService.setScoreToWin(this.config.scoreToWin);
    this.gameplayService
      .startGameplayTimer(this.config)
      .pipe(untilDestroyed(this))
      .subscribe();

    this.gameplayService.gameEnded$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.showResultDialog());
  }

  public makeShot(cellId: CellId): void {
    this.gameplayService.setShottedCellId(cellId);
  }

  public showResultDialog(): void {
    this.dialogService.createDialog<MinigameEndGameDialogComponent>(
      MinigameEndGameDialogComponent,
      {
        injector: this.injector,
      },
    );
  }
}
