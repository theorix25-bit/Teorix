import ChatAssistant from "@/components/ChatAssistant";
import { CommunitySection } from "@/components/CommunitySection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import {
  Algoritmo,
  Datos,
  Exito,
  Metodo,
  Profesor247,
} from "@/components/page";
import ParaQuein from "@/components/paraquien";
import Pasos from "@/components/Pasos";
import { PricingSection } from "@/components/PricingSection";
import  TeorixFAQs  from "@/components/Teorix";
import Teox from "@/components/Teox";
import { TestimonialsSection } from "@/components/TestimonialsSection";
const urlAsistente = process.env.NEXT_URL_ASISTENTE!;
export default async function Home() {
  return (
    <>
      <div className=" text-white">
        <HeroSection />
        <Profesor247 />
        <Exito />
        <ParaQuein />
        <Metodo />
        <Teox />
        <PricingSection />
        <Pasos />
        <TeorixFAQs />
        <CommunitySection />
        <section className=" mt-10 px-2">
          <img
            src="bg-3.jpg"
            alt=""
            className="rounded-2xl md:w-[79vw] md:h-96  md:object-cover object-bottom  mx-auto"
          />
        </section>
        <TestimonialsSection />
        <Footer />
        <ChatAssistant urlAsistente={urlAsistente} />
      </div>
    </>
  );
}
