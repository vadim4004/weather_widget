import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const WeatherCard = ({
	dt,
	feelsLike,
	pressure,
	humidity,
	icon,
	temp,
	name,
	country,
	visibility,
	wind,
	weather,
}) => {
	const date = new Date(dt);

	return (
		<Card className='root'>
			<CardContent>
				<Typography variant='h4' gutterBottom>
					{name},{country}
				</Typography>

				<div className='weather-info'>
					<div className='weather-item weather-icon'>
						<img
							src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
							alt='weather icon'
						/>
					</div>
					<Typography variant='h4' component='p' className='weather-item'>
						{Math.round(temp)}&#176;C
					</Typography>
				</div>

				<Typography className='title' color='textSecondary' gutterBottom>
					Feels like {Math.round(feelsLike)}&#176;C, {weather}.
				</Typography>

				<div className='weather-params-card'>
					<div>{wind}m/s</div>
					<div>{pressure}hPa</div>
					<div>Humidity: {humidity}%</div>
					<div>Visibility: {visibility / 1000}km</div>
				</div>

				<Typography variant='h6' component='h2'>
					<p>{date.toLocaleDateString()}</p>
				</Typography>
			</CardContent>
		</Card>
	);
};
