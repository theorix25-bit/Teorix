"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import Image from "next/image";
import { useCarnetB } from "@/hooks/useCarnetB";

export default function Lessons() {
  const [state, setState] = useState(false);
  const {
    loading,
    progresoUsuario: contenido,
    fetchDataContent,
  } = useCarnetB();

  useEffect(() => {
    fetchDataContent();
    console.log(contenido)
  }, [loading]);

  const navigate = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");

  if (!contenido) return null;

  return state ? (
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

        {/* Temas Section */}
        <div className="space-y-6">
          {/* Section Header with Filter */}
          <div className="flex flex-row justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Temas
            </h2>

            <select
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
            </select>
          </div>

          {/* Temas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contenido
              .filter((temas: any) => {
                if (selectedFilter === "todos") return true;
                if (selectedFilter === "completados")
                  return temas.progreso?.completado;
                if (selectedFilter === "pendientes")
                  return !temas.completed && !temas.locked;
                if (selectedFilter === "bloqueados")
                  return temas.progreso?.bloqueado;
                return true;
              })
              .map((temas) => (
                <Card
                  key={temas.id}
                  className="group cursor-pointer hover-lift overflow-hidden bg-card border-transparent transition-all hover:border-lima/50"
                  onClick={() => {
                    if (!temas.progreso?.bloqueado) {
                      navigate.push(
                        `/clases/${slugify(temas.slug, {
                          lower: true,
                          strict: true,
                        })}/`
                      );
                    }
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-gradient-to-br from-lima/20 via-accent/20 to-hoodie/20 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground/40 group-hover:text-lima/60 transition-colors" />
                      {/* <Image > */}
                      <img src={temas.imagen} alt={temas.titulo}></img>
                      {temas.progreso?.completado ? (
                        <div className="absolute top-2 right-2 bg-lima text-lima-foreground rounded-full p-1.5">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className={`absolute inset-0 bg-background/80 ${temas.progreso.bloqueado && "backdrop-blur-sm"}  flex items-center justify-center`}>
                          <svg
                            className="w-8 h-8 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-display text-lg text-foreground group-hover:text-lima transition-colors">
                        {temas.titulo}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
