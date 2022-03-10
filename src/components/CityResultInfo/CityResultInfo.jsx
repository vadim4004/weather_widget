import { useSelector } from 'react-redux';

export const CityResultInfo = () => {
	const { error, isLoading, messageError } = useSelector((state) => state);

	if (error) return <h2 className='error'>Loading error: {messageError}</h2>;
	if (isLoading) return <h2>Loading...</h2>;

	return null;
};
