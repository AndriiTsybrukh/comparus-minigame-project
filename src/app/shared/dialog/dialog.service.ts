import {
  EmbeddedViewRef,
  inject,
  Injectable,
  Renderer2,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DOCUMENT } from '@angular/common';
import { DialogOptions } from './dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly viewContainerRef: ViewContainerRef =
    inject(ViewContainerRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);

  public createDialog<C extends any>(
    component: Type<C>,
    options?: DialogOptions,
  ): void {
    const componentRef = this.viewContainerRef.createComponent<
      DialogComponent<C>
    >(DialogComponent, {
      injector: options?.injector,
    });

    const domElem = (
      componentRef.hostView as EmbeddedViewRef<DialogComponent<C>>
    ).rootNodes[0] as HTMLElement;

    componentRef.instance.innerComponent = component;
    this.renderer.appendChild(this.document.body, domElem);
  }
}
