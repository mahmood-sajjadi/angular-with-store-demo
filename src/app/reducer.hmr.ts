import { ActionReducer, Action, MetaReducer } from '@ngrx/store';
import { PriceState } from './reducer';
import { environment } from '../environments/environment'

export const SET_ROOT_STATE = 'SET_ROOT_STATE';

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state: any, action: any) {
      if (action.type === SET_ROOT_STATE) {
        return action.payload;
      }
      return reducer(state, action);
    };
  }
  
let _metaReducers: MetaReducer<any, Action>[] = [];
if (environment.hmr) {
  _metaReducers.push(stateSetter);
}
export const metaReducers = _metaReducers;