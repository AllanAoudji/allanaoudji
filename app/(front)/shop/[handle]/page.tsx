import Title from "@/components/Title";

type Props = {
	params: Promise<{ handle: string }>;
};

export default async function ShopDetail({ params }: Readonly<Props>) {
	const { handle } = await params;
	return (
		<>
			<Title>{handle}</Title>
		</>
	);
}
