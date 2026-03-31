import { IconExclamationMark, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Props = {
	callbackMessage: {
		message: string;
		type: "success" | "error";
	} | null;
	className?: string;
};

export default function ContactFormCallbackMessage({
	callbackMessage,
	className,
}: Readonly<Props>) {
	if (!callbackMessage) return null;

	return (
		<div className={cn("flex items-center gap-4 border p-4", className)}>
			<div
				className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold", {
					"bg-danger": callbackMessage.type === "error",
					"bg-success": callbackMessage.type === "success",
				})}
			>
				{callbackMessage.type === "error" ? (
					<IconExclamationMark className="text-primary" size={20} />
				) : (
					<IconCheck className="text-primary" size={20} />
				)}
			</div>
			<div>
				<p className="text-sm">{callbackMessage.message}</p>
			</div>
		</div>
	);
}
