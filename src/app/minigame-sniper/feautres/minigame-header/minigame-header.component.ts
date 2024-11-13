import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cmp-minigame-header',
  standalone: true,
  templateUrl: './minigame-header.component.html',
  styleUrl: './minigame-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinigameHeaderComponent {}
