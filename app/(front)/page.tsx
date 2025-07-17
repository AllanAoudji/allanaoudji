import ContactSection from "@/components/ContactSection";
import InstagramSection from "@/components/InstagramSection";
import ShopSection from "@/components/ShopSection";
import WorksHomeSection from "@/components/WorksHomeSection";

export default function Home() {
	return (
		<>
			<ShopSection />
			<WorksHomeSection />
			<InstagramSection />
			<ContactSection />
		</>
	);
}
