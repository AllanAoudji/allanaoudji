type props = {
	children: string | string[];
	className?: string;
};

export default function Title({ children, className }: Readonly<props>) {
	return <h1 className={`${className} text-quaternary text-3xl font-bold uppercase`}>{children}</h1>;
}
