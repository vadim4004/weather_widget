import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Pressure } from '../../assets/img/pressure.svg';
import { ReactComponent as Wind } from '../../assets/img/wind.svg';

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
		<Card className='root-card'>
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

				<div className=''>
					<div className='weather-params-card'>
						<Wind className='params-icon' />
						{wind}m/s
					</div>
					<div className='weather-params-card'>
						<Pressure className='params-icon' />
						{pressure}hPa
					</div>
					<div className='weather-params-card'>Humidity: {humidity}%</div>
					<div className='weather-params-card'>
						Visibility: {visibility / 1000}km
					</div>
				</div>

				<Typography variant='h6' component='h2'>
					<p>{date.toLocaleDateString()}</p>
				</Typography>
			</CardContent>
		</Card>
	);
};
