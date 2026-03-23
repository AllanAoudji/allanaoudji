import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function ContactSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary">
			<div className="padding-container">
				<SubTitle className="py-12">Contact</SubTitle>
				{children}
			</div>
		</section>
	);
}
