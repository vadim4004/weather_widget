import React, { useEffect, useState } from 'react';
import './App.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { Settings } from './components/Settings/Settings';
import { WeatherList } from './components/WeatherList/WeatherList';
import { fetchCity, initApp } from './redux/actions';
import { useDispatch } from 'react-redux';

function App() {
	const [isOpen, setIsOpen] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const URL = 'https://geolocation-db.com/json/';
		fetch(URL, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((req) => dispatch(fetchCity(req.city)));
	}, [dispatch]);

	useEffect(() => {
		const arr = localStorage.getItem('cities')
			? localStorage.getItem('cities')
			: '[]';
		dispatch(initApp(JSON.parse(arr)));
	}, [dispatch]);

	return (
		<div className='App'>
			<h1>Weather today</h1>
			{isOpen && (
				<div>
					<div className='gear'>
						<SettingsIcon fontSize='large' onClick={() => setIsOpen(false)} />
					</div>
					<WeatherList />
				</div>
			)}

			{!isOpen && (
				<div>
					<div className='gear'>
						<CloseIcon fontSize='large' onClick={() => setIsOpen(true)} />
					</div>
					<Settings />
				</div>
			)}
		</div>
	);
}

export default App;
