type props = {
	children: string | string[];
};

export default function Title({ children }: Readonly<props>) {
	return (
		<h1 className="text-primary bg-quaternary border-b-4 px-8 py-5 text-2xl font-bold uppercase">
			{children}
		</h1>
	);
}
