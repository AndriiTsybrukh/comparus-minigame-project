import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DIALOG_REF } from './dialog.model';

@Component({
  selector: 'cmp-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent<C> implements AfterViewInit {
  @Input() public innerComponent!: Type<C>;

  @ViewChild('dialogRef', { static: true }) public dialogRef!: ElementRef;
  @ViewChild('contentVcr', { read: ViewContainerRef, static: true })
  contentVcr!: ViewContainerRef;

  private readonly injector = inject(Injector);

  public ngAfterViewInit(): void {
    const newInjector = Injector.create({
      providers: [
        { provide: DIALOG_REF, useValue: this.dialogRef.nativeElement },
      ],
      parent: this.injector,
    });

    this.contentVcr?.createComponent(this.innerComponent, {
      injector: newInjector,
    });
    this.dialogRef.nativeElement.showModal();
  }
}
