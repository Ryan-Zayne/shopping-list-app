import type { StateObjectType } from './reducer.types';

export const syncStateWithStorage = (stateObject: StateObjectType) => {
	const { editTargetIndex, isEditing, todoInputRefs, ...storedStateSlice } = stateObject;

	localStorage.setItem('shopping-list-state', JSON.stringify(storedStateSlice));

	return stateObject;
};
