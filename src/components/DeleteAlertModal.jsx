import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';

const DeleteAlertModal = ({ isOpen, cancelRef, onClose, deleteTodoHandler }) => (
	<AlertDialog
		isOpen={isOpen}
		leastDestructiveRef={cancelRef}
		onClose={onClose}
		motionPreset="none"
		isCentered
	>
		<AlertDialogOverlay>
			<AlertDialogContent maxWidth={'28rem'}>
				<AlertDialogHeader fontWeight={'bold'} fontSize={'1.7rem'} textAlign={'center'}>
					Delete Shopping Item
				</AlertDialogHeader>

				<AlertDialogBody fontSize={'1.4rem'}>
					{"Are you sure? You can't undo this action afterwards 🚮"}
				</AlertDialogBody>

				<AlertDialogFooter>
					<Button ref={cancelRef} onClick={onClose} fontSize={'1.25rem'}>
						Cancel
					</Button>
					<Button
						colorScheme="red"
						onClick={() => {
							deleteTodoHandler();
							onClose(true);
						}}
						fontSize={'1.25rem'}
						ml={3}
					>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialogOverlay>
	</AlertDialog>
);
export default DeleteAlertModal;
