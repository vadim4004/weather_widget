import { API_BASE_URL, API_KEY } from '../api/api';
import * as types from './types';

export const initApp = (cities) => ({
	type: types.INIT,
	payload: cities,
});

const addCity = (city) => (dispatch, getState) => {
	const arr = getState().cities;
	const cities = [...arr, city];
	localStorage.removeItem('cities');
	localStorage.setItem('cities', JSON.stringify(cities));
	dispatch({ type: types.ADD_CITY, payload: cities });
};

export const deleteCity = (city) => (dispatch, getState) => {
	const arr = getState().cities.filter((c) => c !== city);
	const cities = [...arr];
	localStorage.removeItem('cities');
	localStorage.setItem('cities', JSON.stringify(cities));
	dispatch({
		type: types.DELETE_CITY,
		payload: cities,
	});
};

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
		localStorage.removeItem('cities');
		localStorage.setItem('cities', JSON.stringify(cities));
		dispatch({
			type: types.DRAG_CITY,
			payload: { [droppableIdStart]: cities },
		});
	};
