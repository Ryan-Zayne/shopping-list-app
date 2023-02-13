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
	useColorModeValue,
} from '@chakra-ui/react';
import { BiDollar } from 'react-icons/bi';
import { TbShoppingCart } from 'react-icons/tb';
import { BsCart4 } from 'react-icons/bs';

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
	const inputIconColor = useColorModeValue('gray.700', 'white');
	const inputBoxShadow = useColorModeValue('var(--shadow)', 'var(--shadow-dark)');
	const borderAppearance = useColorModeValue('none', 'solid 1px #20334b');

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

	const modal = () => (
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

	const updateHandler = (event) => {
		event.preventDefault();
		const updatedList = todoList.map((objectItem) => {
			if (todoList.indexOf(objectItem) === editID) {
				return { ...objectItem, product: todoProduct, price: Number(todoPrice) };
			}
			return objectItem;
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
				boxShadow={inputBoxShadow}
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
					<BsCart4 />
				</Heading>
				<InputGroup>
					<InputLeftElement
						color={inputIconColor}
						pointerEvents='none'
						fontSize='1.2em'
						height={'100%'}
						width={'2.8rem'}
					>
						<TbShoppingCart />
					</InputLeftElement>
					<Input
						border={borderAppearance}
						value={todoProduct}
						onChange={(e) => setTodoProduct(e.target.value)}
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
					<InputLeftElement
						pointerEvents='none'
						fontSize='1.2em'
						height={'100%'}
						color={inputIconColor}
					>
						<BiDollar />
					</InputLeftElement>
					<Input
						border={borderAppearance}
						value={todoPrice}
						onChange={(e) => setTodoPrice(e.target.value)}
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
					colorScheme={'blue-btn'}
					color={'white'}
					py={'1.84rem'}
					px={'1.3rem'}
					fontSize={'1.5rem'}
					_active={{ transform: 'scale(0.98)' }}
					alignSelf={'start'}
					type={'submit'}
				>
					{isEdit ? 'Edit Item' : 'Add Item'}
				</Button>
				{isOpen && modal()}
			</FormControl>
		</Box>
	);
}

export default UserInput;
