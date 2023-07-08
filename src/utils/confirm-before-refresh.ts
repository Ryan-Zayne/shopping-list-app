export const confirmBeforeRefresh = (name?: string, value?: string) => {
	const beforeUnloadListener: OnBeforeUnloadEventHandler = (e: BeforeUnloadEvent) => {
		e.preventDefault();

		return (e.returnValue = '');
	};

	if (name === 'todoProduct' && value !== '') {
		window.addEventListener('beforeunload', beforeUnloadListener, { capture: true });
	} else {
		window.removeEventListener('beforeunload', beforeUnloadListener, { capture: true });
	}
};
