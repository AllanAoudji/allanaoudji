import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ContactForm from "./ContactForm";
import ContactLinks from "./ContactLinks";
import NullError from "./NullError";
import SkeletonContactHome from "./SkeletonContactHome";

export default function ContactContainer() {
	return (
		<div className="grid grid-cols-6 gap-4">
			<div className="order-1 col-span-6 md:col-span-3 md:col-start-4">
				<div className="text-lg leading-6">
					<p className="font-bold">On discute&nbsp;? Une idée de partenariat&nbsp;?</p>
					<p>Partage ton idée, ton feedback, ou juste pour dire bonjour&nbsp;😄</p>
				</div>
			</div>
			<div className="order-3 col-span-6 mt-24 flex md:order-2 md:col-span-3 md:mt-0">
				<ErrorBoundary errorComponent={NullError}>
					<Suspense fallback={<SkeletonContactHome />}>
						<ContactLinks />
					</Suspense>
				</ErrorBoundary>
			</div>
			<ContactForm className="order-2 col-span-6 md:order-3 md:col-span-3" />
		</div>
	);
}
