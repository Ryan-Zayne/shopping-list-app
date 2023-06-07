export type StateObjectType = {
	todoInputs: {
		todoProduct: string;
		todoPrice: number;
	};

	todoList: Array<{
		id: number;
		product: string;
		price: number;
		isChecked: boolean;
	}>;

	checkedItems: number[];
	isEditing: boolean;
	editTarget: number | null;
};

export type ActionObjectType =
	| { type: 'SET_TODO_INPUTS'; productKey: string; productValue: string }
	| { type: 'ADD_TODO_ITEM'; id: number }
	| { type: 'EDIT_TODO_INPUTS'; todoProduct: string; todoPrice: number }
	| { type: 'SET_EDIT_STATE'; isEditing: boolean }
	| { type: 'SET_EDIT_TARGET'; todoIndex: number }
	| { type: 'SET_CHECKED_STATE'; todoIndex: number }
	| { type: 'SET_CHECKED_ITEMS'; todoIndex: number }
	| { type: 'DELETE_TODO_ITEM'; deleteIndex: number }
	| { type: 'UPDATE_TODO_ITEM' }
	| { type: 'CLEAR_TODO_INPUTS' };

export const initialState: StateObjectType = {
	todoInputs: { todoProduct: '', todoPrice: 0 },
	todoList: [
		{ id: 0, product: "Veldora's Breath", price: 5000, isChecked: false },
		{ id: 1, product: "Pyromancer's Robe", price: 1500, isChecked: false },
	],
	checkedItems: [],
	isEditing: false,
	editTarget: null,
};

export function reducer(state: StateObjectType, action: ActionObjectType) {
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

		case 'ADD_TODO_ITEM': {
			return {
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

		case 'UPDATE_TODO_ITEM': {
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

		case 'CLEAR_TODO_INPUTS': {
			return {
				...state,
				todoInputs: initialState.todoInputs,
			};
		}

		case 'DELETE_TODO_ITEM': {
			return {
				...state,
				todoList: state.todoList.filter((_, index) => index !== action.deleteIndex),
			};
		}

		case 'SET_CHECKED_STATE': {
			return {
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
			};
		}

		case 'SET_CHECKED_ITEMS': {
			return {
				...state,
				checkedItems: state.checkedItems.includes(action.todoIndex)
					? state.checkedItems.filter((checkedItem) => checkedItem !== action.todoIndex)
					: [...state.checkedItems, action.todoIndex],
			};
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
}
