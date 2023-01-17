import { Box, Flex, Stack, chakra, IconButton } from '@chakra-ui/react';
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
	const editHandler = (id) => {
		setIsEdit(true);
		setEditID(id);
		setTodoProduct(todoList[id].product);
		setTodoPrice(todoList[id].price);
	};

	const deleteHandler = (id) => {
		const newTodoList = todoList.filter((objectItem) => todoList.indexOf(objectItem) !== id);
		setTodoList(newTodoList);
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
			>
				<Box textTransform={'capitalize'}>
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
				</Box>
				<Stack direction={'row'} spacing={'1rem'}>
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
					<IconButton
						onClick={() => deleteHandler(index)}
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
