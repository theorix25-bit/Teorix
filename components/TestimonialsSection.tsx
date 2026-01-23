import { createClient } from "@/lib/supabase/server";

export const TestimonialsSection = async () => {
const supabase = await createClient();
// Traemos solo los datos de esta sección
  const { data: rawContent } = await supabase
    .from("elementos_web")
    .select("*")
    .eq("seccion", "prueba_social");

  // Transformamos el array plano en un objeto estructurado
  const content = rawContent?.reduce((acc: any, item) => {
    acc[item.llave] = {
      texto: item.contenido,
      meta: item.metadata,
      tipo: item.tipo,
    };
    return acc;
  }, {}) || {};

  // Extraemos datos principales
  const titulo = content.titulo_principal?.texto 
  const highlight = content.titulo_principal?.meta?.highlight 
  const subtitulo = content.subtitulo?.texto 

  // Mapeamos los testimonios
  const testimonios = Object.keys(content)
    .filter((key) => key.startsWith("testimonio_"))
    .map((key) => ({
      name: content[key].meta?.nombre,
      age: content[key].meta?.edad,
      result: content[key].meta?.badge || "APTO ✅",
      text: content[key].texto,
      streak: content[key].meta?.footer_tag,
    }));  

  const achievement = content.achievement_unlocked;

  return (
    <section className="py-24 px-6 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 md:left-52 text-9xl text-lima">*</div>
        <div className="absolute bottom-3 md:bottom-24 right-10 text-7xl text-hoodie">X</div>
      </div>

      <div className="mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-baseline gap-3 mb-6">
          <h2 className="text-6xl text-lima ">{titulo}</h2>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            {highlight} 
          </h3>
          <p className="text-xl text-muted-foreground ">
            {subtitulo} <span className="text-lima">✓</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonios.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl p-8 border-2 border-lima/20 hover:border-hoodie/30 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon-glow)/0.2)] hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-lg font-bold">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.age} años</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-lima text-carbon text-sm font-black">
                  {testimonial.result}
                </div>
              </div>

              <blockquote className="text-foreground/90 leading-relaxed mb-4 italic">
                "{testimonial.text}"
              </blockquote>

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-xs font-bold text-hoodie uppercase tracking-wider">
                  {testimonial.streak}
                </span>
              </div>

              <div className="absolute top-4 right-4 text-6xl opacity-0 group-hover:opacity-10 transition-opacity text-lima">
                ✓
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted/50 border border-border">
            <span className="text-4xl">🎯</span>
            <div className="text-left">
              <p className="text-sm font-bold text-lima uppercase tracking-wider">{achievement.meta?.label}</p>
              <p className="text-foreground font-semibold">{achievement.texto}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};