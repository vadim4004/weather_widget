import * as types from './types';

export const addCity = (city) => ({
	type: types.ADD_CITY,
	payload: city,
});

export const deleteCity = (city) => ({
	type: types.DELETE_CITY,
	payload: city,
});
