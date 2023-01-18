import {
	Box,
	Button,
	FormControl,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { BiDollar } from 'react-icons/bi';
import { TbShoppingCart } from 'react-icons/tb';
import { ImCart } from 'react-icons/im';

function UserInput({
	todoList,
	todoProduct,
	todoPrice,
	setTodoList,
	setTodoPrice,
	setTodoProduct,
	setCheckedState,
	isEdit,
	setIsEdit,
	editID,
}) {
	const { onOpen, isOpen, onClose } = useDisclosure();
	const modal = (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='none' isCentered>
			<ModalOverlay />
			<ModalContent maxWidth={'33.8rem'}>
				<ModalHeader fontWeight={'bold'} fontSize={{ base: '1.5rem', md: '1.47rem' }}>
					Product name less than three characters!😐
				</ModalHeader>

				<ModalBody fontSize={'1.4rem'}>
					<i>
						<strong>Shey you dey whyne me ni?!</strong> Enter a reasonable product name there osiso!
					</i>
					😒
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='red' mr={3} onClick={onClose} fontSize={'1.2rem'} py={'1.35rem'}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

	const productChangeHandler = (event) => {
		const productInput = event.target;
		setTodoProduct(productInput.value);
	};

	const priceChangeHandler = (event) => {
		const priceInput = event.target;
		setTodoPrice(priceInput.value);
	};

	const addTodoHandler = (event) => {
		event.preventDefault();
		if (todoProduct.length >= 3) {
			setTodoList((oldList) => [
				...oldList,
				{
					product: todoProduct,
					price: Number(todoPrice),
				},
			]);
			setCheckedState((oldArr) => [...oldArr, false]);
			setTodoProduct('');
			setTodoPrice('');
		} else {
			onOpen(true);
		}
	};

	const updateHandler = (event) => {
		event.preventDefault();
		const updatedList = todoList.map((item) => {
			if (todoList.indexOf(item) === editID) {
				return { ...item, product: todoProduct, price: Number(todoPrice) };
			}
			return item;
		});

		setTodoList(updatedList);
		setIsEdit(false);
		setTodoProduct('');
		setTodoPrice('');
	};

	return (
		<Box className='form-wrapper' px={'1.6rem'} w={{ base: 'min(100%, 37rem)', md: '100%' }}>
			<FormControl
				as={'form'}
				mt={'2rem'}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				gap={'2rem'}
				padding={'1.5rem 1.6rem 4rem'}
				boxShadow={'var(--shadow)'}
				onSubmit={isEdit ? updateHandler : addTodoHandler}
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
					<ImCart />
				</Heading>
				<InputGroup>
					<InputLeftElement
						color={'gray.700'}
						pointerEvents='none'
						fontSize='1.2em'
						height={'100%'}
						width={'2.8rem'}
					>
						<TbShoppingCart />
					</InputLeftElement>
					<Input
						value={todoProduct}
						onChange={productChangeHandler}
						type='text'
						placeholder={'What do you want to buy?'}
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						paddingBlock={'2.2rem'}
						pl={'2.8rem'}
						boxShadow={'var(--shadow)'}
						fontSize={'1.4rem'}
					/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement pointerEvents='none' fontSize='1.2em' height={'100%'} color={'gray.700'}>
						<BiDollar />
					</InputLeftElement>
					<Input
						value={todoPrice}
						onChange={priceChangeHandler}
						type='number'
						paddingBlock={'2.2rem'}
						boxShadow={'var(--shadow)'}
						placeholder='Enter price'
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						fontSize={'1.4rem'}
						fontWeight={'bold'}
					/>
				</InputGroup>

				<Button
					colorScheme={'blue'}
					py={'1.84rem'}
					px={'1.3rem'}
					fontSize={'1.5rem'}
					_active={{ transform: 'scale(0.98)' }}
					alignSelf={'start'}
					type={'submit'}
				>
					{isEdit ? 'Edit Item' : 'Add Item'}
				</Button>
				{isOpen && modal}
			</FormControl>
		</Box>
	);
}

export default UserInput;
