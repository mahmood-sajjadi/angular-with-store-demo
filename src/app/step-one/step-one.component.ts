import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { PriceState, AddDiscount, RemoveDiscount } from '../reducer';
import { Subscription, Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent {
  public isDeveloperValue = false;
  public inMeetupValue = false;

  constructor(private store: Store<{ price: PriceState }>) {
  }

  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  isDeveloper(value) {
    this.isDeveloperValue = value;
  }

  inMeetup(value) {
    this.inMeetupValue = value;
  }

  next() {
    var discount = 0;
    if (this.isDeveloperValue && this.inMeetupValue) {
      discount = 12.5;
    } else if (this.isDeveloperValue) {
      discount += 10;
    } else if (this.inMeetupValue) {
      discount += 5;
    }

    if (discount > 0) {
      this.store.dispatch(new AddDiscount(discount));
    }

    this.submit.emit();
  }
}
