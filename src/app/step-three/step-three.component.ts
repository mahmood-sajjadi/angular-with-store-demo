import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { PriceState } from '../reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent {
  public price: Observable<PriceState>;
  @Output()
  submit: EventEmitter<void> = new EventEmitter();

  constructor(private store: Store<{ price: PriceState }>) {
    this.price = this.store.select<PriceState>('price')
  }

  next() {
    this.submit.emit();
  }

}
