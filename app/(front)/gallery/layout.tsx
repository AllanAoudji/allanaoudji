type Props = {
	children: React.ReactNode;
};

export default function GalleryLayout({ children }: Readonly<Props>) {
	return <div className="padding-container vertical-padding">{children}</div>;
}
