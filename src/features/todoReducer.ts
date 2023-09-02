import type { ActionObjectType, StateObjectType } from './reducer.types';
import { syncStateWithStorage } from './syncStateWithStorage';

export const defaultState: StateObjectType = {
	todoInputRefs: {
		productInputElement: null as unknown as HTMLInputElement,
		priceInputElement: null as unknown as HTMLInputElement,
	},
	todoList: [
		{ id: 0, product: "Veldora's Breath", price: 5000, isChecked: false },
		{ id: 1, product: "Pyromancer's Robe", price: 1500, isChecked: false },
	],
	isEditing: false,
	editTargetIndex: null,
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
			return syncStateWithStorage({
				...state,
				todoList: [
					...state.todoList,
					{
						id: action.id,
						product: action.todoProduct,
						price: Number(action.todoPrice),
						isChecked: false,
					},
				],
			});
		}

		case 'UPDATE_TODO_ITEM': {
			const { todoList, editTargetIndex } = state;

			if (editTargetIndex === null || !todoList[editTargetIndex]) return state;

			return syncStateWithStorage({
				...state,
				todoList: state.todoList.with(editTargetIndex, {
					...todoList[editTargetIndex],
					product: action.todoProduct,
					price: action.todoPrice,
				}),
			});
		}

		case 'DELETE_TODO_ITEM': {
			return syncStateWithStorage({
				...state,
				todoList: state.todoList.filter((_, index) => index !== action.deleteTargetIndex),
			});
		}

		case 'SET_CHECKED_TODO_STATE': {
			const { todoList } = state;
			const todoItem = todoList[action.todoItemIndex];

			return syncStateWithStorage({
				...state,
				todoList: todoList.with(action.todoItemIndex, {
					...todoItem,
					isChecked: !todoItem.isChecked,
				}),
			});
		}

		case 'SET_EDIT_STATE': {
			return {
				...state,
				isEditing: action.isEditing,
			};
		}

		case 'SET_EDIT_TARGET': {
			return {
				...state,
				editTargetIndex: action.editTargetIndex,
			};
		}

		default: {
			throw new Error(`Action type is unhandled: ${(action as ActionObjectType).type}`);
		}
	}
};
