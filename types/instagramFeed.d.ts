import InstagramImage from "./instagramImage";

type InstagramFeeds =
	| {
			data: InstagramImage[];
			paging: {
				cursors: {
					after: string;
					before: string;
				};
				next: string;
			};
			error: undefined;
	  }
	| {
			error: {
				message: string;
				type: string;
				code: number;
				fbtrace_id: string;
			};
	  };

export default InstagramFeeds;
