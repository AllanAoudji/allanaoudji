type props = {
	children: string | string[];
};

export default function Title({ children }: props) {
	return <h1 className="text-3xl uppercase">{children}</h1>;
}
