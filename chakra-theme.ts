import { extendTheme } from '@chakra-ui/react';

const breakpoints = { sm: '320px', md: '768px', lg: '1000px', xl: '1240px' };

const colors = {
	'blue-btn': {
		200: '#3182cc',
		300: '#2b6cb0',
		500: '#3182cc',
		600: '#2b6cb0',
	},
};

const config = {
	initialColorMode: 'system',
	useSystemColorMode: true,
	disableTransitionOnChange: true,
};

const theme = extendTheme({ breakpoints, colors, config });

delete theme.styles.globals;

export default theme;
