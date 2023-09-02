import { useContext } from 'react';

const useDefinedContext = <T>(Context: React.Context<T>) => {
	const contextValue = useContext(Context);

	if (contextValue === null) {
		throw new Error('You forgot to wrap context consumer with the required provider');
	}

	return contextValue;
};

export { useDefinedContext };
