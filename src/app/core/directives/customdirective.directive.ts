import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCustomdirective]'
})
export class CustomdirectiveDirective {
  constructor(private el: ElementRef) {
    this.el = el;
  }
  ngAfterViewInit() {
    if(this.el.nativeElement.children[2].textContent === 'Completed') {
      this.el.nativeElement.classList.add('completed');
    }
 }

}
