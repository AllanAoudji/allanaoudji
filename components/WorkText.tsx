type Props = {
	children: string | string[];
	className?: string;
};

export default function WorkText({ children, className }: Readonly<Props>) {
	return (
		<section className={`${className} items-gap grid-default`}>
			<p className="col-span-1 sm:col-span-4 lg:col-span-3">{children}</p>
		</section>
	);
}
