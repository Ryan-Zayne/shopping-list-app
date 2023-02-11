import { useColorMode, Flex, chakra, useColorModeValue } from '@chakra-ui/react';
import { FaSun } from 'react-icons/fa';
import { BsFillMoonStarsFill } from 'react-icons/bs';

function ToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();
	const toggleBtnColor = useColorModeValue('var(--border-color)', 'blue.800');
	return (
		<chakra.div
			position={'absolute'}
			top={'1rem'}
			right={'2rem'}
			bgColor={toggleBtnColor}
			borderRadius={'5rem'}
			onClick={toggleColorMode}
		>
			<Flex
				align={'center'}
				justify={'space-between'}
				position={'relative'}
				gap={'0.6rem'}
				paddingInline={'0.6rem 0.5rem'}
				paddingBlock={'0.3rem'}
				w={'5.4rem'}
				h={'2.8rem'}
			>
				<FaSun color="yellow" fontSize={'1.6rem'} />
				<BsFillMoonStarsFill color="pink" fontSize={'1.4rem'} />

				<chakra.span
					position={'absolute'}
					borderRadius={'50%'}
					w={'2rem'}
					sx={{ aspectRatio: '1' }}
					bgColor={'hsl(0, 0%, 100%)'}
					transform={colorMode === 'dark' && 'translate(2.4rem)'}
					transition={'transform 200ms linear'}
				/>
			</Flex>
		</chakra.div>
	);
}

export default ToggleButton;
