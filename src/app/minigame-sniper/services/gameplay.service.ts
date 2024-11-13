import { Injectable } from '@angular/core';
import {
  DEFAULT_GAME_CONFIGURATION,
  EndGameStatus,
  GameConfiguration,
  Score,
} from '../models/gameplay.model';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { FieldCell, CellId, CellStatus } from '../models/field.model';
import { ArrayUtil } from '../../utils/array.util';

@Injectable()
export class GameplayService {
  private readonly fieldCellsSubject: BehaviorSubject<FieldCell[]> =
    new BehaviorSubject<FieldCell[]>([]);
  private readonly hittedCellIdSubject: Subject<CellId | null> =
    new Subject<CellId | null>();
  private readonly activeCellIdSubject: BehaviorSubject<CellId | null> =
    new BehaviorSubject<CellId | null>(null);
  private readonly scoreSubject: BehaviorSubject<Score> =
    new BehaviorSubject<Score>({
      player: 0,
      computer: 0,
    });
  private readonly scoreToWin: BehaviorSubject<number> =
    new BehaviorSubject<number>(DEFAULT_GAME_CONFIGURATION.scoreToWin);

  public readonly fieldCells$: Observable<FieldCell[]> =
    this.fieldCellsSubject.asObservable();
  public readonly activeCellId$: Observable<CellId | null> =
    this.activeCellIdSubject.asObservable();
  public readonly score$: Observable<Score> = this.scoreSubject.asObservable();

  public readonly gameEnded$: Observable<EndGameStatus> = this.score$.pipe(
    map((score) => {
      if (score.computer >= this.scoreToWin.value) {
        return EndGameStatus.Lose;
      }

      if (score.player >= this.scoreToWin.value) {
        return EndGameStatus.Win;
      }

      return undefined;
    }),
    filter(Boolean),
  );

  public startGameplayTimer({
    initDelay,
    targetDuration,
  }: GameConfiguration): Observable<void> {
    return timer(initDelay, targetDuration).pipe(
      takeUntil(this.gameEnded$),
      tap(() => this.handlePlayerMissing()),
      tap(() => this.setShottedCellId(null)),
      map(() => this.getRandomCellId()),
      tap((activeId) => this.activeCellIdSubject.next(activeId)),
      switchMap((activeId) =>
        this.hittedCellIdSubject.pipe(
          tap((hittedId) => this.handlePlayerHitting(activeId, hittedId)),
        ),
      ),
      map(() => undefined),
    );
  }

  public generateField({ sizeX, sizeY }: GameConfiguration): void {
    const field = ArrayUtil.generateNumberArray(sizeX * sizeY).map(
      (id) =>
        ({
          id: id as CellId,
          status: CellStatus.Default,
        }) as FieldCell,
    );
    this.fieldCellsSubject.next(field);
  }

  public handlePlayerHitting(
    activeId: CellId | null,
    hittedId: CellId | null,
  ): void {
    if (!hittedId || activeId !== hittedId) {
      return;
    }

    this.activeCellIdSubject.next(null);
    this.increasePlayerScore();
    this.changeCellStatus(hittedId, CellStatus.Killed);
  }

  public handlePlayerMissing(): void {
    const activeCellId = this.activeCellIdSubject.value;
    if (!activeCellId) {
      return;
    }

    this.increaseComputerScore();
    this.changeCellStatus(activeCellId, CellStatus.Missed);
    this.activeCellIdSubject.next(null);
  }

  public setShottedCellId(cellId: CellId | null): void {
    this.hittedCellIdSubject.next(cellId);
  }

  public setScoreToWin(value: number): void {
    this.scoreToWin.next(value);
  }

  private changeCellStatus(cellId: CellId, status: CellStatus): void {
    const cells: FieldCell[] = this.fieldCellsSubject.value;
    this.fieldCellsSubject.next(
      cells.map((cell) => (cell.id === cellId ? { ...cell, status } : cell)),
    );
  }

  private increasePlayerScore(): void {
    const { computer, player } = this.scoreSubject.value;
    this.scoreSubject.next({
      computer,
      player: player + 1,
    });
  }

  private increaseComputerScore(): void {
    const { computer, player } = this.scoreSubject.value;
    this.scoreSubject.next({
      player,
      computer: computer + 1,
    });
  }

  private getRandomCellId(): CellId {
    const cells: CellId[] = this.fieldCellsSubject
      .getValue()
      .reduce(
        (prev: CellId[], current: FieldCell) =>
          current.status !== CellStatus.Default ? prev : [...prev, current.id],
        [],
      );

    return ArrayUtil.getRandomValueFromArray(cells);
  }
}
