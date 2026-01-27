import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion" // Asegúrate de que la ruta sea correcta
import { createClient } from '@/lib/supabase/server';

const preguntas = [
  {
    pregunta: "¿Esto vale si ya estoy en una autoescuela?",
    respuesta: "Sí. Teorix es refuerzo online para aprobar: estudias mejor y vas a examen con ventaja. 👉 Hacer test (2 min)",
    href: "/#test"
  },
  {
    pregunta: "¿Y si voy por libre?",
    respuesta: "También. Te damos ruta, contenido y entrenamiento. Tú eliges ritmo y fecha. 👉 Empezar gratis",
    href: "/auth/sign-up"
  },
  {
    pregunta: "¿Cuánto tiempo necesito al día?",
    respuesta: "Depende de tu nivel, pero la idea es clara: menos tiempo, más aciertos (ruta 80/20). 👉 Quiero mi ruta 80/20",
    href: "/#ruta"
  },
  {
    pregunta: "¿Teox es IA o hay personas?",
    respuesta: "Las dos. Teox 24/7 + soporte humano cuando te bloqueas (según fórmula). 👉 Crear cuenta gratis",
    href: "/auth/sign-up"
  },
  {
    pregunta: "¿Es gratis o de pago?",
    respuesta: "Plan gratis (0€ sin tarjeta) + planes de pago si quieres ir en modo speedrun. 👉 Empezar gratis",
    href: "/auth/sign-up"
  }
];

export async function Objeciones() {
  const supabase = await createClient()
  const { data: rawContent } = await supabase
  .from("elementos_web")
  .select("*")
  .eq("seccion", "objeciones");
  
  const content = rawContent?.reduce((acc: any, item) => {
    acc[item.llave] = { texto: item.contenido, meta: item.metadata };
    return acc;
  }, {}) || {};
  const preguntasDinamicas = Object.keys(content)
  .filter(key => key.startsWith('obj_faq_'))
  .map(key => ({
    pregunta: content[key].meta?.pregunta,
    respuesta: content[key].texto,
    linkText: content[key].meta?.linkText,
    href: content[key].meta?.href
  }));
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: ACORDEÓN */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-lima leading-none mb-4 uppercase tracking-tighter">
              {content.obj_titulo_principal?.texto}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-white/90">
              {content.obj_subtitulo?.texto}
            </h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {preguntasDinamicas.map((p, i) => (
              <AccordionItem 
                key={i} 
                value={String(i)} 
                className="border border-white/10 bg-zinc-900/50 rounded-2xl px-6 transition-all hover:border-lima/40 overflow-hidden"
              >
                <AccordionTrigger className="font-black text-lg md:text-xl text-left hover:no-underline hover:text-lima py-6 transition-colors">
                  <span className="flex items-center gap-3">
                    <span className="text-lima/50 font-mono text-xs">0{i + 1} //</span>
                    {p.pregunta}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-md pb-6 leading-relaxed border-t border-white/5 pt-4 ">
                  {p.respuesta}
                  <div className="mt-4">
                    <Link href={p.href} className="text-lima text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                      Acceder ahora <ArrowRight size={16} />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* COLUMNA DERECHA: FIJA (STICKY) */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-lima/20 rounded-[2rem] blur opacity-25" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl">
              <img
                src="/bg-1.jpg" 
                alt="Métodos Antiguos vs Teorix"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-md border border-white/5 p-3 rounded-[2rem] text-center space-y-4 shadow-xl">
            <div className="space-y-1">
              <p className="text-xl font-black text-white  uppercase ">
              {content.obj_cierre_pregunta.texto}
              </p>
              <p className="text-lima font-bold ">
              {content.obj_cierre_respuesta.texto}
              </p>
            </div>

            <Link
              href="/auth/sign-up"
              className="inline-block w-[80%] md:w-auto px-10 py-4 bg-lima text-black rounded-xl font-black text-lg hover:shadow-[0_0_30px_rgba(191,255,0,0.4)] transition-all hover:-translate-y-1 uppercase tracking-tight"
            >
              {content.obj_cta_boton.texto}
            </Link>
            
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              {content.obj_cta_subtexto.texto}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Objeciones