"use client";

import { use } from "react";
import Banner from "./Banner";
import { BANNER_QUERY_RESULT } from "@/studio/types";

type Props = {
	bannerPromise: Promise<{
		data: BANNER_QUERY_RESULT;
	}>;
};

export default function BannerContainer({ bannerPromise }: Readonly<Props>) {
	const query = use(bannerPromise);

	if (!query || !query.data || !query.data.banner || query.data.banner === "") return null;

	return <Banner banner={query.data.banner} separator="    ★    " speed={30} />;
}
