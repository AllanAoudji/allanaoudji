import { FunctionComponent } from "react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	html: string;
};

interface TextPros {
	html: string;
	className?: string;
}

const Prose: FunctionComponent<TextPros> = ({ className, html }: Readonly<Props>) => {
	return (
		<div
			className={cn("prose mx-auto text-base", className)}
			dangerouslySetInnerHTML={{ __html: html as string }}
		/>
	);
};

export default Prose;
