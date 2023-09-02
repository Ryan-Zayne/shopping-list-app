import { useEffect } from 'react';

const useConfirmBeforeExit = (inputElement: HTMLInputElement | null) => {
	useEffect(() => {
		const handlebeforeUnload: OnBeforeUnloadEventHandler = (e: BeforeUnloadEvent) => {
			e.preventDefault();

			return (e.returnValue = '');
		};

		if (inputElement?.value !== '') {
			window.addEventListener('beforeunload', handlebeforeUnload, { capture: true });
		}

		return () => {
			window.removeEventListener('beforeunload', handlebeforeUnload, { capture: true });
		};
	}, [inputElement?.value]);
};

export { useConfirmBeforeExit };
