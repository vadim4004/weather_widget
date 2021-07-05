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
		case types.DRAG_CITY:
			return { ...state, payload };
		// const {
		// 	droppableIdStart,
		// 	// droppableIdEnd,
		// 	droppableIndexStart,
		// 	droppableIndexEnd,
		// } = payload;

		// const list = state[droppableIdStart];
		// const card = list.splice(droppableIndexStart, 1);
		// list.splice(droppableIndexEnd, 0, ...card);
		// return { ...state, [droppableIdStart]: list };

		default:
			return state;
	}
}
