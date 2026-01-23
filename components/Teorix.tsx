import { createClient } from "@/lib/supabase/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function TeorixFAQs() {
  const supabase = await createClient();
  const { data: rawContent } = await supabase
    .from("elementos_web")
    .select("*")
    .eq("seccion", "faqs");

  const content = rawContent?.reduce((acc: any, item) => {
    acc[item.llave] = { texto: item.contenido, meta: item.metadata };
    return acc;
  }, {}) || {};

  // Filtrar y ordenar las preguntas
  const preguntasDinamicas = Object.keys(content)
    .filter(key => key.startsWith('fq_item_'))
    .sort()
    .map(key => ({
      pregunta: content[key].meta?.pregunta,
      respuesta: content[key].texto
    }));

  return (
    <section className="px-4 md:w-[90vw] mx-auto py-16 relative overflow-hidden" id="faqs">
      <div className="absolute top-0 right-0 w-64 h-64 bg-lima/5 blur-[100px] -z-10" />

      <h2 className="text-3xl md:text-5xl font-black text-lima text-center mb-12 italic uppercase tracking-tighter">
        {content.fq_titulo?.texto?.split(' ').slice(0, -1).join(' ')} <span className="text-white neon-glow">{content.fq_titulo?.texto?.split(' ').pop()}</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* IMAGEN LATERAL */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-lima to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video md:aspect-square">
            <img 
              src={content.fq_imagen?.texto || "/clasesTeo.webp"} 
              alt={content.fq_imagen?.meta?.alt || "Teorix"} 
              className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* ACORDEÓN */}
        <div className="w-full md:w-1/2">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {preguntasDinamicas.map((p, i) => (
              <AccordionItem 
                key={i} 
                value={String(i)} 
                className="border border-white/10 bg-zinc-900/50 rounded-xl px-4 transition-all hover:border-lima/40 overflow-hidden"
              >
                <AccordionTrigger className="font-black text-lg md:text-xl text-left hover:no-underline hover:text-lima py-6">
                  <span className="flex items-center gap-3">
                    <span className="text-lima/50 font-mono text-xs">0{i + 1} //</span>
                    {p.pregunta}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-lg pb-6 leading-relaxed border-t border-white/5 pt-4">
                  {p.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {content.fq_nota_footer && (
            <div className="mt-8 p-4 border-l-2 border-red-600 bg-red-600/5 rounded-r-xl">
              <p className="text-sm font-medium text-gray-300 italic">
                {content.fq_nota_footer.texto}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}