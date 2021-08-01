import { useEffect, useState } from 'react';

export const API_KEY = '1e3baa55d15111fb05c9085e59728924';
export const API_BASE_URL = 'https://api.openweathermap.org/';

export const UseFetchHome = () => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			navigator.geolocation.getCurrentPosition(async (position) => {
				try {
					const response = await fetch(
						`${API_BASE_URL}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
					);
					const city = await response.json();
					setIsLoading(false);
					setData(city);
				} catch (err) {
					setIsLoading(false);
					console.log(err);
					return;
				}
			});
		}

		fetchData();
	}, []);

	return { data, isLoading };
};
