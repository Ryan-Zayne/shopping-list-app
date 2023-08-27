import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useCheckedItemsContext, useTodoListContext } from '../context/stateContextProvider';

function Balance() {
	const todoList = useTodoListContext();
	const checkedItems = useCheckedItemsContext();

	const handleTotal = () => {
		const totalCalc = todoList.reduce((accumulator, todoItem) => accumulator + todoItem.price, 0);

		return totalCalc;
	};

	const handleSpent = () => {
		const spentCalc = todoList.reduce((accumulator, todoItem, index) => {
			if (checkedItems.includes(index)) {
				return accumulator + todoItem.price;
			}

			return accumulator;
		}, 0);

		return spentCalc;
	};

	return (
		<Flex
			direction={'row'}
			justify={'space-between'}
			p={'2rem 1rem'}
			w={'100%'}
			bgColor={'blue.600'}
			color={'white'}
			borderRadius={'8px'}
			gap={'1.5rem'}
		>
			<Text textAlign={'center'}>Total: ${handleTotal()}</Text>
			<Text textAlign={'center'}>Spent: ${handleSpent()}</Text>
			<Text textAlign={'center'}>Bal: ${handleTotal() - handleSpent()}</Text>
		</Flex>
	);
}

export default memo(Balance);
