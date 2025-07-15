import { FaCommentAlt, FaHeart } from "react-icons/fa";

type Props = {
	type: "likes" | "comments";
	count: number;
};

export default function InstagramSectionIcon({ type, count }: Readonly<Props>) {
	return (
		<div className="flex">
			<div className="flex pr-2">
				{type === "comments" ? (
					<FaCommentAlt className="my-auto" size="20px" />
				) : (
					<FaHeart className="my-auto" size="20px" />
				)}
			</div>
			<p className="inline-block align-middle">{count}</p>
		</div>
	);
}
