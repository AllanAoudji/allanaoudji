import { cn } from "@/lib/utils";
import SubTitle from "./SubTitle";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function GalleryHomeSectionContainer({ children, className }: Readonly<Props>) {
	return (
		<section className={cn("vertical-padding", className)}>
			<div className="padding-container">
				<SubTitle className="">Découvrire mon travail</SubTitle>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">{children}</div>
			</div>
		</section>
	);
}
