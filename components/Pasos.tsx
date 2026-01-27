import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import * as Icons from "lucide-react";

export default async function ProtocoloRegistro() {
  const supabase = await createClient();
  const { data: rawContent } = await supabase
    .from("elementos_web")
    .select("*")
    .eq("seccion", "p_p");

  const content = rawContent?.reduce((acc: any, item) => {
  acc[item.llave] = { texto: item.contenido, meta: item.metadata };
  return acc;
}, {}) || {};
  // Procesar los pasos y mapear iconos
  const pasosDinamicos = Object.keys(content)
  .filter(key => key.startsWith('pp_paso_')) // Filtro actualizado
  .sort()
  .map(key => {
    const step = content[key];
    const IconComponent = (Icons as any)[step.meta?.icon] || Icons.HelpCircle;
    return {
      titulo: step.meta?.titulo,
      descripcion: step.texto,
      Icon: IconComponent
    };
  });
  return (
    <section className="w-full py-20 overflow-hidden ">
      <div className="max-w-6xl mx-auto px-6 relative">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-lima">
            {content.pp_titulo_principal?.texto} 
          </h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-[0.3em]">
            {content.pp_subtitulo?.texto} 
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-y-12 gap-x-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-lima/20 to-transparent -z-10"></div>

          {pasosDinamicos.map((p, i) => (
            <div key={i} className="group relative">
              <div className="absolute -top-4 -left-2 text-6xl font-black text-white/10 group-hover:text-lima/10 transition-colors pointer-events-none">
                0{i + 1}
              </div>

              <div className="relative p-6 bg-zinc-900/40 border border-white/5 rounded-2xl transition-all duration-300 group-hover:border-lima/40 group-hover:-translate-y-2 backdrop-blur-sm">
                <div className="w-14 h-14 flex items-center justify-center bg-black border border-white/10 text-lima rounded-xl mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-lima group-hover:shadow-[0_0_20px_rgba(190,242,2,0.2)] transition-all">
                  <p.Icon size={24} />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-lima transition-colors">
                  {p.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {p.descripcion}
                </p>

                <div className="mt-4 h-1 w-0 bg-lima group-hover:w-full transition-all duration-500 rounded-full opacity-50"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href={content.pp_cta_texto?.meta?.href } 
            className="inline-block px-10 py-4 bg-lima text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(191,255,0,0.2)] uppercase"
          >
            {content.pp_cta_texto?.texto}
          </Link>
        </div>
      </div>
    </section>
  );
}