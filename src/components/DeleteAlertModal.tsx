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
	deleteTargetIndex: number;
	dispatch: React.Dispatch<ActionObjectType>;
};

const DeleteAlertModal = (props: DeleteAlertModalProps) => {
	const { isOpen, cancelRef, onClose, dispatch, deleteTargetIndex } = props;

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
						{"Are you sure? You can't undo this action afterwards 🚮"}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose} fontSize={'1.25rem'}>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								dispatch({ type: 'DELETE_TODO_ITEM', deleteTargetIndex });
								onClose();
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
};

export default DeleteAlertModal;
