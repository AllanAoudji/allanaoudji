type Props = {
	className?: string;
	text: string | null;
};

export default function WorkText({ className, text }: Readonly<Props>) {
	if (!text) return null;
	return <p className={`${className} whitespace-pre-line`}>{text}</p>;
}
