import { API_BASE_URL, API_KEY } from '../api/api';
// import { fetchApi } from '../api/fetch';
import * as types from './types';

export const addCity = (city) => ({
	type: types.ADD_CITY,
	payload: city,
});

export const deleteCity = (city) => ({
	type: types.DELETE_CITY,
	payload: city,
});

export const fetchAction = (city) => (dispatch) => {
	fetch(
		`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
		{ method: 'GET' }
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.cod >= 400) {
				let someError = new Error(data.message);
				return someError;
			}
			return dispatch(addCity(data));
		})
		.catch((error) => {
			return error;
		});
};

export const sort = (
	droppableIdStart,
	droppableIdEnd,
	droppableIndexStart,
	droppableIndexEnd
) => ({
	type: types.DRAG_CITY,
	payload: {
		droppableIdStart,
		droppableIdEnd,
		droppableIndexStart,
		droppableIndexEnd,
	},
});

export const sortCities =
	(droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd) =>
	(dispatch, getState) => {
		const list = getState()[droppableIdStart];
		console.log(list);
		const city = list.splice(droppableIndexStart, 1);
		list.splice(droppableIndexEnd, 0, ...city);
		dispatch({ type: types.DRAG_CITY, payload: { [droppableIdStart]: list } });
	};
