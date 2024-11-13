import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'cmp-minigame-main-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './minigame-main-menu.component.html',
  styleUrl: './minigame-main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinigameMainMenuComponent {
  private readonly gameStateService: GameStateService =
    inject(GameStateService);

  protected readonly targetDurationControl: FormControl<number> =
    new FormControl<number>(1000, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(200),
        Validators.max(5000),
      ],
    });

  public onPlayClick(): void {
    this.gameStateService.startGame({
      targetDuration: this.targetDurationControl.value,
    });
  }
}
