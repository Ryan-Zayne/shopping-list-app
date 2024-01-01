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
	useIsEditModeContext,
	useTodoListContext,
} from '../context/stateContextProvider';
import { useConfirmBeforeExit } from '../hooks/useConfirmBeforeExit';
import InputModal from './InputModal';

function UserInput() {
	const inputIconColor = useColorModeValue('gray.700', 'white');
	const inputBoxShadow = useColorModeValue('var(--shadow)', 'var(--shadow-dark)');
	const borderAppearance = useColorModeValue('none', 'solid 1px #20334b');
	const { onOpen, isOpen, onClose } = useDisclosure();

	const todoList = useTodoListContext();
	const isEditMode = useIsEditModeContext();
	const dispatch = useDispatchContext();

	const productInputRef = useRef<HTMLInputElement>(null);
	const priceInputRef = useRef<HTMLInputElement>(null);
	const lastTodoStoreId = todoList.at(-1)?.id ?? 0;

	// Setting input refs to state on mount
	useEffect(() => {
		if (productInputRef.current && priceInputRef.current) {
			dispatch({
				type: 'SET_TODO_INPUT_REFS',
				productInputElement: productInputRef.current,
				priceInputElement: priceInputRef.current,
			});
		}
	}, [dispatch]);

	useConfirmBeforeExit(productInputRef.current);

	const addTodoHandler: React.FormEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();

		if (!productInputRef.current || !priceInputRef.current) return;

		if (productInputRef.current?.value?.length < 3) {
			onOpen();
			return;
		}

		dispatch({
			type: 'ADD_TODO_ITEM',
			id: lastTodoStoreId + 1,
			todoProduct: productInputRef.current.value,
			todoPrice: Number(priceInputRef.current.value),
		});

		dispatch({ type: 'CLEAR_TODO_INPUT_STATE' });
	};

	const updateTodoHandler: React.FormEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();

		if (!productInputRef.current || !priceInputRef.current) return;

		if (productInputRef.current?.value !== '') {
			dispatch({
				type: 'UPDATE_TODO_ITEM',
				todoProduct: productInputRef.current.value,
				todoPrice: Number(priceInputRef.current.value),
			});
		}

		dispatch({ type: 'CLEAR_TODO_INPUT_STATE' });
		dispatch({ type: 'SET_EDIT_STATE', isEditMode: false });
		dispatch({ type: 'SET_EDIT_TARGET', editTargetID: null });
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
				onSubmit={isEditMode ? updateTodoHandler : addTodoHandler}
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
						ref={productInputRef}
						id={'todoProduct'}
						name={'todoProduct'}
						border={borderAppearance}
						type={'text'}
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
						ref={priceInputRef}
						id={'todoPrice'}
						name={'todoPrice'}
						border={borderAppearance}
						type={'number'}
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
					{isEditMode ? 'Edit Item' : 'Add Item'}
				</Button>
				{isOpen && <InputModal {...{ onClose, isOpen }} />}
			</FormControl>
		</Box>
	);
}

export default memo(UserInput);
