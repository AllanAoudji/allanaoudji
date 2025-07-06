type props = {
	children: string | string[];
};

export default function Title({ children }: props) {
	return (
		<h1 className="border-b-4 bg-emerald-50 px-8 py-5 text-2xl font-bold text-red-400 uppercase">
			{children}
		</h1>
	);
}
