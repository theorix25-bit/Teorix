import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PlanesComparacion } from "./PlanesComparacion";
import { redirect } from "next/navigation";
import { AdBanner } from "./ui/AdBanner";
import { LessonCard } from "./ui/LessonCard";
// import { AdBanner } from "./ui/AdBanner";
export default async function Lessons() {
  const supabase = await createClient();


  
  // Datos de sesión
  const { data: datos } = await supabase.auth.getClaims();
  const user = datos?.claims!;

  // Datos del usuario
  const { data: usuario } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("auth_id", user.sub)
    .maybeSingle();

  // Datos del plan
  const { data: plan, error } = await supabase
    .from("Planes_usuarios")
    .select("*")
    .eq("usuario_id", usuario.id)
    .maybeSingle();

  if(!plan.estado){
    redirect("/pagos/rechazado")
  }
  if (error) console.error(error);
  let filtroBase = plan.plan_id - 1;

  if (error) console.log(error);

  const { data: videos, error: errorV } = await supabase
    .from("videos")
    .select("*");
  if (errorV) console.error(errorV);
  const { data: gramma, error: errorG } = await supabase
    .from("gramma")
    .select("*")
    .order("fase", { ascending: true })
    .lte("fase", filtroBase);

  if (errorG) console.error(errorG);

  const {data:planes} = await supabase.from("Planes").select("*")
  const planActual = planes?.filter((p => p.id == plan.plan_id))[0]
  const planSuperior = planes?.filter((p => p.orden == ((planActual.orden + 1) == 2 ? planActual.orden + 2:planActual.orden + 1)))[0]

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-video  bg-gradient-to-br from-lima/10 via-accent/10 to-hoodie/10 rounded-xl border border-gray-50/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/hero_bg.jpg" fill alt="Auto con carnet b" />
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              <p>Carnet B</p>
            </h1>
            <p className="text-md md:text-xl text-muted-foreground leading-relaxed">
              Este curso te preparará para obtener tu licencia de conducir con
              todas las herramientas necesarias. Aprenderás teoría, práctica y
              consejos de expertos para aprobar tu examen a la primera.
            </p>
          </div>
        </div>
      
        <AdBanner height={150} width={900} data={{title: "Publicidad",image: "https://tse3.mm.bing.net/th/id/OIP.H5uLxJxRhB_dd_6jPkK-kgHaCU?pid=Api&P=0&h=180",url: "https://empresa2.com",}}/>
        <div className="space-y-6 mt-3">
          <h3 className="text-2xl md:text-3xl text-foreground">Documentos</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gramma?.map((g) => (
              <LessonCard
                key={g.id}
                href={`/clases/contenido/${g.slug}?titulo=${g.titulo}`}
                titulo={g.titulo}
                descripcion={g.descripcion}
                tipo="documento"
              />
                  ))}
              </div>
          <div className="space-y-6">

        <AdBanner height={150 } width={900} data={{title: "Publicidad",image: "https://tse3.mm.bing.net/th/id/OIP.H5uLxJxRhB_dd_6jPkK-kgHaCU?pid=Api&P=0&h=180",url: "https://empresa2.com",}}/>
            
</div>

          <h3 className="text-2xl md:text-3xl text-foreground">Videos</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {videos?.map((v) => (
    <LessonCard
      key={v.id}
      href={`/clases/video/${v.slug}?titulo=${v.titulo}`}
      titulo={v.titulo}
      descripcion={v.descripcion}
      tipo="video"
    />
  ))}
</div>
        </div>
        <PlanesComparacion planActual={planActual} planSuperior={planSuperior} />
      </main>
    </div>
  );
}
