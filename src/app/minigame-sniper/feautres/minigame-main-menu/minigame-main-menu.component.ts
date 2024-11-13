import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TypedFormControls } from '../../../shared/models/typed-form-controls.model';
import {
  DEFAULT_GAME_CONFIGURATION,
  GameConfiguration,
} from '../../models/gameplay.model';

@Component({
  selector: 'cmp-minigame-main-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './minigame-main-menu.component.html',
  styleUrl: './minigame-main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinigameMainMenuComponent implements OnInit {
  private readonly gameStateService: GameStateService =
    inject(GameStateService);

  protected readonly configForm: FormGroup<
    TypedFormControls<Pick<GameConfiguration, 'targetDuration' | 'scoreToWin'>>
  > = new FormGroup<
    TypedFormControls<Pick<GameConfiguration, 'targetDuration' | 'scoreToWin'>>
  >({
    targetDuration: new FormControl<number>(
      DEFAULT_GAME_CONFIGURATION.targetDuration,
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(800),
          Validators.max(5000),
        ],
      },
    ),
    scoreToWin: new FormControl<number>(DEFAULT_GAME_CONFIGURATION.scoreToWin, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(100)],
    }),
  });

  public ngOnInit(): void {
    this.configForm.patchValue(this.gameStateService.currentGameConfig);
  }

  public onPlayClick(): void {
    this.gameStateService.startGame({
      ...this.configForm.getRawValue(),
    } as Partial<GameConfiguration>);
  }
}
