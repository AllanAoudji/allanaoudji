"use client";

import Image from "next/image";
import InstagramSectionItemIcon from "./InstagramSectionItemIcon";
import InstagramImage from "@/types/instagramImage";

type Props = {
	post?: InstagramImage;
};

export default function InstagramSectionItem({ post }: Readonly<Props>) {
	// Déterminer l'URL correcte (vidéo => thumbnail)
	const imageUrl = post?.media_type === "VIDEO" ? post.thumbnail_url : post?.media_url;

	return (
		<div className="text-primary">
			<div className="bg-quaternary relative aspect-4/5 w-full overflow-hidden border">
				{imageUrl && (
					<Image
						src={imageUrl}
						alt="Instagram image"
						fill
						sizes="(max-width: 768px) 50vw, 20vw"
						className="object-cover"
						priority={false} // LCP non critique
					/>
				)}
			</div>
			<div className="bg-primary text-secondary flex w-full justify-center gap-4 p-1">
				<InstagramSectionItemIcon count={post?.like_count ?? 0} type="likes" />
				<InstagramSectionItemIcon count={post?.comments_count ?? 0} type="comments" />
			</div>
		</div>
	);
}
