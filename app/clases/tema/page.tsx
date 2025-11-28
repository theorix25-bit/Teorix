"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image as ImageIcon, Menu, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useParams, useRouter } from "next/navigation";

// Mock data - esto se reemplazará con datos de Supabase
const topicsByType: Record<string, any> = {
  b: {
    name: "Carnet B",
    topics: [
      {
        id: 1,
        title: "Tema 1",
        description:
          "Descripción completa Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        progress: 50,
        currentQuestion: 1,
        totalQuestions: 10,
        subTopics: [
          {
            id: 1,
            title: "Señales de Tráfico Fundamentales",
            description:
              "Aprende a identificar y comprender las señales básicas de tráfico",
            duration: "15 min",
            videoUrl: "https://www.youtube.com/watch?v=example1",
            completed: true,
            locked: false,
          },
          {
            id: 2,
            title: "Normas de Circulación Básicas",
            description: "Reglas fundamentales para circular con seguridad",
            duration: "20 min",
            videoUrl: "https://www.youtube.com/watch?v=example2",
            completed: true,
            locked: false,
          },
          {
            id: 3,
            title: "Prioridades y Cruces",
            description:
              "Cómo determinar quién tiene prioridad en diferentes situaciones",
            duration: "18 min",
            videoUrl: "https://www.youtube.com/watch?v=example3",
            completed: false,
            locked: false,
          },
          {
            id: 4,
            title: "Estacionamiento y Parada",
            description:
              "Reglas para estacionar correctamente y situaciones prohibidas",
            duration: "12 min",
            videoUrl: "https://www.youtube.com/watch?v=example4",
            completed: false,
            locked: true,
          },
          {
            id: 5,
            title: "Conducción Nocturna y Condiciones Adversas",
            description: "Técnicas para conducir de noche y con mal tiempo",
            duration: "22 min",
            videoUrl: "https://www.youtube.com/watch?v=example5",
            completed: false,
            locked: true,
          },
        ],
      },
      {
        id: 2,
        title: "Tema 2",
        description: "Descripción del tema 2",
        progress: 30,
        currentQuestion: 1,
        totalQuestions: 10,
        subTopics: [],
      },
      {
        id: 3,
        title: "Tema 3",
        description: "Descripción del tema 3",
        progress: 0,
        currentQuestion: 1,
        totalQuestions: 10,
        subTopics: [],
      },
    ],
  },
};

