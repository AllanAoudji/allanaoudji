import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { getProducts } from "@/lib/shopify";
import { getCachedProduct } from "@/lib/shopify/utils/cached";
import { getProductDefaultVariant } from "@/lib/utils";
import ProductSingleContent from "@/components/ProductSingleContent";
import SectionError from "@/components/SectionError";
import SkeletonProductSingle from "@/components/SkeletonProductSingle";
import Product from "@/types/product";

type Props = {
	params: Promise<{ handle: string }>;
};

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
	const handles: { handle: string }[] = [];
	let after: string | undefined = undefined;
	let hasNextPage = true;
	try {
		while (hasNextPage) {
			const { products, pageInfo } = await getProducts({ first: 100, after });
			products.forEach(p => handles.push({ handle: p.handle }));
			hasNextPage = pageInfo.hasNextPage;
			after = pageInfo.endCursor ?? undefined;
		}
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "generateStaticParams products" },
		});
		throw error;
	}

	return handles;
}

export async function generateMetadata({ params }: Readonly<Props>): Promise<Metadata> {
	const { handle } = await params;
	let product: Product | undefined;
	try {
		product = await getCachedProduct(handle);
	} catch {
		return {};
	}

	if (!product) return {};

	const { description, title } = product;
	const defaultVariant = getProductDefaultVariant(product);
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${handle}`;
	const variantUrl = defaultVariant ? `${url}?${defaultVariant}` : url;

	return {
		alternates: {
			canonical: variantUrl,
		},
		description,
		openGraph: {
			url,
			description,
			locale: "fr_FR",
			siteName: "Allan Aoudji",
			title,
			type: "website",
		},
		title,
		twitter: {
			card: "summary_large_image",
			description,
			title,
		},
	};
}

export default async function ProductSinglePage({ params }: Readonly<Props>) {
	const { handle } = await params;

	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonProductSingle />}>
				<ProductSingleContent handle={handle} />
			</Suspense>
		</ErrorBoundary>
	);
}
