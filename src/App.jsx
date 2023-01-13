import {
	Box,
	Heading,
	Text,
	FormControl,
	Input,
	Flex,
	Button,
	Stack,
	chakra,
	IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import './index.css';

function App() {
	const initialTodoList = [
		{ id: 1, product: 'HP Blaze 2985', price: '1500' },
		{ id: 2, product: "Pyromancer's Robe", price: '5000' },
	];

	const [todoProduct, setTodoProduct] = useState('');
	const [todoPrice, setTodoPrice] = useState('');
	const [todoList, setTodoList] = useState(initialTodoList);
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
		return Math.floor(Math.random() * (Date.now() / 10 ** 9.8) + 3);
	};

	const addTodoHandler = (event) => {
		event.preventDefault();
		if (todoProduct.length >= 3 && isEdit === false) {
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
			// eslint-disable-next-line no-alert
			alert('Shey you dey whyne me ni? Enter a reasonable product osiso!😒');
		}
	};

	const editHandler = (id) => {
		setIsEdit(true);
		const [targetObject] = todoList.filter((object) => object.id === id);
		setTodoProduct(targetObject.product);
		setTodoPrice(targetObject.price);
	};

	const deleteHandler = (id) => {
		const newTodoList = todoList.filter((object) => object.id !== id);
		setTodoList(newTodoList);
	};

	const renderedList = todoList.map((object) => {
		const { id, product, price } = object;
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
						onClick={() => deleteHandler(id)}
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
			as={'section'}
			align={'center'}
			maxW={{ base: '65rem', md: 'unset', lg: '115rem' }}
			direction={'column'}
			border={'solid 2rem rgb(17, 24, 40)'}
			borderRadius={'2rem'}
			margin={{ base: '3rem auto', md: '4.3rem auto 2rem' }}
		>
			<Box
				as={'header'}
				bgColor={'rgb(17, 24, 40)'}
				w={'100%'}
				paddingBlock={{ base: '0 2rem', md: '1.5rem 3.5rem' }}
				transform={'translateY(-1px)'}
			>
				<Heading as={'h1'} fontSize={'3rem'} color={'hsl(0, 0%, 100%, 0.3)'}>
					Welcome!
				</Heading>
				<Text color={'hsl(0, 0%, 100%, 0.4)'}>This is Chakra-ui in action</Text>
			</Box>

			<Flex
				as={'form'}
				direction={{ base: 'column', md: 'row' }}
				gap={{ lg: '7rem' }}
				align={'center'}
				borderRadius={'3px'}
				w={'100%'}
				p={{ base: '2rem 4rem', md: '2rem 3rem 4rem' }}
				onSubmit={addTodoHandler}
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
							{'Add Item'}
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
		</Flex>
	);
}

export default App;
