import {
	Box,
	Button,
	FormControl,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { memo, useEffect, useRef } from 'react';
import { BiDollar } from 'react-icons/bi';
import { BsCart4 } from 'react-icons/bs';
import { TbShoppingCart } from 'react-icons/tb';
import {
	useDispatchContext,
	useInputContext,
	useIsEditingContext,
	useTodoListContext,
} from '../context/stateContextProvider';
import InputModal from './InputModal';

function UserInput() {
	const todoInputs = useInputContext();
	const todoList = useTodoListContext();
	const isEditing = useIsEditingContext();
	const dispatch = useDispatchContext();

	const idRef = useRef(todoList.at(-1)?.id ?? 1);

	const inputIconColor = useColorModeValue('gray.700', 'white');
	const inputBoxShadow = useColorModeValue('var(--shadow)', 'var(--shadow-dark)');
	const borderAppearance = useColorModeValue('none', 'solid 1px #20334b');
	const { onOpen, isOpen, onClose } = useDisclosure();

	useEffect(() => {
		const handlebeforeUnload: OnBeforeUnloadEventHandler = (e: BeforeUnloadEvent) => {
			e.preventDefault();

			return (e.returnValue = '');
		};

		if (todoInputs.todoProduct !== '') {
			window.addEventListener('beforeunload', handlebeforeUnload, { capture: true });
		}

		return () => {
			window.removeEventListener('beforeunload', handlebeforeUnload, { capture: true });
		};
	}, [dispatch, isEditing, todoInputs.todoProduct]);

	const todoInputHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;

		dispatch({ type: 'SET_TODO_INPUTS', productKey: name, productValue: value });
	};

	const addTodoHandler: React.FormEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();

		if (todoInputs.todoProduct.length >= 3) {
			dispatch({ type: 'ADD_TODO_ITEM', id: (idRef.current += 1) });
			dispatch({ type: 'CLEAR_TODO_INPUTS' });
		} else {
			onOpen();
		}
	};

	const updateHandler: React.FormEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();

		if (todoInputs.todoProduct !== '') {
			dispatch({ type: 'UPDATE_TODO_ITEM' });
		}

		dispatch({ type: 'SET_EDIT_STATE', isEditing: false });
		dispatch({ type: 'CLEAR_TODO_INPUTS' });
	};

	return (
		<Box className="form-wrapper" px={'1.6rem'} w={{ base: 'min(100%, 37rem)', md: '100%' }}>
			<FormControl
				as={'form'}
				mt={'2rem'}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				gap={'2rem'}
				padding={'1.5rem 1.6rem 4rem'}
				boxShadow={inputBoxShadow}
				onSubmit={isEditing ? updateHandler : addTodoHandler}
			>
				<Heading
					fontSize={'2.7rem'}
					color={'blue.600'}
					mt={'2.5rem'}
					display={'flex'}
					alignItems={'center'}
					gap={'1rem'}
				>
					Shopping List
					<BsCart4 />
				</Heading>
				<InputGroup>
					<InputLeftElement
						color={inputIconColor}
						pointerEvents="none"
						fontSize="1.2em"
						height={'100%'}
						width={'2.8rem'}
					>
						<TbShoppingCart />
					</InputLeftElement>
					<Input
						name={'todoProduct'}
						border={borderAppearance}
						value={todoInputs.todoProduct}
						onChange={todoInputHandler}
						type="text"
						placeholder={'What do you want to buy?'}
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						paddingBlock={'2.2rem'}
						pl={'2.8rem'}
						boxShadow={'var(--shadow)'}
						fontSize={'1.4rem'}
					/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						fontSize="1.2em"
						height={'100%'}
						color={inputIconColor}
					>
						<BiDollar />
					</InputLeftElement>
					<Input
						name={'todoPrice'}
						border={borderAppearance}
						value={todoInputs.todoPrice}
						onChange={todoInputHandler}
						type="number"
						paddingBlock={'2.2rem'}
						boxShadow={'var(--shadow)'}
						placeholder="Enter price"
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						fontSize={'1.4rem'}
						fontWeight={'bold'}
					/>
				</InputGroup>

				<Button
					colorScheme={'blue-btn'}
					color={'white'}
					py={'1.84rem'}
					px={'1.3rem'}
					fontSize={'1.5rem'}
					_active={{ transform: 'scale(0.98)' }}
					alignSelf={'start'}
					type={'submit'}
				>
					{isEditing ? 'Edit Item' : 'Add Item'}
				</Button>
				{isOpen && <InputModal {...{ onClose, isOpen }} />}
			</FormControl>
		</Box>
	);
}

export default memo(UserInput);
