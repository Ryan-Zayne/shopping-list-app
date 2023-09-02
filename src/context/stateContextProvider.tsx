import { createContext, useReducer } from 'react';
import type { ActionObjectType, StateObjectType } from '../features/reducer.types';
import { defaultState, todoReducer } from '../features/todoReducer';
import { useDefinedContext } from '../hooks/useDefinedContext';

// Consumed Contexts
const TodoListContext = createContext<StateObjectType['todoList'] | null>(null);
const IsEditingContext = createContext<StateObjectType['isEditing'] | null>(null);
const DispatchStateContext = createContext<React.Dispatch<ActionObjectType> | null>(null);

const initialStoredState = JSON.parse(
	localStorage.getItem('shopping-list-state') ?? JSON.stringify(defaultState) // fallback to defualt State
) as StateObjectType;

// Provider
export function StateContextProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(todoReducer, initialStoredState);

	return (
		<TodoListContext.Provider value={state.todoList}>
			<IsEditingContext.Provider value={state.isEditing}>
				<DispatchStateContext.Provider value={dispatch}>{children}</DispatchStateContext.Provider>
			</IsEditingContext.Provider>
		</TodoListContext.Provider>
	);
}

// Hooks
export const useTodoListContext = () => useDefinedContext(TodoListContext);
export const useIsEditingContext = () => useDefinedContext(IsEditingContext);
export const useDispatchContext = () => useDefinedContext(DispatchStateContext);
