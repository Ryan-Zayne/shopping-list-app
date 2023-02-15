import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	chakra,
	Flex,
	IconButton,
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';

function RenderedList({
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
	const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [deleteID, setDeleteID] = useState();

	const editHandler = (id) => {
		setIsEdit(true);
		setEditID(id);
		setTodoProduct(todoList[id].product);
		setTodoPrice(todoList[id].price);
	};

	const deleteTodoHandler = (id) => {
		const newTodoList = todoList.filter((objectItem) => todoList.indexOf(objectItem) !== id);
		setTodoList(newTodoList);
	};

	const deleteStateHandler = (id) => {
		onOpen(true);
		setDeleteID(id);
	};

	const deleteModalAlert = (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			motionPreset="none"
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent maxWidth={'28rem'}>
					<AlertDialogHeader fontWeight={'bold'} fontSize={'1.7rem'} textAlign={'center'}>
						Delete Shopping Item
					</AlertDialogHeader>

					<AlertDialogBody fontSize={'1.4rem'}>
						{"Are you sure? You can't undo this action afterwards 🚮"}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose} fontSize={'1.25rem'}>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								deleteTodoHandler(deleteID);
								onClose(true);
							}}
							fontSize={'1.25rem'}
							ml={3}
						>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);

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
				key={index}
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
						checked={checkedState[index]}
						value={item.product}
						id={`checkbox ${index}`}
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

				<Stack direction={'row'} spacing={'1.2rem'} alignItems={'center'}>
					<chakra.span fontStyle={'italic'} textDecoration={checkedState[index] && 'line-through'}>
						${item.price}
					</chakra.span>

					<IconButton
						onClick={() => editHandler(index)}
						className="edit-button"
						size={'sm'}
						colorScheme={'teal'}
						icon={<TbEdit />}
						variant={'outline'}
						fontSize={'initial'}
					/>

					<IconButton
						onClick={() => deleteStateHandler(index)}
						className="delete-button"
						colorScheme={'red'}
						icon={<TbTrash />}
						size={'sm'}
						fontSize={'initial'}
					/>
					{deleteModalAlert}
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
