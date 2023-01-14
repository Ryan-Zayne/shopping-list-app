import {
	Box,
	Heading,
	FormControl,
	Input,
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';

function UserInput({
	todoList,
	todoProduct,
	todoPrice,
	setTodoList,
	setTodoPrice,
	setTodoProduct,
	isEdit,
	setIsEdit,
	currentID,
}) {
	const { onOpen, isOpen, onClose } = useDisclosure();

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
					price: todoPrice,
				},
			]);
			setTodoProduct('');
			setTodoPrice('');
		} else {
			onOpen(true);
		}
	};

	const modal = (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='none' isCentered>
			<ModalOverlay />
			<ModalContent maxWidth={'29.6rem'}>
				<ModalHeader fontWeight={'bold'}>
					Product name less than three characters!😐
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					Shey you dey whyne me ni? Enter a reasonable product name osiso!😒
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='red' mr={3} onClick={onClose} fontSize={'1.2rem'}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

	const updateHandler = (event) => {
		event.preventDefault();
		const updatedList = todoList.map((item) => {
			if (todoList.indexOf(item) === currentID) {
				return { ...item, product: todoProduct, price: todoPrice };
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
				<Heading fontSize={'2.7rem'} color={'blue.600'} mt={'2.5rem'}>
					Shopping List
				</Heading>

				<Input
					value={todoProduct}
					onChange={productChangeHandler}
					type='text'
					placeholder={'What do you want to buy?'}
					_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
					paddingBlock={'2.2rem'}
					boxShadow={'var(--shadow)'}
					fontSize={'1.4rem'}
				/>

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
