import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appTwoDigitDecimaNumber]'
})
export class TwoDigitDecimaNumberDirective {
  // Allow decimal numbers, no negative values
  private regex: RegExp = new RegExp(/^\d*(\.\d{0,2})?$/g);
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete',
  ];

  constructor(private el: ElementRef) {}

  //capture keys and ctrl-v
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (
      this.specialKeys.indexOf(e.key) !== -1 ||
      (e.key === 'v' && e.ctrlKey === true) ||
      (e.key === 'v' && e.metaKey === true)
    ) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const startPosition = this.el.nativeElement.selectionStart;
    const endPosition = this.el.nativeElement.selectionEnd;
    const next: string = [
      current.slice(0, startPosition),
      e.key == 'Decimal' ? '.' : e.key,
      current.slice(endPosition),
    ].join('');
    if (next && !String(next).match(this.regex)) {
      e.preventDefault();
    }
  }

  //capture right-click paste event
  @HostListener('paste', ['$event']) onPaste(e: ClipboardEvent) {
    return;
  }
}