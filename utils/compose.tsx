type ProviderArrayType = Array<({ children }: { children: React.ReactNode }) => React.JSX.Element>;

export const composeProviders = (providers: ProviderArrayType) => {
	const CombinedProvider = providers.reduce((Accumulator, CurrentProvider) => {
		const ProviderWrapper: ProviderArrayType[number] = ({ children }) => (
			<Accumulator>
				<CurrentProvider>{children}</CurrentProvider>
			</Accumulator>
		);

		return ProviderWrapper;
	});

	return CombinedProvider;
};
