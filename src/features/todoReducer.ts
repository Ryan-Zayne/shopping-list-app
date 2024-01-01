import type { ActionObjectType, StateObjectType } from './reducer.types';
import { syncTodoListWithStorage } from './syncTodoWithStorage';

export const defaultState: StateObjectType = {
	todoInputRefs: {
		productInputElement: null as unknown as HTMLInputElement,
		priceInputElement: null as unknown as HTMLInputElement,
	},
	todoList: [
		{ id: 0, product: "Veldora's Breath", price: 5000, isBought: false },
		{ id: 1, product: "Pyromancer's Robe", price: 1500, isBought: false },
	],
	isEditMode: false,
	editTargetID: null,
	deleteTargetID: null,
};

// Reducer Function
export const todoReducer = (state: StateObjectType, action: ActionObjectType): StateObjectType => {
	switch (action.type) {
		case 'SET_TODO_INPUT_REFS': {
			return {
				...state,
				todoInputRefs: {
					productInputElement: action.productInputElement,
					priceInputElement: action.priceInputElement,
				},
			};
		}

		case 'EDIT_TODO_INPUT_STATE': {
			const { productInputElement, priceInputElement } = state.todoInputRefs;
			const todoItem = state.todoList[action.todoItemIndex];

			productInputElement.value = todoItem.product;
			priceInputElement.value = String(todoItem.price);

			return state;
		}

		case 'CLEAR_TODO_INPUT_STATE': {
			const { productInputElement, priceInputElement } = state.todoInputRefs;

			productInputElement.value = '';
			priceInputElement.value = '0';

			return state;
		}

		case 'ADD_TODO_ITEM': {
			return syncTodoListWithStorage({
				...state,
				todoList: [
					...state.todoList,
					{
						id: action.id,
						product: action.todoProduct,
						price: Number(action.todoPrice),
						isBought: false,
					},
				],
			});
		}

		case 'UPDATE_TODO_ITEM': {
			const { todoList, editTargetID } = state;

			if (editTargetID === null || !todoList[editTargetID]) return state;

			return syncTodoListWithStorage({
				...state,
				todoList: state.todoList.with(editTargetID, {
					...todoList[editTargetID],
					product: action.todoProduct,
					price: action.todoPrice,
				}),
			});
		}

		case 'DELETE_TODO_ITEM': {
			return syncTodoListWithStorage({
				...state,
				todoList: state.todoList.filter((_, index) => index !== state.deleteTargetID),
			});
		}

		case 'SET_CHECKED_TODO_STATE': {
			const { todoList } = state;
			const todoItem = todoList[action.todoItemIndex];

			return syncTodoListWithStorage({
				...state,
				todoList: todoList.with(action.todoItemIndex, {
					...todoItem,
					isBought: !todoItem.isBought,
				}),
			});
		}

		case 'SET_EDIT_STATE': {
			return {
				...state,
				isEditMode: action.isEditMode,
			};
		}

		case 'SET_EDIT_TARGET': {
			return {
				...state,
				editTargetID: action.editTargetID,
			};
		}

		case 'SET_DELETE_TARGET': {
			return {
				...state,
				deleteTargetID: action.deleteTargetID,
			};
		}

		default: {
			throw new Error(`Action type is unhandled: ${(action as ActionObjectType).type}`);
		}
	}
};
