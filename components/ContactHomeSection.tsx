import ContactContainer from "./ContactContainer";
import SubTitle from "./SubTitle";

export default function ContactHomeSection() {
	return (
		<section className={"vertical-padding odd:text-secondary even:bg-secondary even:text-primary"}>
			<div className="padding-container">
				<SubTitle className="pt-12">Contact</SubTitle>
				<ContactContainer />
			</div>
		</section>
	);
}
