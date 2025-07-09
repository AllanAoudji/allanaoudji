type props = {
	children: string | string[];
};

export default function Title({ children }: Readonly<props>) {
	return (
		<h1 className="text-primary bg-quaternary text-fluid border-b-4 px-8 py-5 font-bold uppercase">
			{children}
		</h1>
	);
}
