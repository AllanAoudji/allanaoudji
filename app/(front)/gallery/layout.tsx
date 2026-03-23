type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return <div className="padding-container vertical-padding">{children}</div>;
}
