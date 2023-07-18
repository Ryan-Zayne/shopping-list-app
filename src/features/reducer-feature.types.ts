// Reducer Types

export type StateObjectType = {
	todoInputs: {
		todoProduct: string;
		// This type is string because event.target.value always returns string
		todoPrice: string;
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
	| { type: 'EDIT_TODO_INPUTS'; todoProduct: string; todoPrice: string }
	| { type: 'SET_EDIT_STATE'; isEditing: boolean }
	| { type: 'SET_EDIT_TARGET'; todoIndex: number }
	| { type: 'SET_CHECKED_STATE'; todoIndex: number }
	| { type: 'SET_CHECKED_ITEMS'; todoIndex: number }
	| { type: 'DELETE_TODO_ITEM'; deleteIndex: number }
	| { type: 'UPDATE_TODO_ITEM' }
	| { type: 'CLEAR_TODO_INPUTS' };
