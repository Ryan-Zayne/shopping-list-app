import { Flex, Text } from '@chakra-ui/react';
import { StateObjectType } from '../features/reducer-feature.types';

type BalanceProps = {
	todoList: StateObjectType['todoList'];
	checkedItems: StateObjectType['checkedItems'];
};

function Balance({ todoList, checkedItems }: BalanceProps) {
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

export default Balance;
