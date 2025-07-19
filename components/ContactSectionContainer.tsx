import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function ContactSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="section-container">
			<SubTitle className="pb-16">Contact</SubTitle>
			{children}
		</section>
	);
}
