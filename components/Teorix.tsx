import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Asumiendo que usas Shadcn UI

export default function TeorixFAQs() {
  const preguntas = [
    {
      pregunta: "¿QUÉ ES TEORIX*?",
      respuesta: "Nuestra misión social es que apruebes a la primera, sin importar las siglas que pongan en tu expediente. Es el método de acompañamiento para todos los que quieren el APTO en tiempo récord y con el menor esfuerzo posible."
    },
    {
      pregunta: "¿Y SI YA ESTOY EN UNA AUTOESCUELA?",
      respuesta: "Es perfecto. Somos el complemento ideal que te acompaña hasta el apto. Blindamos tu formación para que no tires dinero en renovaciones innecesarias."
    },
    {
      pregunta: "¿PUEDO IR POR LIBRE O SIN MATRÍCULA?",
      respuesta: "Con Teorix* puedes prepararte para tu apto asegurado y presentarte dónde y con quién quieras. Lo importante es que nos dejes ayudarte a aprobar. Si quieres que gestionemos tu examen, solo pídelo."
    },
    {
      pregunta: "¿ES GRATIS O DE PAGO?",
      respuesta: "En función de lo que necesites. Puedes empezar a probar nuestra FÓRMULA y ver contenido de alta calidad de forma totalmente GRATUITA."
    },
  ];

  return (
    <section className="px-4 md:w-[90vw] mx-auto py-16 relative overflow-hidden" id="faqs">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lima/5 blur-[100px] -z-10" />

      <h2 className="text-3xl md:text-5xl font-black text-lima text-center mb-12 italic uppercase tracking-tighter">
        RESOLVEMOS TUS <span className="text-white neon-glow">DUDAS</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* LADO IZQUIERDO: IMAGEN ESTILO TEORIX */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-lima to-hoodie rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="/clasesTeo.webp" 
              alt="Clases con Teorix" 
              className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* LADO DERECHO: ACORDEÓN GAMER */}
        <div className="w-full md:w-1/2">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {preguntas.map((p, i) => (
              <AccordionItem 
                key={i} 
                value={String(i)} 
                className="border border-white/10 bg-zinc-900/50 rounded-xl px-4 transition-all hover:border-lima/40"
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
          
          <div className="mt-8 p-4 border-l-2 border-hoodie bg-hoodie/5 rounded-r-xl">
             <p className="text-sm font-medium text-gray-300 italic">
                *¿Tienes una duda técnica? Teox* está disponible 24/7 en el chat inferior para hackear tus problemas.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}