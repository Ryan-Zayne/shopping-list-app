export const assertDefined = <T>(value: T) => {
	if (value == null) {
		throw new Error(`The Value "${value}" is not defined`);
	}

	return value;
};
