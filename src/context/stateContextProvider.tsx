import { createContext, useReducer } from "react";
import type { ActionObjectType, StateObjectType } from "../features/reducer.types";
import { defaultState, todoReducer } from "../features/todoReducer";
import { useDefinedContext } from "../hooks/useDefinedContext";
import { parseJSON } from "../utils/parseJSON";

// Contexts
const TodoListContext = createContext<StateObjectType["todoList"] | null>(null);
const isEditModeContext = createContext<StateObjectType["isEditMode"] | null>(null);
const DispatchStateContext = createContext<React.Dispatch<ActionObjectType> | null>(null);

const initialStoredState = parseJSON<StateObjectType>(localStorage.getItem("shopping-list-state"));

// Provider
export function StateContextProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(todoReducer, initialStoredState ?? defaultState);

	return (
		<TodoListContext.Provider value={state.todoList}>
			<isEditModeContext.Provider value={state.isEditMode}>
				<DispatchStateContext.Provider value={dispatch}>{children}</DispatchStateContext.Provider>
			</isEditModeContext.Provider>
		</TodoListContext.Provider>
	);
}

// Hooks
export const useTodoListContext = () => useDefinedContext(TodoListContext);
export const useIsEditModeContext = () => useDefinedContext(isEditModeContext);
export const useDispatchContext = () => useDefinedContext(DispatchStateContext);
