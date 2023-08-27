import { createContext, useContext, useReducer } from 'react';
import type { ActionObjectType, StateObjectType } from '../features/reducer.types';
import { storedInitialState, todoReducer } from '../features/todoReducer';

// Contexts
const InputContext = createContext<StateObjectType['todoInputs']>({} as StateObjectType['todoInputs']);
const TodoListContext = createContext<StateObjectType['todoList']>({} as StateObjectType['todoList']);
const CheckedItemsContext = createContext<StateObjectType['checkedItems']>(
	{} as StateObjectType['checkedItems']
);
const IsEditingContext = createContext<StateObjectType['isEditing']>({} as StateObjectType['isEditing']);
const EditTargetContext = createContext<StateObjectType['editTarget']>(
	{} as StateObjectType['editTarget']
);
const DispatchStateContext = createContext<React.Dispatch<ActionObjectType>>(() => null);

// Provider
export function StateContextProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(todoReducer, storedInitialState);

	return (
		<DispatchStateContext.Provider value={dispatch}>
			<InputContext.Provider value={state.todoInputs}>
				<TodoListContext.Provider value={state.todoList}>
					<CheckedItemsContext.Provider value={state.checkedItems}>
						<IsEditingContext.Provider value={state.isEditing}>
							<EditTargetContext.Provider value={state.editTarget}>
								{children}
							</EditTargetContext.Provider>
						</IsEditingContext.Provider>
					</CheckedItemsContext.Provider>
				</TodoListContext.Provider>
			</InputContext.Provider>
		</DispatchStateContext.Provider>
	);
}

// Hooks
export const useInputContext = () => useContext(InputContext);
export const useTodoListContext = () => useContext(TodoListContext);
export const useIsEditingContext = () => useContext(IsEditingContext);
export const useCheckedItemsContext = () => useContext(CheckedItemsContext);
export const useEditTargetContext = () => useContext(EditTargetContext);
export const useDispatchContext = () => useContext(DispatchStateContext);
