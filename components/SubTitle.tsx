type props = {
	children: string | string[];
	className?: string;
};

export default function SubTitle({ children, className }: Readonly<props>) {
	return <h2 className={`${className} text-2xl uppercase`}>{children}</h2>;
}
