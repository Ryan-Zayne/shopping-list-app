import {
	FormControl,
	Input,
	Flex,
	Button,
	Heading,
	Stack,
	chakra,
	Box,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { TbEdit, TbTrash } from 'react-icons/tb';

function Form() {
	const [todoProduct, setTodoProduct] = useState('');
	const [todoPrice, setTodoPrice] = useState('');
	const [todoList, setTodoList] = useState([{ id: 1, product: 'HP Blaze 2985', price: '1500' }]);
	const [isEdit, setIsEdit] = useState(false);

	const productChangeHandler = (event) => {
		const productInput = event.target;
		setTodoProduct(productInput.value);
	};

	const priceChangeHandler = (event) => {
		const priceInput = event.target;
		setTodoPrice(priceInput.value);
	};

	// Generates random ID (hopefully unique)
	const uniqueID = () => {
		return Math.floor(Math.random() * (Date.now() / 10 ** 9.8) + 2);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (todoProduct.length >= 3) {
			setTodoList((previousList) => [
				...previousList,
				{
					id: uniqueID(),
					product: todoProduct,
					price: todoPrice,
				},
			]);

			setTodoProduct('');
			setTodoPrice('');
		} else {
			alert('Shey you dey whyne me ni? Enter a reasonable product osiso!😒');
		}

		if (isEdit) {
			setIsEdit(false);
			const newState = todoList.map((item) => {
				if (item.price === todoPrice || item.product === todoProduct) {
					setTodoList((previousList) => [...previousList]);
				}
				return todoList;
			});
		}
	};

	const editHandler = (id) => {
		setIsEdit(true);
		const [editTargetObject] = todoList.filter((item) => item.id === id);
		const { price, product } = editTargetObject;
		setTodoProduct(product);
		setTodoPrice(price);
	};

	const deleteHandler = () => {};

	const renderedList = todoList.map((item) => {
		const { id, product, price } = item;
		return (
			<Flex
				key={id}
				as={'li'}
				justify={'space-between'}
				p={'1rem'}
				borderBottom={'2px solid blue'}
			>
				<Box textTransform={'capitalize'}>
					<chakra.input type='checkbox' mr={'clamp(1.2rem, 2.8vw, 5rem)'} />
					{product}
				</Box>
				<Stack direction={'row'} spacing={'1rem'}>
					<chakra.span fontStyle={'italic'}>${price}</chakra.span>
					<IconButton
						onClick={() => editHandler(id)}
						className='edit-button'
						size={'sm'}
						colorScheme={'teal'}
						icon={<TbEdit />}
						variant={'outline'}
						fontSize={'initial'}
					/>
					<IconButton
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
		<Flex
			as={'form'}
			direction={{ base: 'column', md: 'row' }}
			gap={{ lg: '7rem' }}
			align={'center'}
			borderRadius={'3px'}
			w={'100%'}
			p={{ base: '2rem 4rem', md: '2rem 3rem 4rem' }}
			onSubmit={submitHandler}
		>
			<Box className='wrapper' px={'1.6rem'} w={{ base: 'min(100%, 37rem)', md: '100%' }}>
				<FormControl
					mt={'2rem'}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					gap={'2rem'}
					padding={'1.5rem 1.6rem 4rem'}
					boxShadow={'var(--shadow)'}
				>
					<Heading fontSize={'2.7rem'} color={'blue.600'} mt={'2.5rem'}>
						Shopping Todo-list
					</Heading>

					<Input
						value={todoProduct}
						onChange={productChangeHandler}
						type='text'
						placeholder={'What do you want to buy?'}
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						paddingBlock={'2.2rem'}
						boxShadow={'var(--shadow)'}
						fontSize={'1.4rem'}
					/>

					<Input
						value={todoPrice}
						onChange={priceChangeHandler}
						type='number'
						paddingBlock={'2.2rem'}
						boxShadow={'var(--shadow)'}
						placeholder='Enter price'
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						fontSize={'1.4rem'}
						fontWeight={'bold'}
					/>

					<Button
						colorScheme={'blue'}
						py={'1.84rem'}
						px={'1.3rem'}
						fontSize={'1.5rem'}
						_active={{ transform: 'scale(0.98)' }}
						alignSelf={'start'}
						type={'submit'}
					>
						{isEdit ? 'Edit Item' : 'Add item'}
					</Button>
				</FormControl>
			</Box>

			<Stack
				w={'max(100%, 29rem)'}
				mt={{ base: '7rem', md: '4rem' }}
				p={{ base: '0 1.6rem', md: '1.6rem' }}
				borderTop={'solid 2.5px #0f43df'}
				borderLeft={{ md: 'solid 2.5px #0f43df' }}
			>
				<Box as={'ul'} minH={'27rem'}>
					{renderedList}
				</Box>

				<Flex
					direction={'row'}
					justify={'space-between'}
					p={'2rem 1rem'}
					w={'100%'}
					bgColor={'blue.600'}
					color={'white'}
					borderRadius={'8px'}
				>
					<Text>Total: ${}</Text>
					<Text>Spent: ${}</Text>
					<Text>Bal: ${}</Text>
				</Flex>
			</Stack>
		</Flex>
	);
}

export default Form;
