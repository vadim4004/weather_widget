import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CityPicker } from '../CityPicker/CityPicker';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { deleteCity } from '../../redux/actions';

export const Settings = ({ onSearch, data, error, isLoading }) => {
	const cities = useSelector((state) => state.cities);
	const dispatch = useDispatch();

	return (
		<div>
			<p className='settings'>Settings</p>
			{cities &&
				cities?.map((data, index) => {
					return (
						<div key={index} className='city-options' draggable={true}>
							<p>
								<MenuIcon className='dnd-item' />
							</p>
							<p className='city-name'>
								{data?.name}, {data.sys.country}
							</p>
							<p
								className='delete-option'
								onClick={() => dispatch(deleteCity(data))}
							>
								<DeleteOutlineIcon />
							</p>
						</div>
					);
				})}

			<CityPicker
				onSearch={onSearch}
				data={data}
				isLoading={isLoading}
				error={error}
			/>
		</div>
	);
};
