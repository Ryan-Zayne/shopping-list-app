import { Box, chakra, Flex, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { ActionObjectType, StateObjectType } from '../features/todoReducer';
import DeleteAlertModal from './DeleteAlertModal';

type RenderedListProps = {
	todoList: StateObjectType['todoList'];
	dispatch: React.Dispatch<ActionObjectType>;
};

function RenderedList({ todoList, dispatch }: RenderedListProps) {
	const cancelRef = useRef<HTMLButtonElement>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteRef = useRef(-1);

	const editHandler = (todoItemIndex: number) => {
		dispatch({ type: 'SET_EDIT_STATE', isEditing: true });
		dispatch({ type: 'SET_EDIT_TARGET', todoIndex: todoItemIndex });
		dispatch({
			type: 'EDIT_TODO_INPUTS',
			todoProduct: todoList[todoItemIndex].product,
			todoPrice: String(todoList[todoItemIndex].price),
		});
	};

	const deleteTodoHandler = () => {
		dispatch({ type: 'DELETE_TODO_ITEM', deleteIndex: deleteRef.current });
	};

	const checkedStateHandler = (todoItemIndex: number) => {
		dispatch({ type: 'SET_CHECKED_STATE', todoIndex: todoItemIndex });
	};

	const CheckedIDHandler = (todoItemIndex: number) => {
		dispatch({ type: 'SET_CHECKED_ITEMS', todoIndex: todoItemIndex });
	};

	// NOTE You can also use Children.toArray method auto assigns keys to lists without stable IDs
	const Listitems = todoList.map((todoItem, index: number) => {
		return (
			<Flex
				key={todoItem.id}
				as={'li'}
				justify={'space-between'}
				p={'1rem'}
				borderBottom={'2px solid blue'}
				gap={'1rem'}
			>
				<Stack direction={'row'} textTransform={'capitalize'}>
					<chakra.input
						type="checkbox"
						mr={'clamp(1.2rem, 2.8vw, 5rem)'}
						checked={todoItem.isChecked}
						value={todoItem.product}
						id={`checkbox${index}`}
						onChange={() => {
							checkedStateHandler(index);
							CheckedIDHandler(index);
						}}
					/>
					<chakra.label
						textDecoration={todoItem.isChecked ? 'line-through' : 'none'}
						htmlFor={`checkbox${index}`}
					>
						{todoItem.product}
					</chakra.label>
				</Stack>

				<Stack direction={'row'} spacing={'1.2rem'} alignItems={'center'}>
					<chakra.span
						fontStyle={'italic'}
						textDecoration={todoItem.isChecked ? 'line-through' : 'none'}
					>
						${todoItem.price}
					</chakra.span>

					<IconButton
						onClick={() => editHandler(index)}
						aria-label="edit"
						id="edit-button"
						size={'sm'}
						colorScheme={'teal'}
						icon={<TbEdit />}
						variant={'outline'}
						fontSize={'initial'}
					/>

					<IconButton
						onClick={() => {
							onOpen();
							deleteRef.current = index;
						}}
						aria-label="delete"
						id="delete-button"
						colorScheme={'red'}
						icon={<TbTrash />}
						size={'sm'}
						fontSize={'initial'}
					/>
					<DeleteAlertModal {...{ cancelRef, isOpen, onClose, deleteTodoHandler }} />
				</Stack>
			</Flex>
		);
	});

	return (
		<Box as={'ul'} minH={'21rem'}>
			{Listitems}
		</Box>
	);
}
export default RenderedList;
