import { Suspense } from "react";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>Mentions légales</Title>
			<Suspense>{children}</Suspense>
		</div>
	);
}
