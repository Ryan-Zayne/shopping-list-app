import { Flex, Text } from '@chakra-ui/react';

function Balance({ todoList, checkedItems }) {
	const handleTotal = () => {
		const totalCalc = todoList.reduce((accumulator, todo) => accumulator + todo.price, 0);
		return totalCalc;
	};

	const handleSpent = () => {
		const spentCalc = todoList
			.filter((_, index) => checkedItems.includes(index))
			.reduce((accumulator, todo) => accumulator + todo.price, 0);
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
