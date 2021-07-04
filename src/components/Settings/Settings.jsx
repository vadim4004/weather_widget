import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CityPicker } from '../CityPicker/CityPicker';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { deleteCity } from '../../redux/actions';
import { useState } from 'react';

export const Settings = ({ onSearch }) => {
	const cities = useSelector((state) => state.cities);
	const dispatch = useDispatch();
	const [currentData, setCurrentData] = useState(null);
	const [localCities, setLocalCities] = useState(cities);

	const dragStartHandler = (e, data) => {
		setCurrentData(data);
	};

	const dragEndHandler = (e) => {};

	const dragOverHandler = (e) => {
		e.preventDefault();
	};

	const dragDropHandler = (e, data) => {
		e.preventDefault();
		setLocalCities(
			localCities.map((c) => {
				if (c.id === data.index) {
					return { ...c, order: currentData.order };
				}
				if (c.id === currentData.index) {
					return { ...c, order: data.order };
				}
				return c;
			})
		);
	};

	const sortData = (a, b) => {
		if (a.order > b.order) {
			return 1;
		} else return -1;
	};
	// const sortData = (a, b) => a.order > b.order;

	return (
		<div>
			<p className='settings'>Settings</p>
			{cities &&
				cities.sort(sortData).map((data, index) => {
					data.order = index;
					data.index = index;
					// console.log('order:', data.order);
					// console.log('index:', data.index);
					return (
						<div
							key={index}
							className='city-options'
							draggable={true}
							onDragStart={(e) => dragStartHandler(e, data)}
							onDragLeave={(e) => dragEndHandler(e)}
							onDragEnd={(e) => dragEndHandler(e)}
							onDragOver={(e) => dragOverHandler(e)}
							onDrop={(e) => dragDropHandler(e, data)}
						>
							<p>
								<MenuIcon className='dnd-item' />
							</p>
							<p>
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

			<CityPicker onSearch={onSearch} />
		</div>
	);
};
