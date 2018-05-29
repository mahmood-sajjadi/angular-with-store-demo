import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.css']
})
export class YesNoComponent {
  public isYes: boolean = false;

  @Input()
  public set init(value: boolean) {
    this.isYes = value;
  }

  @Output()
  public change:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  onChange(value: boolean) {
    if (value !== this.isYes) {
      this.isYes = value;
      this.change.emit(value);
    }
  }
}
