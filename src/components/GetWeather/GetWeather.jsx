export const GetWeather = ({ data, error, isLoading }) => {
	if (error) return <h2 className='error'>Loading error: {error}</h2>;
	if (!data && isLoading) return <h2>Loading...</h2>;
	if (!data) return null;
	if (data) return null;
};
