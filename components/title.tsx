type props = {
	children: string | string[];
};

export default function Title({ children }: props) {
	return (
		<h1 className="border-b-4 bg-amber-200 px-8 py-5 text-4xl font-bold text-green-600 uppercase">
			{children}
		</h1>
	);
}
