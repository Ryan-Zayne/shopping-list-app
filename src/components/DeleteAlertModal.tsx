import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import type { ActionObjectType } from '../features/reducer.types';

type DeleteAlertModalProps = {
	isOpen: boolean;
	cancelRef: React.RefObject<HTMLButtonElement>;
	onClose: () => void;
	dispatch: React.Dispatch<ActionObjectType>;
};

const DeleteAlertModal = (props: DeleteAlertModalProps) => {
	const { isOpen, cancelRef, onClose, dispatch } = props;

	const deleteTodoHandler = () => {
		dispatch({ type: 'DELETE_TODO_ITEM' });
		dispatch({ type: 'SET_DELETE_TARGET', deleteTargetID: null });
		onClose();
	};

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			motionPreset="none"
			isCentered={true}
		>
			<AlertDialogOverlay>
				<AlertDialogContent maxWidth={'28rem'}>
					<AlertDialogHeader fontWeight={'bold'} fontSize={'1.7rem'} textAlign={'center'}>
						Delete Shopping Item
					</AlertDialogHeader>

					<AlertDialogBody fontSize={'1.4rem'}>
						{"Are you sure? You can't undo this action afterwards! 🚮"}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose} fontSize={'1.25rem'}>
							Cancel
						</Button>
						<Button colorScheme="red" onClick={deleteTodoHandler} fontSize={'1.25rem'} ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default DeleteAlertModal;
