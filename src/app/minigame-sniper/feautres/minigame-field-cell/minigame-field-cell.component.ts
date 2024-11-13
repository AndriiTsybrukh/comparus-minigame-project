import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CellStatus, FieldCell } from '../../models/field.model';

@Component({
  selector: 'cmp-minigame-field-cell',
  standalone: true,
  imports: [],
  templateUrl: './minigame-field-cell.component.html',
  styleUrl: './minigame-field-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinigameFieldCellComponent {
  public readonly cell: InputSignal<FieldCell> = input.required<FieldCell>();
  public readonly active: InputSignal<boolean> = input<boolean>(false);
  public readonly cellClick: OutputEmitterRef<void> = output<void>();

  protected readonly CellStatus: typeof CellStatus = CellStatus;
}
