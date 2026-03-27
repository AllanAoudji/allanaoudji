import ImageContainer from "./ImageContainer";
import InstagramSectionItemIcon from "./InstagramSectionItemIcon";
import InstagramImage from "@/types/instagramImage";

type Props = {
	post?: InstagramImage;
};

type SanityImage = {
	alt: string | null;
	url: string | null;
	_id: string;
	width: number | null;
	height: number | null;
	blurHash: string | null;
	lqip: string | null;
};

const convertInstagramImageForContainerImage = (instagramImage: InstagramImage): SanityImage => {
	return {
		alt: "image instagram",
		url:
			instagramImage.media_type === "VIDEO" ? instagramImage.thumbnail_url : instagramImage.media_url,
		_id: "",
		width: 1080,
		height: 1350,
		lqip: null,
		blurHash: null,
	};
};

export default function InstagramSectionItem({ post }: Readonly<Props>) {
	return (
		<div className="text-primary">
			{!!post ? (
				<ImageContainer
					image={convertInstagramImageForContainerImage(post)}
					className="border"
					ratio="4/5"
				/>
			) : (
				<div className="bg-tertiary aspect-4/5 w-full border" />
			)}
			<div className="bg-primary text-secondary flex w-full justify-center gap-4 p-1">
				<InstagramSectionItemIcon type="likes" count={!!post ? post.like_count : 0} />
				<InstagramSectionItemIcon type="comments" count={!!post ? post.comments_count : 0} />
			</div>
		</div>
	);
}
