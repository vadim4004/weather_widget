import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Button, OutlinedInput } from '@material-ui/core';
import { GetWeather } from '../GetWeather/GetWeather';
import { fetchCity } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const CityPicker = () => {
	const [city, setCity] = useState('');
	const dispatch = useDispatch();

	const onFormSubmit = (e) => {
		e.preventDefault();

		dispatch(fetchCity(city));
		setCity('');
	};

	return (
		<div>
			<div className='city-select'>
				<h4>Add location:</h4>
				<form
					className='city-select-form'
					noValidate
					autoComplete='off'
					onSubmit={onFormSubmit}
				>
					<OutlinedInput
						placeholder='Enter city'
						value={city}
						onChange={(event) => setCity(event.target.value)}
						id='outlined-basic'
						variant='outlined'
						required
					/>
					<Button
						type='button'
						color='primary'
						aria-label='add'
						className='button-add'
						onClick={onFormSubmit}
					>
						<AddIcon />
					</Button>
				</form>
			</div>
			<GetWeather />
		</div>
	);
};