const topicDetail = () => {
  // const { type, topicId } = useParams<{ type: string; topicId: string }>();
  const type = "b";
  const topicId = 1;
  const navigate = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const licenseData = type ? topicsByType[type] : null;
  const currenttopic = licenseData?.topics.find(
    (l: any) => l.id === Number(topicId)
  );

  if (!licenseData || !currenttopic) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="font-display text-3xl text-foreground">
            Tema no encontrado
          </h2>
          <Button onClick={() => navigate.back()}>
            Volver a temas
          </Button>
        </div>
      </div>
    );
  }

  // const SidebarContent = () => (
  //   <div className="space-y-6 p-6">
  //     {/* Back Button for Mobile */}
  //     <Button
  //       variant="ghost"
  //       onClick={() => navigate.push(`/topics/${type}`)}
  //       className="lg:hidden mb-4"
  //     >
  //       <ArrowLeft className="w-4 h-4 mr-2" />
  //       Volver
  //     </Button>

  //     {/* Current topic Info */}
  //     <div className="space-y-4">
  //       <div className="relative aspect-video bg-gradient-to-br from-lima/20 via-accent/20 to-hoodie/20 rounded-lg flex items-center justify-center border border-border/50">
  //         <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
  //       </div>
  //       <p className="text-sm text-muted-foreground leading-relaxed">
  //         {currenttopic.description}
  //       </p>
  //     </div>

  //     {/* Sub Topics Navigation */}
  //     <div className="space-y-3">
  //       <div className="flex items-center justify-between">
  //         <h3 className="font-display text-lg text-foreground">Temas</h3>
  //         <select
  //           name=""
  //           className="text-black"
  //           onChange={(e) => setSelectedFilter(e.target.value)}
  //           value={selectedFilter}
  //           id=""
  //         >
  //           <option value="todos">Todos</option>
  //           <option value="completados">Completados</option>
  //           <option value="pendientes">Pendientes</option>
  //           <option value="bloqueados">Bloqueados</option>
  //         </select>
  //       </div>

  //       {/* Sub Topics List */}
  //       <div className="space-y-2">
  //         {licenseData.topics.map((topic: any, index: number) => (
  //           <div key={topic.id}>
  //             {index > 0 && (
  //               <div className="my-4">
  //                 <p className="text-xs font-mono text-muted-foreground mb-2">
  //                   Sub tema {index}
  //                 </p>
  //               </div>
  //             )}
  //             <Button
  //               variant={topic.id === currenttopic.id ? "hoodie" : "ghost"}
  //               className="w-full justify-start text-left h-auto py-3 px-4"
  //               onClick={() => {
  //                 navigate.push(`/topics/${type}/${topic.id}`);
  //                 setIsSidebarOpen(false);
  //               }}
  //             >
  //               <div className="flex items-center gap-3 w-full">
  //                 <div className="w-12 h-12 rounded bg-muted/50 flex-shrink-0 flex items-center justify-center">
  //                   <ImageIcon className="w-6 h-6 text-muted-foreground" />
  //                 </div>
  //                 <span className="font-medium text-sm">{topic.title}</span>
  //               </div>
  //             </Button>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Siguiente Link */}
  //       <Button
  //         variant="link"
  //         className="w-full justify-end text-sm text-lima"
  //         onClick={() => console.log("Siguiente")}
  //       >
  //         Siguiente →
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 md:py-10">
          {/* Back Button - Desktop */}
          <Button
            variant="outline"
            onClick={() => navigate.push(`/topics/${type}`)}
            className="mb-6 hover-lift hidden lg:flex"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            VOLVER
          </Button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Video/Image Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-lima/10 via-accent/10 to-hoodie/10 rounded-xl border border-gray-50/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-24 h-24 text-muted-foreground/30" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
                {currenttopic.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {currenttopic.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Pregunta {currenttopic.currentQuestion}
                  </span>
                  <span className="text-lima font-medium">
                    {currenttopic.progress}%
                  </span>
                </div>
                <Progress value={currenttopic.progress} className="h-2" />
              </div>
            </div>
          </div>

          {/* Sub Topics Section */}
          <div className="space-y-6">
            {/* Section Header with Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

            {/* Sub Topics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {currenttopic.subTopics
                .filter((subTopics: any) => {
                  if (selectedFilter === "todos") return true;
                  if (selectedFilter === "completados") return subTopics.completed;
                  if (selectedFilter === "pendientes")
                    return !subTopics.completed && !subTopics.locked;
                  if (selectedFilter === "bloqueados") return subTopics.locked;
                  return true;
                })
                .map((topic: any) => (
                  <Card
                    key={topic.id}
                    className="group cursor-pointer hover-lift overflow-hidden bg-card border-transparent transition-all hover:border-lima/50"
                    onClick={() => {
                      if (!topic.locked) {
                        // navigate.push(`/tema/${type}/${topic.id}`);
                        navigate.push(`/clases/tema/subtema`);
                      }
                    }}
                  >
                    <CardContent className="p-0">
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gradient-to-br from-lima/20 via-accent/20 to-hoodie/20 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/40 group-hover:text-lima/60 transition-colors" />

                        {/* Status Badge */}
                        {topic.completed && (
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

                        {topic.locked && (
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

                      {/* Title */}
                      <div className="p-4">
                        <h3 className="font-display text-lg text-foreground group-hover:text-lima transition-colors">
                          {topic.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Siguiente Button */}
            <div className="flex justify-end pt-4">
              <Button
                variant="link"
                className="text-lima font-medium"
                onClick={() => console.log("Ver siguiente")}
              >
                Siguiente →
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default topicDetail;
