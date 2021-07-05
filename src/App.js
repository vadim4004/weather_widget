import React, { useState } from 'react';
import './App.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { Settings } from './components/Settings/Settings';
import { WeatherList } from './components/WeatherList/WeatherList';
import { fetchAction } from './redux/actions';
import { useDispatch } from 'react-redux';

function App() {
	const [isOpen, setIsOpen] = useState(true);
	const [error, setError] = useState(null);
	// const { data, error, setUrl, isLoading } = UseFetch();
	const dispatch = useDispatch();

	const onSearch = (city) => {
		// setUrl(
		// 	`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
		// );
		// console.log(city);

		dispatch(fetchAction(city));
		// .then((er) => setError(er));
	};

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
					<Settings
						onSearch={onSearch}
						// data={data}
						// isLoading={isLoading}
						error={error}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
