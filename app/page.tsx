import ChatAssistant from "@/components/ChatAssistant";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { MethodSection } from "@/components/MethodSection";
import { Algoritmo, Datos, Exito, FAQs, Metodo, Profesor247 } from "@/components/page";
import { PricingSection } from "@/components/PricingSection";
import Profesor from "@/components/Profesor";
import { TestimonialsSection } from "@/components/TestimonialsSection";
const urlAsistente = process.env.NEXT_URL_ASISTENTE!;
export default async function Home() {
  return (
    <>
      <div className=" text-white">
        <HeroSection />
        <Profesor247 />
        <Exito />
        <Metodo />
        <PricingSection />
        <FAQs />
        <CommunitySection />
        <Datos />
        <Algoritmo />
        <MethodSection />
        <TestimonialsSection />
        <Footer />
        <ChatAssistant urlAsistente={urlAsistente} />
      </div>
    </>
  );
}
