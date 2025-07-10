import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import InstagramSection from "@/components/InstagramSection";
import ShopSection from "@/components/ShopSection";

export default function Home() {
	return (
		<>
			<ShopSection />
			<GallerySection separator={true} />
			<InstagramSection />
			<ContactSection />
		</>
	);
}
