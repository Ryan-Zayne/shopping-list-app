import { Box, chakra, Flex, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { useDispatchContext, useTodoListContext } from '../context/stateContextProvider';
import DeleteAlertModal from './DeleteAlertModal';
import { For as TodoListItems } from './For';

function RenderedList({ children: BalanceComponent }: { children: React.ReactNode }) {
	const todoList = useTodoListContext();
	const dispatch = useDispatchContext();

	const cancelRef = useRef<HTMLButtonElement>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const editHandler = (todoItemIndex: number) => {
		dispatch({ type: 'SET_EDIT_STATE', isEditMode: true });
		dispatch({ type: 'SET_EDIT_TARGET', editTargetID: todoItemIndex });
		dispatch({ type: 'EDIT_TODO_INPUT_STATE', todoItemIndex });
	};

	const deleteHandler = (todoItemIndex: number) => {
		dispatch({ type: 'SET_DELETE_TARGET', deleteTargetID: todoItemIndex });
		onOpen();
	};

	const checkedStateHandler = (todoItemIndex: number) => {
		dispatch({ type: 'SET_CHECKED_TODO_STATE', todoItemIndex });
	};

	// NOTE You can also use Children.toArray method auto assigns keys to lists without stable IDs

	return (
		<Stack
			spacing={'6rem'}
			w={'100%'}
			mt={{ base: '7rem', md: '4rem' }}
			p={{ base: '0 1.6rem', md: '1.6rem' }}
			borderTop={'solid 2.5px #0f43df'}
			borderLeft={{ md: 'solid 2.5px #0f43df' }}
		>
			<Box as={'ul'} minH={'21rem'}>
				<TodoListItems
					each={todoList}
					render={(todoItem, index) => (
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
									checked={todoItem.isBought}
									value={todoItem.product}
									id={`checkbox${index}`}
									onChange={() => checkedStateHandler(index)}
								/>
								<chakra.label
									textDecoration={todoItem.isBought ? 'line-through' : 'none'}
									htmlFor={`checkbox${index}`}
								>
									{todoItem.product}
								</chakra.label>
							</Stack>

							<Stack direction={'row'} spacing={'1.2rem'} alignItems={'center'}>
								<chakra.span
									fontStyle={'italic'}
									textDecoration={todoItem.isBought ? 'line-through' : 'none'}
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
									onClick={() => deleteHandler(index)}
									aria-label="delete"
									id="delete-button"
									colorScheme={'red'}
									icon={<TbTrash />}
									size={'sm'}
									fontSize={'initial'}
								/>

								<DeleteAlertModal {...{ cancelRef, isOpen, onClose, dispatch }} />
							</Stack>
						</Flex>
					)}
				/>
			</Box>

			{BalanceComponent}
		</Stack>
	);
}

export default RenderedList;
