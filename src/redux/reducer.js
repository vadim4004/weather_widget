import * as types from './types';

let initialState = {
	cities: [],
	isLoading: false,
	error: false,
	messageError: '',
};

export function weatherReducer(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case types.INIT:
			return {
				...state,
				isLoading: false,
				error: false,
				messageError: '',
			};

		case types.ADD_CITY:
			return {
				...state,
				cities: [...state.cities, payload],
				isLoading: false,
				error: false,
			};
		case types.DELETE_CITY:
			return {
				...state,
				cities: [...state.cities.filter((city) => city !== payload)],
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
