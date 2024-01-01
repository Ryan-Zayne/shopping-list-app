import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import Balance from './components/Balance';
import RenderedList from './components/RenderedList';
import ToggleButton from './components/Togglebutton';
import UserInput from './components/UserInput';
import { StateContextProvider } from './context/stateContextProvider';

function App() {
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
					<StateContextProvider>
						<UserInput />

						<RenderedList>
							<Balance />
						</RenderedList>
					</StateContextProvider>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default App;
