import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';

import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { priceReducer, initialPriceState, PriceState } from './reducer';
import { metaReducers, SET_ROOT_STATE } from './reducer.hmr';
import { take } from 'rxjs/operators';
import { createNewHosts, createInputTransfer, removeNgStyles } from '@angularclass/hmr';

@NgModule({
  declarations: [
    AppComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      price: priceReducer
    },
    {
      initialState: {
        price: initialPriceState
      },
      metaReducers: metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private appRef: ApplicationRef,
    private store: Store<{ price: PriceState }>
  ) { }

  public hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }
    // restore state
    this.store.dispatch({ type: SET_ROOT_STATE, payload: store.state });
    // restore input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      // this isn't clean but gets the job done in development
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  public hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
    let currentState: { price: PriceState };
    this.store.pipe(
      take(1)
    ).subscribe(state => (currentState = state));
    store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
