import Image from "next/image";

export default function LogoLoader() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Image
				alt={"logo"}
				className="w-72 max-w-full p-4"
				height={762}
				src="/images/logo-square-dark.png"
				width={1419}
			/>
		</div>
	);
}
