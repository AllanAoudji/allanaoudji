type Props = {
	params: Promise<{ handle: string }>;
};

export default async function Page({ params }: Readonly<Props>) {
	const { handle } = await params;

	console.log(handle);
}
