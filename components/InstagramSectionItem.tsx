import ImageContainer from "./ImageContainer";
import InstagramSectionItemIcon from "./InstagramSectionItemIcon";
import InstagramImage from "@/types/instagramImage";
import { SanityImage } from "@/types/sanityType";

type Props = {
	post?: InstagramImage;
};

const convertInstagramImageForContainerImage = (instagramImage: InstagramImage): SanityImage => {
	return {
		_id: "",
		alt: "image instagram",
		blurHash: null,
		height: 1350,
		lqip: null,
		url:
			instagramImage.media_type === "VIDEO" ? instagramImage.thumbnail_url : instagramImage.media_url,
		width: 1080,
	};
};

export default function InstagramSectionItem({ post }: Readonly<Props>) {
	return (
		<div className="text-primary">
			{!!post ? (
				<ImageContainer
					className="border"
					image={convertInstagramImageForContainerImage(post)}
					ratio="4/5"
					sizes="(max-width: 768px) 50vw, 20vw"
				/>
			) : (
				<div className="bg-tertiary aspect-4/5 w-full border" />
			)}
			<div className="bg-primary text-secondary flex w-full justify-center gap-4 p-1">
				<InstagramSectionItemIcon count={!!post ? post.like_count : 0} type="likes" />
				<InstagramSectionItemIcon count={!!post ? post.comments_count : 0} type="comments" />
			</div>
		</div>
	);
}
