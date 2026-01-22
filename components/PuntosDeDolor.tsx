import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function PuntosDeDolor() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('elementos_web')
    .select('*')
    .eq('seccion', 'puntos_dolor')
    .order('orden', { ascending: true });

  if (error || !data || data.length === 0) return null;

  // Transformación a objeto para acceso directo por llave
  const content = data.reduce((acc, item) => {
    acc[item.llave] = {
      texto: item.contenido,
      meta: item.metadata,
      tipo: item.tipo
    };
    return acc;
  }, {} as any);

  return (
  <section className="grid grid-cols-1 md:grid-cols-2 justify-center md:w-6/6 md:px-8 mb-6 md:mt-12 mx-auto relative">
        <div className="absolute bottom-0 right-[20%] size-52 md:size-96 bg-hoodie/15 md:right-0 rounded-full blur-3xl animate-pulse"></div>

        <div className="flex justify-center items-start mt-0 md:mt-14">
          <div className=" px-4">
            <h2 className=" text-4xl text-lima text-center mt-8">
              {content.pd_title?.texto.split()[0]}
            </h2>
            <p className="text-lg mt-8 text-center mb-2">
            {content.pd_intro?.texto}
            </p>
            <div className="max-w-md mx-auto mb-8 space-y-1">
            {content.pd_list?.meta?.items?.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-left">
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm font-medium text-white/90">{item.text}</p>
              </div>
            ))}
          </div>
            <div className="mt-4 flex gap-4 px-4 mb-6 justify-center">
              <Link
              href={content.pd_cta_button?.meta?.url || "#"}
              className="px-6 py-3 border rounded-md bg-lima text-black border-lima hover:bg-lima/95 transition-colors duration-100 font-bold text-center uppercase"
            >
              {content['pd_cta_button']?.texto}
            </Link>
              
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 left-5 text-8xl md:bottom-0 md:left-0 md:text-9xl text-lima  opacity-30">
          *
        </div>
        <div className="flex justify-center w-[85dvw] md:w-full mx-auto ">
          <img
            src={content.pd_comparison_image?.texto}
            alt={content.pd_comparison_image?.meta?.alt || ""}
            className="rounded-3xl object-cover z-10 "
          />
        </div>
      </section>
  );
}





