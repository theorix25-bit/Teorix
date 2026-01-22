import Link from "next/link";
import teo from "@/assets/image-removebg-preview.png"
import { createClient } from "@/lib/supabase/server";
import { HeroContent } from "@/types/content";

export const  HeroSection = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
  .from('elementos_web')
  .select('*')
  .eq('seccion', 'hero')
  .order('orden', { ascending: true });
if(data == null) throw new Error("sin textos")
// Tip: Puedes transformar el array en un objeto llave-valor para que sea más fácil de usar:
const content = data.reduce((acc, item) => {
  acc[item.llave] = {
    texto: item.contenido,
    meta: item.metadata,
    tipo: item.tipo
  };
  return acc;
}, {} as HeroContent);

// console.log(content)
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mb-6">
      <div className="absolute top-20 left-10 text-6xl text-lima animate-spin-slow opacity-20">
        *
      </div>
      <div className="absolute top-40 right-2 md:right-20 text-8xl text-hoodie animate-spin-slow opacity-20">
        *
      </div>
      <div className="absolute bottom-32 left-5 text-8xl md:bottom-24 md:left-1/4 md:text-9xl text-lima animate-pulse-glow opacity-30">
        *
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center mb-0">
          <div className="relative top-0">
            <img src={teo.src} alt="" className="w-24 md:w-24" />
            <div className="absolute -inset-4 rounded-full blur-xl "></div>
          </div>
        </div>

          {/* id,sección, llave, tipo, contenido, metadata */}
        <h1 className="text-4xl md:text-5xl text-lima md:max-w-5xl mx-auto font-black mb-6 leading-tight">
          {content.hero_title.texto}
        </h1>

        <p className="text-lg md:text-xl  text-hoodie text-muted-foreground max-w-2xl mx-auto mb-5 font-medium">
            {content.hero_subtitle.texto}
        </p>
        <p className="text-lg md:text-xl text-white text-muted-foreground max-w-4xl mx-auto mb-5 font-medium">
          {content.hero_description.texto}
        </p>
        <p className="text-lg md:text-xl text-white text-muted-foreground max-w-4xl mx-auto mb-5 font-medium">
          {content.hero_instruction.texto}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <Link
            href={"/#modo"}
            className=" bg-lima/80 px-5 py-3 rounded-xl text-black font-bold transition-all hover:bg-lima hover:-translate-y-1"
          >
            {content.hero_main_button.texto}
          </Link>
        </div>
        <div className="flex justify-center gap-8 max-w-4xl mx-auto mt-6">
          <p className="text-sm">{content.hero_feature_1.texto}</p>
          <p className="text-sm">{content.hero_feature_2.texto}</p>
          <p className="text-sm">{content.hero_feature_3.texto}</p>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-lima/50">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-lima to-hoodie border-2 border-black"
              ></div>
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            {content.hero_testimony.texto} <span className="text-lima text-xl ml-2">✓</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
