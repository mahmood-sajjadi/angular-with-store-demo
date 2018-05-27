import { ActionReducer, Action } from '@ngrx/store';

export const ADD_DISCOUNT = 'ADD_DISCOUNT';
export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';

export interface PriceState {
	base: number
    discount: number;
}

export const initialPriceState : PriceState = {
	base: 100,
	discount: 0
}

export function priceReducer(state: PriceState, action: Action) {
	switch (action.type) {
		case ADD_DISCOUNT:
			return {
                ...state,
                discount: state.discount + 10
            };

		case REMOVE_DISCOUNT:
			return {
                ...state,
                discount: state.discount - 10
            };

		default:
			return state;
	}
}