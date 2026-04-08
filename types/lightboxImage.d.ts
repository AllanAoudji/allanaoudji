import { WorkGalleryImage } from "./sanityType";
import shopifyImage from "./shopifyImage";

type LightboxImage = (WorkGalleryImage & { _id: string }) | (shopifyImage & { _id: string });

export default LightboxImage;
