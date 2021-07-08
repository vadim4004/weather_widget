import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CityPicker } from '../CityPicker/CityPicker';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { deleteCity, sortCities } from '../../redux/actions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const Settings = () => {
	const cities = useSelector((state) => state.cities);
	const dispatch = useDispatch();

	const handleDragEnd = (result) => {
		const { destination, source } = result;
		if (!destination) return;
		dispatch(sortCities(source.droppableId, source.index, destination.index));
	};

	return (
		<div>
			<p className='settings'>Settings</p>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId='cities'>
					{(provided) => (
						<div
							className='cities-list'
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{cities &&
								cities?.map((data, index) => {
									return (
										<Draggable
											key={data.id}
											draggableId={String(data.id)}
											index={index}
										>
											{(provided) => (
												<div
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
													className='city-options'
												>
													<div>
														<MenuIcon className='dnd-item' />
													</div>
													<p className='city-name'>
														{data?.name}, {data?.sys?.country}
													</p>
													<p
														className='delete-option'
														onClick={() => dispatch(deleteCity(data))}
													>
														<DeleteOutlineIcon />
													</p>
												</div>
											)}
										</Draggable>
									);
								})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<CityPicker />
		</div>
	);
};
