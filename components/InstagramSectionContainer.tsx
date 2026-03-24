import { cn } from "@/lib/utils";
import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function InstagramSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section
			className={cn(
				"vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary",
				className,
			)}
		>
			<div className="padding-container">
				<SubTitle>Instagram</SubTitle>
				<a className="block" href="https://www.instagram.com/allanaoudji/" target="_blank">
					<Grid type="smallest">{children}</Grid>
				</a>
			</div>
		</section>
	);
}
