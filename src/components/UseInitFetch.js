import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_BASE_URL, API_KEY } from '../api/api';

export const UseInitFetch = () => {
	const dispatch = useDispatch();
	const [fetchApi, setFetchApi] = useState(null);
	const [location, setLocation] = useState(null);
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	// let api = 'https://fcc-weather-api.glitch.me/api/current?';
	navigator.geolocation.getCurrentPosition((position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);

		// api += `lat=${+position.coords.latitude.toFixed()}&lon=${+position.coords.longitude.toFixed()}`;
		// setFetchApi(api);
	});

	useEffect(() => {
		let cancelled = false;
		fetch(
			`${API_BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
			{
				method: 'GET',
			}
		)
			.then((res) => res.json())
			.then((result) => {
				!cancelled && setLocation(result.name);
			});
		return () => (cancelled = true);
	}, [location, latitude, longitude]);
	return { location };
};
