import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

type InputModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const InputModal = ({ isOpen, onClose }: InputModalProps) => (
	<Modal isOpen={isOpen} onClose={onClose} motionPreset={'none'} isCentered={true}>
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
				<Button colorScheme="red" mr={3} onClick={onClose} fontSize={'1.2rem'} py={'1.35rem'}>
					Close
				</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
);

export default InputModal;
