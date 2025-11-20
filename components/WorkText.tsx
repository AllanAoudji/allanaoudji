import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	text: string | null;
};

export default function WorkText({ className, text }: Readonly<Props>) {
	if (!text) return null;
	return <p className={cn(className, "pb-4 whitespace-pre-line")}>{text}</p>;
}
