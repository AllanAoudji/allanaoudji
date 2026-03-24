import { cn } from "@/lib/utils";
import Grid from "./Grid";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function GalleryHomeSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section
			className={cn(
				"vertical-padding odd:text-quaternary even:bg-quaternary even:text-primary",
				className,
			)}
		>
			<div className="padding-container">
				<SubTitle className="">Découvrire mon travail</SubTitle>
				<Grid type="large">{children}</Grid>
			</div>
		</section>
	);
}
