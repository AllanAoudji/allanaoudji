import ContactSection from "@/components/ContactSection";
import InstagramSection from "@/components/InstagramSection";
import ShopSection from "@/components/ShopSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
	return (
		<>
			<ShopSection />
			<WorksSection />
			<InstagramSection />
			<ContactSection />
		</>
	);
}
