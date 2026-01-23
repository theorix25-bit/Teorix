import teoxImage from "@/assets/teo.png"; // Asume que tienes una imagen de Teox aquí.
import { createClient } from "@/lib/supabase/server";
import Image from 'next/image';

export default async function WhoIsTeoxSection(){
  const supabase = await createClient();
  const { data: rawContent } = await supabase
    .from("elementos_web")
    .select("*")
    .eq("seccion", "who_is_teox");

  const content = rawContent?.reduce((acc: any, item) => {
    acc[item.llave] = { texto: item.contenido, meta: item.metadata };
    return acc;
  }, {}) || {};

  const features = Object.keys(content)
    .filter(key => key.startsWith('teox_feat_'))
    .map(key => ({
      titulo: content[key].meta?.title,
      desc: content[key].texto,
      icon: content[key].meta?.icon
    }));
  return (
    <section className="relative py-10 text-white overflow-hidden">
      <div className="container mx-auto md:px-20 relative z-10 ">
        <div className="grid md:grid-cols-2 gap-0 items-center">
          <div className="text-left">
            <h2 className="text-lima font-bold tracking-widest uppercase mb-2">
              {content.tagline?.texto}
            </h2>
            <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              {content.titulo_grande?.texto}
            </h3>

            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
              {content.historia_1?.meta?.resaltado} <br /> {content.historia_1?.texto}
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {content.historia_2?.texto}
            </p>
          </div>
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md h-[300px] mb-0 md:mb-0">
              <Image
                src={content.imagen_teox?.texto}
                alt={content.imagen_teox?.meta?.alt}
                layout="fill"
                objectFit="contain"
                className="drop-shadow-lg animate-float-bob " 
              />
            </div>
            <div className="bg-card/30 border border-lima/20 p-6 rounded-2xl w-full max-w-md shadow-xl backdrop-blur-sm mt-2">
              <ul className="space-y-5">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <span className="text-3xl filter group-hover:grayscale-0 transition-all">
                      {f.icon}
                    </span>
                    <div>
                      <strong className="text-white text-lg block font-bold mb-1 group-hover:text-lima transition-colors">
                        {f.titulo}
                      </strong>
                      <p className=" text-sm leading-snug">
                        {f.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};