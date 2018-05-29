import { ActionReducer, Action } from '@ngrx/store';

export enum PriceActionTypes {
	ADD_DISCOUNT = 'ADD_DISCOUNT',
	REMOVE_DISCOUNT = 'REMOVE_DISCOUNT'
};

export interface PriceState {
	base: number;
    discount: number;
}

export const initialPriceState : PriceState = {
	base: 100,
	discount: 0
}

export class AddDiscount {
	readonly type = PriceActionTypes.ADD_DISCOUNT;

	constructor(public payload: number) {}
}

export class RemoveDiscount {
	readonly type = PriceActionTypes.REMOVE_DISCOUNT;

	constructor(public payload: number) {}
}

export type PriceActions =
	| AddDiscount
	| RemoveDiscount
	;

export function priceReducer(state: PriceState, action: PriceActions) {
	switch (action.type) {
		case PriceActionTypes.ADD_DISCOUNT:
			return {
                ...state,
                discount: state.discount + action.payload
            }

		case PriceActionTypes.REMOVE_DISCOUNT:
			return {
                ...state,
                discount: state.discount - action.payload
            };

		default:
			return state;
	}
}

export const NEXT_STEP = 'NEXT_STEP';

export function stepReducer(state: number, action: Action) {
	switch (action.type) {
		case NEXT_STEP:
			return state + 1;

		default:
			return state;
	}
}