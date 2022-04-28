import { API_BASE_URL, API_KEY } from '../api/api';
import * as types from './types';

export const initApp = (cities) => async (dispatch) => {
	dispatch({
		type: types.INIT,
	});
	for await (let value of cities) {
		await dispatch(fetchCity(value.name));
	}
};

export const initHomeCity = (data, isLoading) => async (dispatch) => {
	dispatch(loadingCity);

	// const URL = 'https://geolocation-db.com/json/';
	// const response = await fetch(URL, {
	// 	method: 'GET',
	// });
	// const { city } = await response.json();

	// ^ "get home city" using unreliable api

	const city = await data?.name;
	if (data && !isLoading) {
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
				return dispatch({
					type: types.ADD_HOME_CITY,
					payload: data,
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch(errorFetch(error));
			});
	}
};

const addCity = (city) => (dispatch, getState) => {
	dispatch(loadingCity);
	const arr = getState().cities;
	if (arr.some((c) => c.id === city.id)) {
		dispatch(
			errorFetch({ message: `city '${city.name}' has already been added` })
		);
	} else {
		const cities = [...arr, city];
		localStorage.removeItem('cities');
		localStorage.setItem('cities', JSON.stringify(cities));
		dispatch({ type: types.ADD_CITY, payload: cities });
	}
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

export const fetchCity = (city) => async (dispatch) => {
	dispatch(loadingCity);
	try {
		const response = await fetch(
			`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
			{ method: 'GET' }
		);
		const data = await response.json();
		if (data.cod >= 400) {
			dispatch(errorFetch(data));
			return;
		}
		return dispatch(addCity(data));
	} catch (error) {
		console.log(error);
		dispatch(errorFetch(error));
	}
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
