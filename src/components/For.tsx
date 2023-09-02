type ForProps<T> = { each: T[]; render: (item: T, index: number) => JSX.Element };

function For<U>({ each, render }: ForProps<U>) {
	const mappedElements = each.map((item, index) => render(item, index));

	return mappedElements;
}

export { For };
