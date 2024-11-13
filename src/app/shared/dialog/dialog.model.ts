import { InjectionToken, Injector } from '@angular/core';

export const DIALOG_REF: InjectionToken<HTMLDialogElement> =
  new InjectionToken<HTMLDialogElement>('Dialog Ref');

export interface DialogOptions {
  injector?: Injector;
}
