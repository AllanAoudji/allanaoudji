type LightboxImage = (workGalleryImage & { _id: string }) | (shopifyImage & { _id: string });

export default LightboxImage;
