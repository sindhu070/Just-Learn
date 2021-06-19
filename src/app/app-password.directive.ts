// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[appAppPassword]'
// })
// export class AppPasswordDirective {

//   constructor() { }

// }
import { Directive, ElementRef} from '@angular/core';
@Directive({
  selector: '[appAppPassword]'
})
export class AppPasswordDirective {
 private _shown = false;
constructor(private el: ElementRef) {
    this.setup();
  }
toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = `Show`;
    }
  }
setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML =  `Show`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}