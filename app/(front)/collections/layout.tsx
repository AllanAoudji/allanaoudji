import Filter from "@/components/Filter";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<>
			<Title>boutique</Title>
			<section className="section-container grid grid-cols-5 gap-4">
				<div className="col-span-1">
					<Filter className="pb-4" type="collections" />
					<Filter type="ordering" />
				</div>
				{children}
			</section>
		</>
	);
}
