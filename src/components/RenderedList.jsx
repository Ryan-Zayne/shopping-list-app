import {
	Box,
	Flex,
	Stack,
	chakra,
	IconButton,
	Button,
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';

function RenderedList({
	setIsDelete,
	isDelete,
	setIsEdit,
	setTodoProduct,
	setTodoPrice,
	todoList,
	setTodoList,
	setEditID,
	setCheckedState,
	checkedState,
	setCheckedID,
	checkedID,
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	const editHandler = (id) => {
		setIsEdit(true);
		setEditID(id);
		setTodoProduct(todoList[id].product);
		setTodoPrice(todoList[id].price);
	};

	const deleteStateHandler = () => {
		setIsDelete(true);
		onOpen(true);
	};

	const deleteTodoHandler = (id) => {
		if (isDelete) {
			const newTodoList = todoList.filter((objectItem) => todoList.indexOf(objectItem) !== id);
			setTodoList(newTodoList);
		}
	};

	const checkedStateHandler = (id) => {
		const updatedCheckState = checkedState.map((item, index) => (index === id ? !item : item));
		setCheckedState(updatedCheckState);
	};

	const CheckedIDHandler = (id) => {
		setCheckedID((prevIDs) =>
			checkedID.includes(id) ? checkedID.filter((i) => i !== id) : [...prevIDs, id]
		);
	};

	const Listitems = todoList.map((item, index) => {
		return (
			<Flex
				// eslint-disable-next-line react/no-array-index-key
				key={index}
				as={'li'}
				justify={'space-between'}
				p={'1rem'}
				borderBottom={'2px solid blue'}
				gap={'1rem'}
			>
				<Stack direction={'row'} textTransform={'capitalize'}>
					<chakra.input
						type='checkbox'
						mr={'clamp(1.2rem, 2.8vw, 5rem)'}
						checked={checkedState[index]}
						value={item.product}
						id={`checkbox${index}`}
						onChange={() => {
							checkedStateHandler(index);
							CheckedIDHandler(index);
						}}
					/>
					<chakra.label
						textDecoration={checkedState[index] && 'line-through'}
						htmlFor={`checkbox${index}`}
					>
						{item.product}
					</chakra.label>
				</Stack>

				<Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
					<chakra.span fontStyle={'italic'} textDecoration={checkedState[index] && 'line-through'}>
						${item.price}
					</chakra.span>
					<IconButton
						onClick={() => editHandler(index)}
						className='edit-button'
						size={'sm'}
						colorScheme={'teal'}
						icon={<TbEdit />}
						variant={'outline'}
						fontSize={'initial'}
					/>
					{isOpen && (
						<AlertDialog
							isOpen={isOpen}
							leastDestructiveRef={cancelRef}
							onClose={onClose}
							motionPreset='none'
							isCentered
						>
							<AlertDialogOverlay>
								<AlertDialogContent maxWidth={'24rem'}>
									<AlertDialogHeader
										fontWeight={'bold'}
										fontSize={'1.7rem'}
										textAlign={'center'}
									>
										Delete Shopping Item
									</AlertDialogHeader>

									<AlertDialogBody fontSize={'1.4rem'}>
										{"Are you sure? You can't undo this action afterwards 🚮"}
									</AlertDialogBody>

									<AlertDialogFooter>
										<Button ref={cancelRef} onClick={onClose}>
											Cancel
										</Button>
										<Button
											colorScheme='red'
											onClick={() => {
												deleteTodoHandler(index);
												onClose(true);
											}}
											ml={3}
										>
											Delete
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialogOverlay>
						</AlertDialog>
					)}
					<IconButton
						onClick={deleteStateHandler}
						className='delete-button'
						colorScheme={'red'}
						icon={<TbTrash />}
						size={'sm'}
						fontSize={'initial'}
					/>
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
