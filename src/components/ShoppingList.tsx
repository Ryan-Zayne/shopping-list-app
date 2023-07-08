import { Box, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useReducer } from 'react';
import { defaultState, storedInitialState, todoReducer } from '../features/todoReducer';
import Balance from './Balance';
import RenderedList from './RenderedList';
import ToggleButton from './Togglebutton';
import UserInput from './UserInput';

function ShoppingList() {
	const bgWrapper = useColorModeValue('white', '#121212');

	const [state, dispatch] = useReducer(todoReducer, storedInitialState);

	// Hydrating local storage with defualt state on first time usage of the app
	useEffect(() => {
		const storedStateExistsOnLoad = localStorage.getItem('shopping-list-state') !== null;

		if (!storedStateExistsOnLoad) {
			localStorage.setItem('shopping-list-state', JSON.stringify(defaultState));
		}
	}, []);

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
						todoInputs={state.todoInputs}
						todoList={state.todoList}
						isEditing={state.isEditing}
						dispatch={dispatch}
					/>

					<Stack
						spacing={'6rem'}
						w={'100%'}
						mt={{ base: '7rem', md: '4rem' }}
						p={{ base: '0 1.6rem', md: '1.6rem' }}
						borderTop={'solid 2.5px #0f43df'}
						borderLeft={{ md: 'solid 2.5px #0f43df' }}
					>
						<RenderedList todoList={state.todoList} dispatch={dispatch} />
						<Balance checkedItems={state.checkedItems} todoList={state.todoList} />
					</Stack>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ShoppingList;
