import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { PriceState, AddDiscount, RemoveDiscount } from '../reducer';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent {
  private isLateValue: boolean;
  private isDarkValue: boolean;
  private isCloudyValue: boolean;

  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store<{ price: PriceState }>) {
  }


  isLate(value) {
    this.isLateValue = value;
  }

  isDark(value) {
    this.isDarkValue = value;
  }

  isCloudy(value) {
    this.isCloudyValue = value
  }

  next() {
    let discount = 0;
    if (this.isLateValue) {
      discount += 5;
    } else {
      discount -= 5;
    }
    if (this.isDarkValue) {
      discount += 5;
    }
    if (this.isCloudyValue) {
      discount += 10;
    }
    if (discount > 0) {
      this.store.dispatch(new AddDiscount(discount))
    } else if (discount < 0) {
      this.store.dispatch(new RemoveDiscount(discount))
    }
    this.submit.emit();
  }
}
