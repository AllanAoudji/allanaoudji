import Image from "next/image";

export default function SplashScreen() {
	return (
		<div className="bg-primary fixed inset-0 z-50 flex items-center justify-center">
			<Image
				alt={"logo"}
				className="w-72 max-w-full p-4"
				height={762}
				priority={true}
				src="/images/logo-square-dark.png"
				width={1419}
			/>
		</div>
	);
}
