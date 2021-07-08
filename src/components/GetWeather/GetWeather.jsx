import { useSelector } from 'react-redux';

export const GetWeather = () => {
	let error = useSelector((state) => state.error);
	const messageError = useSelector((state) => state.messageError);
	const isLoading = useSelector((state) => state.isLoading);
	const data = useSelector((state) => state.cities);

	if (error) return <h2 className='error'>Loading error: {messageError}</h2>;

	if (!data && isLoading) return <h2>Loading...</h2>;
	if (!data) return null;
	if (data) return null;
};
