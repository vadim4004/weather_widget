import React, { useEffect, useState } from 'react';
import './App.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { Settings } from './components/Settings/Settings';
import { WeatherList } from './components/WeatherList/WeatherList';
import { initApp, initHomeCity } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { UseFetchHome } from './api/api';

function App() {
	const [isOpen, setIsOpen] = useState(true);
	const dispatch = useDispatch();
	const cities = useSelector((state) => state.cities);
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
				<div className='wrapper'>
					<div className='gear'>
						<SettingsIcon fontSize='large' onClick={() => setIsOpen(false)} />
					</div>
					{!cities.length && (
						<div className='helper-message'>
							<span>
								You can add whatever city you want by clicking on the
								<i> settings </i>
								icon
							</span>
						</div>
					)}
					<WeatherList isHomeCityLoading={isHomeCityLoading} />
				</div>
			)}

			{!isOpen && (
				<div className='wrapper'>
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
