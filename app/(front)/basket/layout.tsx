type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container">
			<div className="vertical-padding">{children}</div>
		</div>
	);
}
