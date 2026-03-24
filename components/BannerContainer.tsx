"use client";

import { use } from "react";
import Banner from "./Banner";
import { BANNET_QUERY_RESULT } from "@/sanity/types";

type Props = {
	bannerPromise: Promise<BANNET_QUERY_RESULT>;
};

export default function BannerContainer({ bannerPromise }: Readonly<Props>) {
	const query = use(bannerPromise);
	if (!query || !query.banner || query.banner === "") return null;

	return <Banner banner={query.banner} separator="    ★    " speed={30} />;
}
