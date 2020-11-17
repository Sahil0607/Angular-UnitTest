import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges{
  defaultColor =  'rgb(211, 211, 211)'; // lightgray

  @Input('appHighlight') bgColor: string;

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  ngOnChanges() {
    // if (this.bgColor) {
    //   this.el.nativeElement.style.backgroundColor = this.bgColor;
    // } else {
    //   this.el.nativeElement.style.backgroundColor = this.defaultColor;
    // }
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}
