import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import Form from './components/Form';
import './index.css';

function App() {
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
			<Form />
		</Flex>
	);
}
export default App;
