import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const extensions = {
	breakpoints: {
		sm: '320px',
		md: '768px',
		lg: '1000px',
		xl: '1240px',
	},
};

// Extend the theme
const theme = extendTheme({ ...extensions });

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
