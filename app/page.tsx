import ChatAssistant from "@/components/ChatAssistant";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { MethodSection } from "@/components/MethodSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { useUserStore } from "@/hooks/useUseStore";
const urlAsistente = process.env.NEXT_URL_ASISTENTE!;
export default async function Home() {
  return (
    <>
      <div className=" text-white">
        <HeroSection />
        <MethodSection />
        <TestimonialsSection />
        <PricingSection />
        <CommunitySection />
        <Footer />
        <ChatAssistant urlAsistente={urlAsistente} />
      </div>
    </>
  );
}
