import { Flex, Text } from '@chakra-ui/react';

function Balance() {
	return (
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
	);
}

export default Balance;
