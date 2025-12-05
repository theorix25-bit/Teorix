"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getDBCarnetB } from "@/lib/supabase";
import slugify from "slugify";
import { Button } from "./ui/button";

// Mock data - esto se reemplazará con datos de Supabase
// const lessonsByType: Record<string, any> = {
//   b: {
//     name: "Carnet B",
//     description: "Automóviles y furgonetas",
//     lessons: [
//       {
//         id: 1,
//         title: "Señales de Tráfico Fundamentales",
//         description:
//           "Aprende a identificar y comprender las señales básicas de tráfico",
//         duration: "15 min",
//         videoUrl: "https://www.youtube.com/watch?v=example1",
//         completed: true,
//         locked: false,
//       },
//       {
//         id: 2,
//         title: "Normas de Circulación Básicas",
//         description: "Reglas fundamentales para circular con seguridad",
//         duration: "20 min",
//         videoUrl: "https://www.youtube.com/watch?v=example2",
//         completed: true,
//         locked: false,
//       },
//       {
//         id: 3,
//         title: "Prioridades y Cruces",
//         description:
//           "Cómo determinar quién tiene prioridad en diferentes situaciones",
//         duration: "18 min",
//         videoUrl: "https://www.youtube.com/watch?v=example3",
//         completed: false,
//         locked: false,
//       },
//       {
//         id: 4,
//         title: "Estacionamiento y Parada",
//         description:
//           "Reglas para estacionar correctamente y situaciones prohibidas",
//         duration: "12 min",
//         videoUrl: "https://www.youtube.com/watch?v=example4",
//         completed: false,
//         locked: true,
//       },
//       {
//         id: 5,
//         title: "Conducción Nocturna y Condiciones Adversas",
//         description: "Técnicas para conducir de noche y con mal tiempo",
//         duration: "22 min",
//         videoUrl: "https://www.youtube.com/watch?v=example5",
//         completed: false,
//         locked: true,
//       },
//     ],
//   },
//   a: {
//     name: "Carnet A",
//     description: "Motocicletas sin limitaciones",
//     lessons: [
//       {
//         id: 1,
//         title: "Fundamentos de la Moto",
//         description: "Posición, equilibrio y controles básicos",
//         duration: "18 min",
//         videoUrl: "https://www.youtube.com/watch?v=example1",
//         completed: false,
//         locked: false,
//       },
//       {
//         id: 2,
//         title: "Equipamiento de Seguridad",
//         description: "Protección obligatoria y recomendada para motociclistas",
//         duration: "10 min",
//         videoUrl: "https://www.youtube.com/watch?v=example2",
//         completed: false,
//         locked: false,
//       },
//     ],
//   },
//   a2: {
//     name: "Carnet A2",
//     description: "Motocicletas hasta 35 kW",
//     lessons: [
//       {
//         id: 1,
//         title: "Iniciación a la Moto A2",
//         description: "Primeros pasos con motos de potencia limitada",
//         duration: "15 min",
//         videoUrl: "https://www.youtube.com/watch?v=example1",
//         completed: false,
//         locked: false,
//       },
//     ],
//   },
//   c: {
//     name: "Carnet C",
//     description: "Camiones de más de 3.500 kg",
//     lessons: [
//       {
//         id: 1,
//         title: "Características de Vehículos Pesados",
//         description: "Diferencias con automóviles y precauciones especiales",
//         duration: "25 min",
//         videoUrl: "https://www.youtube.com/watch?v=example1",
//         completed: false,
//         locked: false,
//       },
//     ],
//   },
//   d: {
//     name: "Carnet D",
//     description: "Autobuses y transporte de pasajeros",
//     lessons: [
//       {
//         id: 1,
//         title: "Transporte de Pasajeros",
//         description: "Normativa y responsabilidades del conductor de autobús",
//         duration: "20 min",
//         videoUrl: "https://www.youtube.com/watch?v=example1",
//         completed: false,
//         locked: false,
//       },
//     ],
//   },
// };

const Lessons = () => {
  const [temas, setTemas] = useState<Clases_b[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDBCarnetB<Clases_b>();
      setTemas(data);
    };
    fetchData();
  }, []);
  const navigate = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");
  
  if (!temas) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate.back()}
          className="mb-6 hover-lift"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          VOLVER
        </Button>

        {/* Hero Section - Two Column Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Placeholder */}
          <div className="relative aspect-video  bg-gradient-to-br from-lima/10 via-accent/10 to-hoodie/10 rounded-xl border border-gray-50/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-muted-foreground/30" />
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
            {temas
              // .filter((temas: Temas) => {
              //   if (selectedFilter === "todos") return true;
              //   if (selectedFilter === "completados") return temas.completed;
              //   if (selectedFilter === "pendientes")
              //     return !temas.completed && !temas.locked;
              //   if (selectedFilter === "bloqueados") return temas.locked;
              //   return true;
              // })
              .map((temas: any) => (
                <Card
                  key={temas.id}
                  className="group cursor-pointer hover-lift overflow-hidden bg-card border-transparent transition-all hover:border-lima/50"
                  onClick={() => {
                    // if (!temas.locked) {
                      navigate.push(`/clases/${slugify(temas.slug,{lower:true,strict:true})}/`);
                    // }
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-gradient-to-br from-lima/20 via-accent/20 to-hoodie/20 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground/40 group-hover:text-lima/60 transition-colors" />

                      {temas/* .completed */ && (
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
                      )}

                      {temas/* .locked */ && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
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
};

export default Lessons;
