import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNewDirective]'
})
export class NewDirectiveDirective {

  constructor(private el: ElementRef) { }

  // Decorator that declares a DOM event to listen for, and provides a handler method to run when that event occurs.
  @HostListener('click')
  onClick() {
    this.toggleTextCasing();
  }

  private toggleTextCasing() {
    (this.el.nativeElement.style.textTransform === 'uppercase') ?
      this.el.nativeElement.style.textTransform = 'lowercase' :
      this.el.nativeElement.style.textTransform = 'uppercase';
  }
}
