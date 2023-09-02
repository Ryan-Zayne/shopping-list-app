// Reducer Types

export type StateObjectType = {
	todoInputRefs: {
		productInputElement: HTMLInputElement;
		priceInputElement: HTMLInputElement;
	};

	todoList: Array<{
		id: number;
		product: string;
		price: number;
		isChecked: boolean;
	}>;

	isEditing: boolean;
	editTargetIndex: number | null;
};

export type ActionObjectType =
	| {
			type: 'SET_TODO_INPUT_REFS';
			productInputElement: HTMLInputElement;
			priceInputElement: HTMLInputElement;
	  }
	| { type: 'EDIT_TODO_INPUT_STATE'; todoItemIndex: number }
	| { type: 'CLEAR_TODO_INPUT_STATE' }
	| { type: 'SET_EDIT_STATE'; isEditing: boolean }
	| { type: 'SET_EDIT_TARGET'; editTargetIndex: number | null }
	| { type: 'SET_CHECKED_TODO_STATE'; todoItemIndex: number }
	| { type: 'ADD_TODO_ITEM'; id: number; todoProduct: string; todoPrice: number }
	| { type: 'DELETE_TODO_ITEM'; deleteTargetIndex: number }
	| { type: 'UPDATE_TODO_ITEM'; todoProduct: string; todoPrice: number };
