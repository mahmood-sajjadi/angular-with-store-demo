import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { NEXT_STEP } from './reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  step: number;
  subscription: Subscription;

  constructor(private store: Store<number>) {
    this.subscription = store.select<number>('step')
      .subscribe(x => this.step = x);
  }

  nextStep() {
    this.store.dispatch({type: NEXT_STEP});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
