import { createClient } from "@/lib/supabase/server";
import { Database, Zap, Cpu, Target } from "lucide-react";

export default async function Exito() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('elementos_web')
    .select('*')
    .eq('seccion', 'exito_sc')
    .order('orden', { ascending: true });

  if (error || !data) return null;

  const content = data.reduce((acc, item) => {
    acc[item.llave] = {
      texto: item.contenido,
      meta: item.metadata,
    };
    return acc;
  }, {} as any);

  // Mapeo fijo de iconos para las cards
  const cardIcons: Record<string, any> = {
    exito_card_1: <Database className="w-6 h-6 text-lima" />,
    exito_card_2: <Zap className="w-6 h-6 text-hoodie" />,
  };

  return (
    <section className="px-4 py-20 relative overflow-hidden text-white">
      {/* Glow Decorativo */}
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 px-2">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            {content.exito_title.texto}
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase">
            {content.exito_subtitle.texto}
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-white max-w-3xl mx-auto bg-zinc-800/5 p-4 rounded-2xl border border-lima/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-lima font-bold"><Cpu size={20}/> DATA</div>
            <div className="hidden md:block text-gray-600">|</div>
            <div className="flex items-center gap-2 text-hoodie font-bold"><Target size={20}/> IA</div>
            <div className="hidden md:block text-gray-600">|</div>
            <p className="text-sm">{content.exito_strategy.texto}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {['exito_card_1', 'exito_card_2'].map((key) => {
            const card = content[key];
            return (
              <div key={key} className="group relative bg-zinc-900/40 border border-white/10 p-8 rounded-3xl transition-all duration-500 hover:border-lima/50 hover:bg-zinc-900/60 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-black rounded-xl border border-white/10 group-hover:border-lima/50 group-hover:shadow-[0_0_15px_rgba(190,242,2,0.3)] transition-all">
                    {cardIcons[key]}
                  </div>
                  <div>
                    <p className="text-xs font-mono text-lima/70 tracking-widest uppercase">{card.meta.subtitle}</p>
                    <h4 className="text-2xl font-black italic tracking-tight uppercase">{card.meta.title}</h4>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                  {card.texto}
                </p>

                <div className="p-4 bg-black/40 rounded-xl border-l-2 border-lima italic text-sm text-gray-300">
                  "{card.meta.highlight}"
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative max-w-4xl mx-auto text-center bg-gradient-to-b from-zinc-900/50 to-zinc-950 p-10 rounded-[3rem] border border-white/5">
          <h2 className="text-2xl md:text-4xl font-black mb-6 uppercase leading-tight">
            {content.exito_footer_title.texto.split(',')[0]}, <br />
            <span className="text-lima">{content.exito_footer_title.texto.split(',')[1]}</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {content.exito_footer_desc.texto}
          </p>
          
          <div className="mt-8 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-1 w-8 bg-lima/20 rounded-full overflow-hidden">
                <div className="h-full bg-lima animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}