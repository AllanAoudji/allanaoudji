import seoFragment from "./seo";

const pageFragment = /* GraphQL */ `
	fragment page on Page {
		... on Page {
			id
			title
			handle
			body
			bodySummary
			seo {
				...seo
			}
			createdAt
			updatedAt
		}
	}
	${seoFragment}
`;

export default pageFragment;
