import React from 'react';
import { useSelector } from 'react-redux';
import { WeatherCard } from '../WeatherCard/WeatherCard';

export const WeatherList = () => {
	let cities = useSelector((state) => state.cities);

	return (
		<div className=''>
			{cities &&
				cities.map((data, index) => {
					return (
						<WeatherCard
							key={index}
							dt={data.dt * 1000}
							feelsLike={data.main.feels_like}
							pressure={data.main.pressure}
							humidity={data.main.humidity}
							icon={data.weather[0].icon}
							temp={data.main.temp}
							name={data.name}
							country={data.sys.country}
							visibility={data.visibility}
							wind={data.wind.speed}
							weather={data.weather[0].description}
						/>
					);
				})}
		</div>
	);
};
