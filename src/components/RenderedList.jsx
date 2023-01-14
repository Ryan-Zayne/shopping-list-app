import { Box, Flex, Stack, chakra, IconButton } from '@chakra-ui/react';
import { TbEdit, TbTrash } from 'react-icons/tb';

function RenderedList({
	setIsEdit,
	setTodoProduct,
	setTodoPrice,
	todoList,
	setTodoList,
	setCurrentID,
}) {
	const editHandler = (id) => {
		setIsEdit(true);
		setCurrentID(id);
		setTodoProduct(todoList[id].product);
		setTodoPrice(todoList[id].price);
	};

	const deleteHandler = (id) => {
		const newTodoList = todoList.filter((objectItem) => todoList.indexOf(objectItem) !== id);
		setTodoList(newTodoList);
	};

	const Listitems = todoList.map((item, index) => {
		return (
			<Flex
				key={index}
				as={'li'}
				justify={'space-between'}
				p={'1rem'}
				borderBottom={'2px solid blue'}
			>
				<Box textTransform={'capitalize'}>
					<chakra.input type='checkbox' mr={'clamp(1.2rem, 2.8vw, 5rem)'} />
					{item.product}
				</Box>
				<Stack direction={'row'} spacing={'1rem'}>
					<chakra.span fontStyle={'italic'}>${item.price}</chakra.span>
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
		<Box as={'ul'} minH={'27rem'}>
			{Listitems}
		</Box>
	);
}
export default RenderedList;
