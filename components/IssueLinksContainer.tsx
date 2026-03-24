type Props = {
	children: React.ReactNode;
};

export default function IssueLinksContainer({ children }: Readonly<Props>) {
	return <div className="mt-12 flex flex-col gap-4 sm:flex-row">{children}</div>;
}
