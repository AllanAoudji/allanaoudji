import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
};

export default function InstagramSectionContainer({ children }: Readonly<Props>) {
	return (
		<section className="section-container section-separator">
			<SubTitle>Instagram</SubTitle>
			<a
				className="items-gap mt-5 grid grid-cols-2 lg:grid-cols-4"
				href="https://www.instagram.com/allanaoudji/"
				target="_blank"
			>
				{children}
			</a>
		</section>
	);
}
