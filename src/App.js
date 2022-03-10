import React, { useEffect, useState } from 'react';
import './App.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { Settings } from './components/Settings/Settings';
import { WeatherList } from './components/WeatherList/WeatherList';
import { initApp, initHomeCity } from './redux/actions';
import { useDispatch } from 'react-redux';
import { UseFetchHome } from './api/api';

function App() {
	const [isOpen, setIsOpen] = useState(true);
	const dispatch = useDispatch();
	const { data, isLoading: isHomeCityLoading } = UseFetchHome();

	dispatch(initHomeCity(data, isHomeCityLoading));

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
					<WeatherList isLoading={isHomeCityLoading} />
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
