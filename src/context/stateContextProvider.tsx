import { createContext, useReducer } from 'react';
import type { ActionObjectType, StateObjectType } from '../features/reducer.types';
import { defaultState, todoReducer } from '../features/todoReducer';
import { useDefinedContext } from '../hooks/useDefinedContext';

// Contexts
const TodoListContext = createContext<StateObjectType['todoList'] | null>(null);
const IsEditingContext = createContext<StateObjectType['isEditing'] | null>(null);
const EditTargetContext = createContext<StateObjectType['editTargetIndex'] | null>(null);
const DispatchStateContext = createContext<React.Dispatch<ActionObjectType> | null>(null);

const initialStoredState = JSON.parse(
	localStorage.getItem('shopping-list-state') ?? JSON.stringify(defaultState) // fallback to defualt State
) as StateObjectType;

// Provider
export function StateContextProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(todoReducer, initialStoredState);

	return (
		<DispatchStateContext.Provider value={dispatch}>
			<TodoListContext.Provider value={state.todoList}>
				<IsEditingContext.Provider value={state.isEditing}>
					<EditTargetContext.Provider value={state.editTargetIndex}>
						{children}
					</EditTargetContext.Provider>
				</IsEditingContext.Provider>
			</TodoListContext.Provider>
		</DispatchStateContext.Provider>
	);
}

// Hooks
export const useTodoListContext = () => useDefinedContext(TodoListContext);
export const useIsEditingContext = () => useDefinedContext(IsEditingContext);
export const useEditTargetContext = () => useDefinedContext(EditTargetContext);
export const useDispatchContext = () => useDefinedContext(DispatchStateContext);
