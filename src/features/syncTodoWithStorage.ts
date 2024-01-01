import { syncStateWithStorage } from '../utils/syncStateWithStorage';
import type { StateObjectType } from './reducer.types';

const STORAGE_KEY = 'shopping-list-state';

export const syncTodoListWithStorage = (stateObject: StateObjectType) => {
	syncStateWithStorage(STORAGE_KEY, stateObject, ['todoList']);

	return stateObject;
};
