type Props = {
	children: React.ReactNode;
};

export default function WorksHomeSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="section-separator section-container items-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{children}
		</section>
	);
}
