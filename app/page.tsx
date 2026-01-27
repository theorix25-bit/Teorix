import ChatAssistant from "@/components/ChatAssistant";
import { CommunitySection } from "@/components/CommunitySection";
import Exito from "@/components/Exito";
import FinalCTASection from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import Metodo from "@/components/Metodo";
import Objeciones from "@/components/Objeciones";
import {
  Algoritmo,
  Datos,
  Profesor247,
} from "@/components/page";
import ParaQuein from "@/components/paraquien";
import Pasos from "@/components/Pasos";
import { PricingSection } from "@/components/PricingSection";
import PuntosDeDolor from "@/components/PuntosDeDolor";
import  TeorixFAQs  from "@/components/Teorix";
import Teox from "@/components/Teox";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhatsappButton } from "@/components/WhatsappButton";
const urlAsistente = process.env.NEXT_URL_ASISTENTE!;
export default async function Home() {
  return (
    <>
      <div className=" text-white">
        {/* hero comprobado*/}
        <HeroSection />

        {/* puntos_dolor comprobado */}
        <PuntosDeDolor />

        {/* metodo comprobado */}
        <Metodo />

        {/* community_sc */}
        <CommunitySection />

        {/* exito_sc comprobado */}
        <Exito />

        {/* prueba_social */}
        <TestimonialsSection />

        {/* garantia  aprobado */}
        <Profesor247 />

        {/* objeciones aprobado */}
        <Objeciones />

        {/* final_cta */}
        <FinalCTASection />

        {/* Listos */}
        <ParaQuein />

        {/* who_is_teox */}
        <Teox />
        <PricingSection />
        {/* p_p */}
        <Pasos />

        <TeorixFAQs />
        <section className=" mt-10 px-2">
          <img
            src="bg-3.jpg"
            alt=""
            className="rounded-2xl md:w-[79vw] md:h-96  md:object-cover object-bottom  mx-auto"
          />
        </section>
        <WhatsappButton />
        <Footer />
        <ChatAssistant urlAsistente={urlAsistente} />
      </div>
    </>
  );
}
