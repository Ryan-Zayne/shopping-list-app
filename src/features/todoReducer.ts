import { ActionObjectType, StateObjectType } from './reducer-feature.types';
import { syncStateWithStorage } from './syncStateWithStorage';

const defaultState: StateObjectType = {
	todoInputs: { todoProduct: '', todoPrice: '0' },
	todoList: [
		{ id: 0, product: "Veldora's Breath", price: 5000, isChecked: false },
		{ id: 1, product: "Pyromancer's Robe", price: 1500, isChecked: false },
	],
	checkedItems: [],
	isEditing: false,
	editTarget: null,
};

const storedInitialState = JSON.parse(
	localStorage.getItem('shopping-list-state') ?? JSON.stringify(defaultState)
) as StateObjectType;

// Reducer
const todoReducer = (state: StateObjectType, action: ActionObjectType): StateObjectType => {
	switch (action.type) {
		case 'SET_TODO_INPUTS': {
			return {
				...state,
				todoInputs: {
					...state.todoInputs,
					[action.productKey]: action.productValue,
				},
			};
		}

		case 'EDIT_TODO_INPUTS': {
			return {
				...state,
				todoInputs: {
					todoProduct: action.todoProduct,
					todoPrice: action.todoPrice,
				},
			};
		}

		case 'CLEAR_TODO_INPUTS': {
			return syncStateWithStorage({
				...state,
				todoInputs: defaultState.todoInputs,
			});
		}

		case 'ADD_TODO_ITEM': {
			return syncStateWithStorage({
				...state,
				todoList: [
					...state.todoList,
					{
						id: action.id,
						product: state.todoInputs.todoProduct,
						price: Number(state.todoInputs.todoPrice),
						isChecked: false,
					},
				],
			});
		}

		case 'UPDATE_TODO_ITEM': {
			return syncStateWithStorage({
				...state,
				todoList: state.todoList.map((todoItem, index) => {
					if (index === state.editTarget) {
						return {
							...todoItem,
							product: state.todoInputs.todoProduct,
							price: Number(state.todoInputs.todoPrice),
						};
					}
					return todoItem;
				}),
			});
		}

		case 'DELETE_TODO_ITEM': {
			return syncStateWithStorage({
				...state,
				todoList: state.todoList.filter((_, index) => index !== action.deleteIndex),
			});
		}

		case 'SET_CHECKED_STATE': {
			return syncStateWithStorage({
				...state,
				todoList: state.todoList.map((todoItem, index) => {
					if (index === action.todoIndex) {
						return {
							...todoItem,
							isChecked: !todoItem.isChecked,
						};
					}
					return todoItem;
				}),
			});
		}

		case 'SET_CHECKED_ITEMS': {
			return syncStateWithStorage({
				...state,
				checkedItems: state.checkedItems.includes(action.todoIndex)
					? state.checkedItems.filter((checkedItem) => checkedItem !== action.todoIndex)
					: [...state.checkedItems, action.todoIndex],
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
				editTarget: action.todoIndex,
			};
		}

		default: {
			throw new Error(`Action type is not recognized.`);
		}
	}
};

export { defaultState, storedInitialState, todoReducer };
