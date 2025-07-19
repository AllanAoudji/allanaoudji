import Image from "next/image";
import InstagramSectionIcon from "./InstagramSectionIcon";
import { InstagramImage } from "@/types/instagramImage";

type Props = {
	post?: InstagramImage;
};

export default function InstagramSectionItem({ post }: Readonly<Props>) {
	return (
		<div className="text-primary">
			<div className="bg-secondary border-quaternary flex aspect-4/5 w-full items-center justify-center overflow-hidden border-4">
				{!!post && (
					<Image
						alt="instagram post"
						className="min-h-full min-w-full shrink-0"
						height={1350}
						src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
						width={1080}
					/>
				)}
			</div>
			<div className="bg-quaternary flex w-full justify-center gap-5 p-2">
				<InstagramSectionIcon type="likes" count={!!post ? post.like_count : 0} />
				<InstagramSectionIcon type="comments" count={!!post ? post.comments_count : 0} />
			</div>
		</div>
	);
}
