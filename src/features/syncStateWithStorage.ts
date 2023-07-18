import { StateObjectType } from './reducer-feature.types';

export const syncStateWithStorage = (stateObject: StateObjectType) => {
	localStorage.setItem('shopping-list-state', JSON.stringify(stateObject));

	return stateObject;
};
