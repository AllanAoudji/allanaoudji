type InstagramImageType = {
	id: string;
	media_type: "IMAGE" | "CAROUSEL_ALBUM";
	media_url: string;
	like_count: number;
	comments_count: number;
};

type InstagramVideoType = {
	id: string;
	media_type: "VIDEO";
	media_url: string;
	thumbnail_url: string;
	like_count: number;
	comments_count: number;
};

type InstagramImage = InstagramImageType | InstagramVideoType;

export default InstagramImage;
