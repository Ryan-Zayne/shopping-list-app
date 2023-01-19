import { extendTheme } from '@chakra-ui/react';

const extensions = {
	breakpoints: {
		sm: '320px',
		md: '768px',
		lg: '1000px',
		xl: '1240px',
	},

	colors: {
		'blue-btn': {
			200: '#3182cc',
			300: '#2b6cb0',
			500: '#3182cc',
			600: '#2b6cb0',
		},
	},
};

const config = {
	initialColorMode: 'system',
	useSystemColorMode: true,
};

const theme = extendTheme({ ...extensions, config });

export default theme;
