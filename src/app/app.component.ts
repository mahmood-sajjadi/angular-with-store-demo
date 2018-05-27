import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_DISCOUNT, REMOVE_DISCOUNT, PriceState } from './reducer';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'app';
  price: number;
  subscription: Subscription;

  constructor(private store: Store<{price: PriceState}>){
		this.subscription = store.select<PriceState>('price').pipe(
      tap(x => console.log('PRICE: ', x))
    ).subscribe(x => this.price = x.base - x.discount);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  eligibility(state: boolean) {
    if (state) {
      this.store.dispatch({ type: ADD_DISCOUNT });
    } else {
      this.store.dispatch({ type: REMOVE_DISCOUNT });
    }
  }
}
