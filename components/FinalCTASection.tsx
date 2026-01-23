import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function FinalCTASection() {
  const supabase = await createClient();
  const { data: rawContent } = await supabase
    .from("elementos_web")
    .select("*")
    .eq("seccion", "final_cta");

  const content = rawContent?.reduce((acc: any, item) => {
    acc[item.llave] = { texto: item.contenido, meta: item.metadata };
    return acc;
  }, {}) || {};

  const beneficios = Object.keys(content)
    .filter(key => key.startsWith('fcta_ben_'))
    .map(key => ({
      texto: content[key].texto,
      icon: content[key].meta?.icon
    }));
    // console.log(content)
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LADO IZQUIERDO: COPY Y BENEFICIOS */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-lima leading-tight  uppercase tracking-tighter">
              {content.fcta_titulo?.texto}
            </h2>
            <p className="text-sm md:text-lg font-bold text-white uppercase tracking-widest opacity-80">
              {content.fcta_subtitulo?.texto}
            </p>
          </div>

          {/* GRID DE BENEFICIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            {beneficios.map((ben, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-125 transition-transform">{ben.icon}</span>
                <span className="text-white font-bold text-lg md:text-xl tracking-tight">
                  {ben.texto}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Y ACCENTO ROJO */}
          <div className="space-y-8 pt-6 text-center md:text-left">
            <p className="text-3xl md:text-4xl font-black text-red-600  uppercase">
              {content.fcta_accent_red?.texto}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/#ruta"
                className="px-8 py-4 bg-lima/10 border-2 border-lima text-lima rounded-xl font-black text-sm md:text-base hover:bg-lima hover:text-black transition-all flex items-center gap-2"
              >
                <span className="text-xl">🟢</span> QUIERO MI RUTA 80/20
              </Link>
              
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-lima text-black rounded-xl font-black text-sm md:text-base hover:shadow-[0_0_30px_rgba(191,255,0,0.4)] transition-all flex items-center gap-2"
              >
                <span className="text-xl">⚡</span> CREAR CUENTA GRATIS
              </Link>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: LA CARD DE "EL SISTEMA" */}
        <div className="lg:col-span-5 relative">
          <div className="bg-[#0a0a0a] border-2 border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Luces de fondo */}
            <div className="absolute top-0 right-0 size-40 bg-red-600/10 blur-[80px]" />
            <div className="absolute bottom-0 left-0 size-40 bg-lima/10 blur-[80px]" />

            <div className="relative z-10 space-y-8 text-center">
              {/* Texto Warn (El Sistema) */}
              <div className="space-y-2">
                <p className="text-red-600 font-black text-2xl md:text-4xl leading-none uppercase tracking-tighter">
                {content.card_sistema_warn.texto}
                </p>
              </div>

              {/* Texto Éxito (Tú quieres) */}
              <p className="text-4xl md:text-5xl font-black text-lima uppercase leading-[0.9] tracking-tighter whitespace-pre-line">
                {content.card_user_goal?.texto }
              </p>

              {/* Imagen Mascota */}
              <div className="py-4">
                <img 
                  src={content.card_mascota?.texto } 
                  alt={content.card_mascota?.meta?.alt } 
                  className="w-48 h-auto mx-auto drop-shadow-[0_0_30px_rgba(191,255,0,0.3)] transform group-hover:rotate-3 transition-transform"
                />
              </div>

              {/* Badges dinámicos desde JSON */}
              <div className="flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              {content.card_badges.meta.map((badge: any, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <span>{badge.icon}</span> {badge.label}
                </div>
                ))}
              </div>
              
              {/* Botón dinámico */}
              <Link
                href={content.card_btn_final?.meta?.href}
                className="block w-full py-4 border-2 border-lima text-lima rounded-xl font-black text-xl hover:bg-lima hover:text-black transition-all mt-4 uppercase"
              >
                {content.card_btn_final?.texto } <br />
                <span className="text-[10px] opacity-70">
                  {content.card_btn_final?.meta?.subtext}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}