"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Volume2,
  Maximize,
  ChevronDown,
  MessageCircle,
  Menu,
} from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Switch } from "@/components/ui/switch";
import { useParams, useRouter } from "next/navigation";
// import { Switch } from "@radix-ui/react-switch";
import { Base, Tema, useCarnetB } from "@/hooks/useCarnetB";
import SubTemaSkeleton from "@/components/skeleton/SubTemaSkeleton";
import VimeoPlayer from "@/components/VimeoPlayer";

const dataSubtemaDetail = () => {
  const { subtema: slug, temas } = useParams<{
    subtema: string;
    temas: string;
  }>();
  const contenido = useCarnetB((s) => s.contenidoCarnetB);
  const [tema, setTema] = useState<Base | undefined>();
  const fetchDAtaContent = useCarnetB((s) => s.fetchDataContent);
  const navigate = useRouter();
  const [documentExpanded, setDocumentExpanded] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");

  useEffect(() => {
    fetchDAtaContent();
  }, [fetchDAtaContent]);

  useEffect(() => {
    if (!contenido) return;
    const filtroTema = contenido.filter((c) => c.slug == slug);
    setTema(filtroTema[0]);
  }, [contenido, slug, temas]);

  if (!true) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="font-display text-3xl text-foreground">
            Subtema no encontrado
          </h2>
          <Button onClick={() => navigate.back()}>Volver al tema</Button>
        </div>
      </div>
    );
  }

  return tema ? (
    <div className="min-h-screen bg-background text-foreground md:px-32">
      <div className="flex">
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 md:py-10">
          <Button
            variant="outline"
            onClick={() => navigate.back()}
            className="mb-6 hover-lift hidden lg:flex"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            VOLVER
          </Button>

          <div className="mb-8 ">
            <div className="">
              {/* <img src={tema.imagen} className="cover" alt={tema.titulo} /> */}
              <VimeoPlayer nombre={tema.video} />

              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-lima/90 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                  <Play
                    className="w-10 h-10 text-lima-foreground ml-1"
                    fill="currentColor"
                  />
                </div>
              </div> */}

              {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
          <h1 className="text-3xl mb-3">{tema.titulo}</h1>
          <div className="mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-2xl text-foreground">
                      Documento
                    </h2>
                    {/* <Switch
                      checked={documentExpanded}
                      onCheckedChange={setDocumentExpanded}
                    /> */}
                  </div>
                </div>

                {documentExpanded && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      Contenido del documento con información detallada sobre el
                      subtema. Aquí se mostrará todo el material de estudio,
                      referencias y recursos adicionales.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-3xl text-foreground">
              Preguntas rápidas
            </h2>

            <div className="space-y-3">
              {/* {dataSubtema.preguntas.map((question: any, index: number) => (
                <Card
                  key={question.id}
                  className="bg-card border-border hover:border-lima/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-sm font-mono text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-foreground font-medium">
                          {question.question}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4"
                          >
                            <span className="mr-2">Sí</span>
                            <span className="text-xs text-muted-foreground">
                              {question.yesCount}
                            </span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-4"
                          >
                            <span className="mr-2">No</span>
                            <span className="text-xs text-muted-foreground">
                              {question.noCount}
                            </span>
                          </Button>
                        </div>

                        <Button size="icon" variant="ghost" className="h-9 w-9">
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </div>

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => console.log("Anterior")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <Button
              onClick={() => console.log("Siguiente")}
              className="bg-lima text-black"
            >
              Siguiente
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <SubTemaSkeleton />
  );
};

export default dataSubtemaDetail;
