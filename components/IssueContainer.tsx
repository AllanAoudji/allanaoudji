type Props = {
	children: React.ReactNode;
};

export default function IssueContainer({ children }: Readonly<Props>) {
	return (
		<div className="flex flex-col items-center justify-center pt-16 text-center">{children}</div>
	);
}
