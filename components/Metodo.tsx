import { createClient } from "@/lib/supabase/server";
import { Database, Brain, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function Metodo() {
  const supabase = await createClient();
  
  // 1. Traemos los datos de la sección 'metodo'
  const { data, error } = await supabase
    .from('elementos_web')
    .select('*')
    .eq('seccion', 'metodo')
    .order('orden', { ascending: true });

  if (error || !data || data.length === 0) return null;
  // 2. Transformación a objeto llave-valor
  const content = data.reduce((acc, item) => {
    acc[item.llave] = {
      texto: item.contenido,
      meta: item.metadata,
      tipo: item.tipo
    };
    return acc;
  }, {} as any);

  // Mapeo de iconos para las tarjetas dinámicas
  const iconos: Record<string, any> = {
    met_step_1: Database,
    met_step_2: Brain,
    met_step_3: ShieldCheck,
  };
  // Extraemos los pasos (cards) para iterar sobre ellos si lo deseas, 
  // o los llamamos directamente por su llave como hiciste antes.
  const pasosKeys = ['met_step_1', 'met_step_2', 'met_step_3'];

  return (
    <section className="max-w-7xl mx-auto p-6 mt-6 md:py-14 relative" id="metodo">
      {/* Efecto decorativo móvil */}
      <div className="absolute bottom-0 left-[20%] size-52 md:size-96 bg-lima/15 rounded-full blur-3xl md:hidden animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-10">
        
        {/* COLUMNA IZQUIERDA: Introducción e Imagen */}
        <div className="h-fit lg:sticky lg:top-4">
          <h2 className="text-4xl font-bold mb-4 text-lima text-center uppercase">
            {content.met_main_title?.texto || "FÓRMULA TEORIX*"}
          </h2>
          
          <div className="space-y-4">
            <p className="text-lg mt-3">
              {content.met_description?.texto}
            </p>
            {/* Si tienes un segundo párrafo en la DB, puedes llamarlo aquí o usar un fallback */}

          <div className="flex justify-center">
            <ul className=" max-w-3xl">
              {content.met_features_list.meta.items.map((item:any,i:number)=> <li key={i}>{item.icon} {item.text}</li>)}
            </ul>
          </div>
          </div>

          <img
            src={content.met_hero_image?.texto || "bg-2.jpg"}
            alt={content.met_hero_image?.meta?.alt || "Método Teorix"}
            className="rounded-xl h-80 w-11/12 object-cover mx-auto mt-10 shadow-2xl border border-white/5"
          />
        </div>

        {/* COLUMNA DERECHA: Pasos (Cards) */}
        <div className="space-y-8">
          {pasosKeys.map((key) => {
            const paso = content[key];
            const IconoComponent = iconos[key] || Database;
            if (!paso) return null;

            return (
              <div 
                key={key}
                className="p-6 rounded-xl shadow-inner border-lima/15 border shadow-lima md:w-[520px] mx-auto relative overflow-hidden"
              >
                {/* Glow interno */}
                <div className="absolute bottom-0 left-[20%] md:left-[40%] size-52 md:size-70 bg-lima/15 rounded-full blur-3xl animate-pulse"></div>

                <IconoComponent className="text-lima mx-auto mb-3 size-14 md:size-24" />
                
                <h3 className="text-xl md:text-3xl font-semibold text-center mb-2 uppercase">
                  {paso.texto}
                </h3>

                {/* Subtítulo desde metadata */}
                {paso.meta?.subtitle && (
                  <p className="text-center text-lima/80 text-sm mb-4 font-medium ">
                    {paso.meta.subtitle}
                  </p>
                )}

                {/* Lista de beneficios desde metadata.items */}
                <ul className=" ml-5  text-center space-y-2 text-sm md:text-base opacity-90">
                  {paso.meta?.items?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                {/* Footer text opcional (ej: "A las 3 AM también") */}
                {paso.meta?.footer_text && (
                  <p className="mt-4 text-center text-xs text-white/40 ">
                    {paso.meta.footer_text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTÓN DE ACCIÓN FINAL */}
      <div className="flex justify-center mt-10">
        <Link
          href={content.met_cta.meta.url}
          className="border px-4 py-3 text-md md:text-2xl text-lima border-lima rounded-xl hover:bg-lima hover:text-black transition-colors duration-200 font-bold"
        >
          {content.met_cta.texto}
        </Link> 
      </div>
    </section>
  );
}