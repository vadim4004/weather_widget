import React, { useState } from 'react';
import './App.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { Settings } from './components/Settings/Settings';
import { API_BASE_URL, API_KEY } from './api/api';
import { UseFetch } from './hooks/UseFetch';
import { GetWeather } from './components/GetWeather/GetWeather';

function App() {
	const [isOpen, setIsOpen] = useState(true);
	const { data, error, setUrl, isLoading } = UseFetch();

	const onSearch = (city) => {
		setUrl(
			`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
		);
	};

	return (
		<div className='App'>
			<h1>Weather today</h1>
			{isOpen && (
				<div>
					<div className='gear'>
						<SettingsIcon fontSize='large' onClick={() => setIsOpen(false)} />
					</div>
					<GetWeather
						data={data}
						isLoading={isLoading}
						error={error}
						setUrl={setUrl}
					/>
				</div>
			)}

			{!isOpen && (
				<div>
					<div className='gear'>
						<CloseIcon fontSize='large' onClick={() => setIsOpen(true)} />
					</div>
					<Settings onSearch={onSearch} />
				</div>
			)}
		</div>
	);
}

export default App;
