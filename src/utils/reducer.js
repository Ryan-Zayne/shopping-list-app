import { ACTIONS } from './actions';

export const initialState = {
	todoInputs: { todoProduct: '', todoPrice: 0 },
	todoList: [
		{ id: 0, product: "Veldora's Breath", price: 5000, isChecked: false },
		{ id: 1, product: "Pyromancer's Robe", price: 1500, isChecked: false },
	],
	checkedItems: [],
	isEdit: false,
	editTarget: 0,
};

export function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.SET_TODO_INPUTS: {
			return {
				...state,
				todoInputs: { ...state.todoInputs, [action.payload.name]: action.payload.value },
			};
		}

		case ACTIONS.EDIT_TODO_INPUTS: {
			return {
				...state,
				todoInputs: {
					...state.todoInputs,
					todoProduct: action.payload[0],
					todoPrice: action.payload[1],
				},
			};
		}

		case ACTIONS.CLEAR_TODO_INPUTS: {
			return {
				...state,
				todoInputs: { ...state.todoInputs, todoProduct: '', todoPrice: '' },
			};
		}

		case ACTIONS.ADD_TODO_ITEM: {
			return {
				...state,
				todoList: [
					...state.todoList,
					{
						id: action.payload.todoItemId,
						product: state.todoInputs.todoProduct,
						price: Number(state.todoInputs.todoPrice),
						isChecked: false,
					},
				],
			};
		}

		case ACTIONS.UPDATE_TODO_ITEM: {
			return {
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
			};
		}

		case ACTIONS.DELETE_TODO_ITEM: {
			return {
				...state,
				todoList: state.todoList.filter((_, index) => index !== action.payload.id),
			};
		}

		case ACTIONS.SET_CHECKED_STATE: {
			return {
				...state,
				todoList: state.todoList.map((todoItem, index) => {
					if (index === action.payload.id) {
						return {
							...todoItem,
							isChecked: !todoItem.isChecked,
						};
					}
					return todoItem;
				}),
			};
		}

		case ACTIONS.SET_CHECKED_ITEMS: {
			return {
				...state,
				checkedItems: state.checkedItems.includes(action.payload.id)
					? state.checkedItems.filter((checkedItem) => checkedItem !== action.payload.id)
					: [...state.checkedItems, action.payload.id],
			};
		}

		case ACTIONS.SET_EDIT_STATE: {
			return {
				...state,
				isEdit: action.payload,
			};
		}

		case ACTIONS.SET_EDIT_TARGET: {
			return {
				...state,
				editTarget: action.payload.id,
			};
		}

		default: {
			throw new Error(`Action type "${action.type}" is not recognized.`);
		}
	}
}
