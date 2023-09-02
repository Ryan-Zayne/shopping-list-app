import type { StateObjectType } from './reducer.types';

export const syncStateWithStorage = (stateObject: StateObjectType) => {
	const { todoList } = stateObject;

	localStorage.setItem('shopping-list-state', JSON.stringify({ todoList }));

	return stateObject;
};
