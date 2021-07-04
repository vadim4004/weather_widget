import * as types from './types';

let initialState = {
	cities: [],
};

export function weatherReducer(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case types.ADD_CITY:
			return { ...state, cities: [...state.cities, payload] };
		case types.DELETE_CITY:
			return {
				...state,
				cities: [...state.cities.filter((city) => city !== payload)],
			};
		default:
			return state;
	}
}
