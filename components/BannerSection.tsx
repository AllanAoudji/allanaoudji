import BanenrSectionItem from "./BannerSectionItem";
import { getBanner } from "@/sanity/lib/queries";
import { BANNET_QUERY_RESULT } from "@/sanity/types";

export default async function BannerSection() {
	let query: BANNET_QUERY_RESULT;
	try {
		query = await getBanner();
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!query || !query.banner || query.banner === "") {
		return null;
	}

	return <BanenrSectionItem banner={query.banner} separator="    ★    " speed={30} />;
}
