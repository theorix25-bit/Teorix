// import { CommunitySection } from "@/components/CommunitySection";
import { HeroSection } from "@/components/HeroSection";
// import { MethodSection } from "@/components/MethodSection";
// import { PricingSection } from "@/components/PricingSection";
// import { TestimonialsSection } from "@/components/TestimonialsSection";
export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <HeroSection />
        {/* <MethodSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <PricingSection /> */}
        {/* <CommunitySection /> */}
      </div>
    </>
  );
}
