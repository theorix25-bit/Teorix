import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
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
    .lte("fase", filtroBase);

  if (errorG) console.error(errorG);

  return false ? (
    <>
      <div className="  md:w-2/3  mx-auto px-8 py-10">
        <h1 className=" text-3xl my-3">
          Cómo Dominar el Examen Teórico con el Método 80/20
        </h1>
        <p className="mb-2">
          Este documento ha sido diseñado estratégicamente siguiendo el
          principio del 80/20 para maximizar tu eficiencia en la preparación del
          examen teórico de conducir. La premisa es sencilla: al dominar el 20%
          del contenido más relevante, serás capaz de responder correctamente al
          80% de las preguntas del examen
        </p>
        <p className="mb-2">
          Entendemos que el tiempo es valioso, por lo que hemos condensado la
          información crucial, omitiendo detalles de menor incidencia en las
          pruebas oficiales. Sigue este enfoque paso a paso para asegurar una
          preparación efectiva y un resultado exitoso.
        </p>
        <h2 className="text-2xl my-3">Enfoque en lo Esencial</h2>
        <p>
          Prioriza las secciones clave de este documento. No todo el contenido
          tiene el mismo peso en el examen. Céntrate en los temas recurrentes y
          de alta probabilidad
        </p>
        <h2 className="text-2xl my-3">Comprende los Conceptos Centrales</h2>
        <p>
          Más allá de la memorización, busca entender la lógica y el propósito
          detrás de cada norma, señal o situación de tráfico. Una comprensión
          profunda facilita la aplicación del conocimiento en diversas
          preguntas.
        </p>
        <h2 className="text-2xl my-3">Práctica Dirigida y Repetición</h2>
        <p className="mb-2">
          Utiliza este material como base para tus simulacros de examen.
          Identifica tus puntos débiles y revisa las secciones correspondientes
          en este documento hasta que te sientas completamente seguro. La
          repetición es clave para consolidar el aprendizaje.
        </p>
        <p>
          Al adoptar este método, no solo te prepararás para aprobar, sino que
          también desarrollarás una base sólida de conocimientos que te servirá
          en tu futura vida como conductor, haciendo el proceso de estudio más
          eficiente y menos abrumador.
        </p>
      </div>
    </>
  ) : (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative aspect-video  bg-gradient-to-br from-lima/10 via-accent/10 to-hoodie/10 rounded-xl border border-gray-50/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <ImageIcon className="w-24 h-24 text-muted-foreground/30" /> */}
              <Image src="/hero_bg.jpg" fill alt="Auto con carnet b" />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              <p>Carnet B</p>
            </h1>
            <p className="text-md md:text-xl text-muted-foreground leading-relaxed">
              Descripción completa sobre las clases del carnet b. Este curso te
              preparará para obtener tu licencia de conducir con todas las
              herramientas necesarias. Aprenderás teoría, práctica y consejos de
              expertos para aprobar tu examen a la primera.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-row justify-between gap-4">
            {/* <select
              name=""
              className="text-black"
              onChange={(e) => setSelectedFilter(e.target.value)}
              value={selectedFilter}
              id=""
            >
              <option value="todos">Todos</option>
              <option value="completados">Completados</option>
              <option value="pendientes">Pendientes</option>
              <option value="bloqueados">Bloqueados</option>
            </select> */}
          </div>

          <h3 className="text-2xl md:text-3xl text-foreground">Documentos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {gramma?.map((g) => (
              <Link
                href={{
                  pathname: `/clases/contenido/${g.slug}`,
                  query: {
                    titulo: g.titulo,
                  },
                }}
                key={g.id}
                className="border px-3 py-5 rounded-xl border-lima text-center text-lg flex justify-center items-center hover:bg-lima/15"
              >
                <p>{g.titulo}</p>
              </Link>
            ))}
          </div>

          <h3 className="text-2xl md:text-3xl text-foreground">Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos?.map((v) => (
              <Link
                href={{
                  pathname: `/clases/video/${v.slug}`,
                  query: {
                    titulo: v.titulo,
                  },
                }}
                key={v.id}
                className="border px-3 py-5 rounded-xl border-lima text-center text-lg flex justify-center items-center hover:bg-lima/15"
              >
                <p>{v.titulo}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
