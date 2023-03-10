import { useState } from 'react';
import { Box, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';

import Balance from './Balance';
import RenderedList from './RenderedList';
import UserInput from './UserInput';
import ToggleButton from './Togglebutton';

function ShoppingList() {
	const initialTodoList = [
		{ product: "Veldora's Breath", price: 5000 },
		{ product: "Pyromancer's Robe", price: 1500 },
	];
	const [todoProduct, setTodoProduct] = useState('');
	const [todoPrice, setTodoPrice] = useState(0);
	const [checkedState, setCheckedState] = useState([false, false]);
	const [checkedID, setCheckedID] = useState([]);
	const [editID, setEditID] = useState(0);
	const [isEdit, setIsEdit] = useState(false);
	const [todoList, setTodoList] = useState(initialTodoList);

	const bgWrapper = useColorModeValue('white', '#121212');

	return (
		<Flex
			justify={'center'}
			as={'section'}
			className="main-wrapper"
			bgColor={bgWrapper}
			paddingBlock={{ base: '6rem 3rem', md: '6rem 2rem' }}
			position={'relative'}
		>
			<Flex
				align={'center'}
				w={{ base: 'min(100%, 65rem)', md: 'min(100%, 110rem)' }}
				direction={'column'}
				border={'solid 2rem var(--border-color)'}
				borderRadius={'1.4rem'}
			>
				<ToggleButton />
				<Box
					className="heading"
					as={'header'}
					bgColor={'var(--border-color)'}
					w={'100%'}
					paddingBlock={{ base: '0 2rem', md: '1.5rem 3.5rem' }}
					mt={{ md: '-1px' }}
				>
					<Heading as={'h1'} fontSize={'3rem'} color={'hsl(0, 0%, 100%, 0.3)'}>
						Welcome!
					</Heading>
					<Text color={'hsl(0, 0%, 100%, 0.4)'}>You are now watching Chakra-UI in action </Text>
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
						editID={editID}
						setIsEdit={setIsEdit}
						setTodoList={setTodoList}
						setTodoPrice={setTodoPrice}
						setTodoProduct={setTodoProduct}
						setCheckedState={setCheckedState}
					/>
					<Stack
						spacing={'6rem'}
						w={'100%'}
						mt={{ base: '7rem', md: '4rem' }}
						p={{ base: '0 1.6rem', md: '1.6rem' }}
						borderTop={'solid 2.5px #0f43df'}
						borderLeft={{ md: 'solid 2.5px #0f43df' }}
					>
						<RenderedList
							checkedID={checkedID}
							setCheckedID={setCheckedID}
							setCheckedState={setCheckedState}
							checkedState={checkedState}
							todoList={todoList}
							setTodoList={setTodoList}
							setEditID={setEditID}
							setIsEdit={setIsEdit}
							setTodoPrice={setTodoPrice}
							setTodoProduct={setTodoProduct}
						/>
						<Balance todoList={todoList} checkedID={checkedID} />
					</Stack>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ShoppingList;
