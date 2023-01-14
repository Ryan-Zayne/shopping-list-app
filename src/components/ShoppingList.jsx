import { Flex, Box, Text, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import Balance from './Balance';
import RenderedList from './RenderedList';
import UserInput from './UserInput';

function ShoppingList() {
	const initialTodoList = [
		{ product: 'HP Blaze 2985', price: '1500' },
		{ product: "Pyromancer's Robe", price: '5000' },
	];

	const [todoProduct, setTodoProduct] = useState('');
	const [todoPrice, setTodoPrice] = useState('');
	const [todoList, setTodoList] = useState(initialTodoList);
	const [currentID, setCurrentID] = useState(0);
	const [isEdit, setIsEdit] = useState(false);
	return (
		<Flex
			className='main-wrapper'
			as={'section'}
			align={'center'}
			maxW={{ base: '65rem', md: 'unset', lg: '115rem' }}
			direction={'column'}
			border={'solid 2rem rgb(17, 24, 40)'}
			borderRadius={'2rem'}
			margin={{ base: '3rem auto', md: '4.3rem auto 2rem' }}
		>
			<Box
				className='heading'
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
				direction={{ base: 'column', md: 'row' }}
				gap={{ md: '3rem', lg: '7rem' }}
				align={'center'}
				borderRadius={'3px'}
				w={'100%'}
				p={{ base: '4rem 0', md: '2rem 3rem 4rem' }}
			>
				<UserInput
					isEdit={isEdit}
					todoProduct={todoProduct}
					todoPrice={todoPrice}
					todoList={todoList}
					currentID={currentID}
					setIsEdit={setIsEdit}
					setTodoList={setTodoList}
					setTodoPrice={setTodoPrice}
					setTodoProduct={setTodoProduct}
				/>
				<Stack
					w={'max(100%, 29rem)'}
					mt={{ base: '7rem', md: '4rem' }}
					p={{ base: '0 1.6rem', md: '1.6rem' }}
					borderTop={'solid 2.5px #0f43df'}
					borderLeft={{ md: 'solid 2.5px #0f43df' }}
				>
					<RenderedList
						todoList={todoList}
						setTodoList={setTodoList}
						setCurrentID={setCurrentID}
						setIsEdit={setIsEdit}
						setTodoPrice={setTodoPrice}
						setTodoProduct={setTodoProduct}
					/>
					<Balance />
				</Stack>
			</Flex>
		</Flex>
	);
}

export default ShoppingList;
