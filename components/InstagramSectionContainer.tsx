import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function InstagramSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("vertical-padding", className)}>
			<div className="padding-container">
				<SubTitle>Instagram</SubTitle>
				<a className="block" href="https://www.instagram.com/allanaoudji/" target="_blank">
					<div className="grid grid-cols-3 gap-4 md:grid-cols-6">{children}</div>
				</a>
			</div>
		</section>
	);
}
