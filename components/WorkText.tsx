type Props = {
	children: string | string[];
	className?: string;
};

export default function WorkText({ children, className }: Readonly<Props>) {
	return (
		<section className={className}>
			<p>{children}</p>
		</section>
	);
}
