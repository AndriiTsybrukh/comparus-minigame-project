import { Tagged } from 'type-fest';

export type CellId = Tagged<number, 'id', FieldCell>;

export enum CellStatus {
  Default = 'Default',
  Killed = 'Killed',
  Missed = 'Missed',
}

export interface FieldCell {
  id: CellId;
  status: CellStatus;
}
