import { FaCommentAlt, FaHeart } from "react-icons/fa";

type Props = {
	count: number;
	type: "likes" | "comments";
};

export default function InstagramSectionItemIcon({ count, type }: Readonly<Props>) {
	return (
		<div className="flex items-center gap-1">
			<div>
				{type === "comments" ? (
					<FaCommentAlt className="my-auto" size="12px" />
				) : (
					<FaHeart className="my-auto" size="12px" />
				)}
			</div>
			<p className="inline-block align-middle text-sm">{count}</p>
		</div>
	);
}
