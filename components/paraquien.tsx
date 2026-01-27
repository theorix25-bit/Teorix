import { createClient } from "@/lib/supabase/server";

export default async function ParaQuein()  {
  const supabase = await createClient();
    const { data: rawContent } = await supabase
      .from("elementos_web")
      .select("*")
      .eq("seccion", "para_quien");
  
    const content = rawContent?.reduce((acc: any, item) => {
      acc[item.llave] = { texto: item.contenido, meta: item.metadata };
      return acc;
    }, {}) || {};
  return (
    <section className="relative py-10 text-white overflow-hidden">
      {/* Elementos decorativos de fondo similares al Hero */}

      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado de Sección */}
        <div className="text-center mb-6">
          <h2 className="text-lima font-bold tracking-widest uppercase mb-2">
            {content.pq_titulo.texto}
          </h2>
          <h3 className="text-4xl md:text-5xl font-black mb-6">
            {content.pq_subtitulo.texto}
          </h3>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            {content.pq_desc.texto}
          </p>
        </div>

        {/* Banner Secundario */}
        <div className="bg-card/30 max-w-5xl mx-auto border border-white/10 rounded-3xl p-8 mb-12 text-center backdrop-blur-sm">
          <h4 className="text-2xl md:text-3xl font-black italic">
            {content.pq_banner_title.texto}
          </h4>
          <p className="text-gray-400 mt-2">
            {content.pq_banner_desc.texto}
          </p>
        </div>

        {/* Grid de Opciones */}
        <div className="grid md:grid-cols-2 gap-8 md:px-12">
          
          {/* OPCIÓN A */}
          <div className="group relative bg-zinc-900/50 border border-white/5 p-8 rounded-3xl transition-all hover:border-lima/50">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{content.card_1.meta.icon}</span>
              <div>
                <h5 className="text-lima font-bold text-sm tracking-tighter uppercase">{content.card_1.meta.badge}</h5>
                <h4 className="text-2xl font-black italic uppercase">{content.card_1.meta.card_title}</h4>
                <p className="text-xs text-lima/70 font-mono">{content.card_1.meta.card_subtitle}</p>
              </div>
            </div>
            
            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="text-lima font-bold mt-1">→</span>
                {content.card_1.meta.list[0]}
              </li>
              <li className="flex gap-3">
                <span className="text-lima font-bold mt-1">→</span>
                {content.card_1.meta.list[1]}
              </li>
              <li className="flex gap-3">
                <span className="text-lima font-bold mt-1">→</span>
                {content.card_1.meta.list[2]}
              </li>
            </ul>
          </div>

          {/* OPCIÓN B */}
          <div className="group relative bg-zinc-900/50 border border-white/5 p-8 rounded-3xl transition-all hover:border-hoodie/50">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{content.card_2.meta.icon}</span>
              <div>
                <h5 className="text-hoodie font-bold text-sm tracking-tighter uppercase">{content.card_1.meta.badge}</h5>
                <h4 className="text-2xl font-black italic uppercase">{content.card_1.meta.card_title}</h4>
                <p className="text-xs text-hoodie/70 font-mono">{content.card_1.meta.card_subtitle}</p>
              </div>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-3">
                <span className="text-hoodie font-bold mt-1">→</span>
                {content.card_1.meta.list[0]}
              </li>
              <li className="flex gap-3">
                <span className="text-hoodie font-bold mt-1">→</span>
                {content.card_1.meta.list[1]}
              </li>
              <li className="flex gap-3">
                <span className="text-hoodie font-bold mt-1">→</span>
                {content.card_1.meta.list[2]}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};