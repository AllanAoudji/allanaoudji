"use client";

import { use } from "react";
import BanenrSectionItem from "./BannerSectionItem";
import { BANNET_QUERY_RESULT } from "@/sanity/types";

type Props = {
	bannerPromise: Promise<BANNET_QUERY_RESULT>;
};

export default function BannerSection({ bannerPromise }: Readonly<Props>) {
	const query = use(bannerPromise);
	if (!query || !query.banner || query.banner === "") return null;

	return <BanenrSectionItem banner={query.banner} separator="    ★    " speed={30} />;
}
