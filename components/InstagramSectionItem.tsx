import ImageContainer from "./ImageContainer";
import InstagramSectionIcon from "./InstagramSectionIcon";
import { InstagramImage } from "@/types/instagramImage";
import { workMainImage } from "@/types/sanityType";

type Props = {
	post?: InstagramImage;
};

const convertInstagramImageForContainerImage = (instagramImage: InstagramImage): workMainImage => {
	return {
		alt: "image instagram",
		height: 1350,
		lqip: null,
		url: instagramImage.media_url,
		width: 1080,
	};
};

export default function InstagramSectionItem({ post }: Readonly<Props>) {
	return (
		<div className="text-primary">
			{!!post ? (
				<ImageContainer
					image={convertInstagramImageForContainerImage(post)}
					className="border-quaternary border-4"
					ratio="4/5"
				/>
			) : (
				<div className="bg-secondary border-quaternary aspect-4/5 w-full border-4" />
			)}
			<div className="bg-quaternary flex w-full justify-center gap-5 p-2">
				<InstagramSectionIcon type="likes" count={!!post ? post.like_count : 0} />
				<InstagramSectionIcon type="comments" count={!!post ? post.comments_count : 0} />
			</div>
		</div>
	);
}
