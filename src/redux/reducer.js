import * as types from './types';

let initialState = {
	cities: [],
	homeCity: null,
	isLoading: false,
	error: false,
	messageError: '',
};

export function weatherReducer(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case types.INIT:
			return initialState;
		case types.ADD_HOME_CITY:
			return {
				...state,
				homeCity: payload,
				isLoading: false,
				error: false,
				messageError: '',
			};

		case types.ADD_CITY:
			return {
				...state,
				cities: [...payload],
				isLoading: false,
				error: false,
				messageError: '',
			};
		case types.DELETE_CITY:
			return {
				...state,
				cities: [...payload],
				error: false,
				messageError: '',
			};
		case types.DRAG_CITY:
			return { ...state, ...payload };
		case types.LOADING:
			return { ...state, isLoading: true, error: false };
		case types.ERROR:
			return {
				...state,
				loading: false,
				error: true,
				messageError: payload.message,
			};

		default:
			return state;
	}
}
