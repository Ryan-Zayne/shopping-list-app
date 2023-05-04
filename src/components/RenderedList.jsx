import { Box, chakra, Flex, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { ACTIONS } from '../utils/actions';
import DeleteAlertModal from './DeleteAlertModal';

function RenderedList({ todoList, dispatch }) {
	const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteRef = useRef(null);

	const editHandler = (todoItemIndex) => {
		dispatch({ type: ACTIONS.SET_EDIT_STATE, payload: true });
		dispatch({ type: ACTIONS.SET_EDIT_TARGET, payload: todoItemIndex });
		dispatch({
			type: ACTIONS.EDIT_TODO_INPUTS,
			payload: [todoList[todoItemIndex].product, todoList[todoItemIndex].price],
		});
	};

	const deleteTodoHandler = () => {
		dispatch({ type: ACTIONS.DELETE_TODO_ITEM, payload: deleteRef.current });
	};

	const checkedStateHandler = (todoItemIndex) => {
		dispatch({ type: ACTIONS.SET_CHECKED_STATE, payload: todoItemIndex });
	};

	const CheckedIDHandler = (todoItemIndex) => {
		dispatch({ type: ACTIONS.SET_CHECKED_ITEMS, payload: todoItemIndex });
	};

	// You can also use Children.toArray method auto assigns keys to lists without stable IDs
	const Listitems = todoList.map((todoItem, index) => {
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
						id={`checkbox ${todoItem.isChecked}`}
						onChange={() => {
							checkedStateHandler(index);
							CheckedIDHandler(index);
						}}
					/>
					<chakra.label
						textDecoration={todoItem.isChecked && 'line-through'}
						htmlFor={`checkbox${index}`}
					>
						{todoItem.product}
					</chakra.label>
				</Stack>

				<Stack direction={'row'} spacing={'1.2rem'} alignItems={'center'}>
					<chakra.span fontStyle={'italic'} textDecoration={todoItem.isChecked && 'line-through'}>
						${todoItem.price}
					</chakra.span>

					<IconButton
						onClick={() => editHandler(index)}
						id="edit-button"
						size={'sm'}
						colorScheme={'teal'}
						icon={<TbEdit />}
						variant={'outline'}
						fontSize={'initial'}
					/>

					<IconButton
						onClick={() => {
							onOpen(true);
							deleteRef.current = index;
						}}
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
