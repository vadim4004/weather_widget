import React from 'react';
import { useSelector } from 'react-redux';
import { WeatherCard } from '../WeatherCard/WeatherCard';

export const WeatherList = () => {
	const cities = useSelector((state) => state.cities);
	const homeCity = useSelector((state) => state.homeCity);

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
			{homeCity && (
				<WeatherCard
					dt={homeCity.dt * 1000}
					feelsLike={homeCity.main.feels_like}
					pressure={homeCity.main.pressure}
					humidity={homeCity.main.humidity}
					icon={homeCity.weather[0].icon}
					temp={homeCity.main.temp}
					name={homeCity.name}
					country={homeCity.sys.country}
					visibility={homeCity.visibility}
					wind={homeCity.wind.speed}
					weather={homeCity.weather[0].description}
				/>
			)}
		</div>
	);
};
