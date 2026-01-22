import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Eye, Users, ArrowUpRight } from "lucide-react";

export const CommunitySection = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("elementos_web").select("*").eq("seccion", "community_sc");
  if (data == null || error) throw new Error("error en obtener datos de community_sc");

  const content = data.reduce((acc, item) => {
    acc[item.llave] = {
      texto: item.contenido,
      meta: item.metadata,
      tipo: item.tipo
    };
    return acc;
  }, {} as any);

  const cardKeys = Object.keys(content).filter(key => key.startsWith('sc_post_'));

  return (
    <section className="py-20 px-6 relative overflow-hidden ">
      <div className="absolute inset-0 bg-[radial-gradient(#bfff0033_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header con Neón */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  border border-lima/20 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lima opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lima"></span>
            </span>
            <span className="text-lima  text-xs uppercase tracking-[0.2em]">
              {content.cs_badge?.texto || "Live Community"}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter italic uppercase">
            {content.cs_title.texto} 
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
             <p className="text-xl text-zinc-400 max-w-xl font-medium">
                {content.cs_subtitle_2.texto}
             </p>
             <span className="hidden md:block h-px w-12 bg-lima/30"></span>
             <h3 className="text-2xl text-lima font-bold tracking-tight">
                {content.cs_subtitle.texto}
             </h3>
          </div>
        </div>

        {/* Grid Estilo Bento / Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cardKeys.map((key) => (
            <div
              key={key}
              className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-lima/40 transition-all duration-500 overflow-hidden"
            >
              {/* Efecto de Luz al hacer Hover */}
              <div className="absolute -inset-px bg-gradient-to-br from-lima/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-lima text-[10px] font-bold uppercase tracking-widest group-hover:bg-lima group-hover:text-black transition-colors">
                    {content[key].meta.category}
                  </span>
                  <ArrowUpRight className="text-white/20 group-hover:text-lima group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                </div>

                <div className="text-7xl mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(191,255,0,0.2)]">
                  {content[key].meta.emoji}
                </div>

                <p className="text-white font-bold text-xl md:text-2xl leading-[1.1] mb-4 group-hover:text-lima transition-colors">
                  {content[key].texto}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <Eye size={16} className="text-lima/50" />
                  <span className="text-xs font-mono tracking-tighter capitalize">
                    {content[key].meta.views} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA con Shimmer Effect */}
        <div className="flex justify-center">
          <Link href={"#"} className="group relative">
            <div className="absolute -inset-1 bg-lima rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative flex items-center gap-4 px-10 py-5 rounded-2xl bg-lima text-black font-black text-xl uppercase tracking-tighter hover:bg-white transition-colors duration-300">
              {content.cs_cta.texto}
              <Users size={24} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};