import { API_BASE_URL, API_KEY } from '../api/api';
import * as types from './types';

export const initApp = () => ({
	type: types.INIT,
});

export const addCity = (city) => ({
	type: types.ADD_CITY,
	payload: city,
});

export const deleteCity = (city) => ({
	type: types.DELETE_CITY,
	payload: city,
});

const loadingCity = () => ({
	type: types.LOADING,
});
const errorFetch = (err) => ({ type: types.ERROR, payload: err });

export const fetchCity = (city) => (dispatch) => {
	dispatch(loadingCity);
	fetch(
		`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
		{ method: 'GET' }
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.cod >= 400) {
				dispatch(errorFetch(data));
				return;
			}
			return dispatch(addCity(data));
		})
		.catch((error) => {
			console.log(error);
			dispatch(errorFetch(error));
		});
};

export const sortCities =
	(droppableIdStart, droppableIndexStart, droppableIndexEnd) =>
	(dispatch, getState) => {
		const cities = getState()[droppableIdStart];
		const city = cities.splice(droppableIndexStart, 1);
		cities.splice(droppableIndexEnd, 0, ...city);
		dispatch({
			type: types.DRAG_CITY,
			payload: { [droppableIdStart]: cities },
		});
	};
