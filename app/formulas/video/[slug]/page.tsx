import { searchVideo } from "@/lib/Vimeo";
import { AdBanner } from "@/components/ui/AdBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Videos({ searchParams }: PageProps) {
  const query = await searchParams
  const titulo = await query.titulo as string;

  const video = await searchVideo(titulo);
  const url = video?.[0]?.player_embed_url;

  if (!url) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <Link
            href="/formulas"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a fórmulas
          </Link>

          <div className="flex items-center justify-center gap-2">
            <PlayCircle className="h-6 w-6 text-lima" />
            <h1 className="text-2xl md:text-4xl font-semibold text-center text-white capitalize">
              {titulo}
            </h1>
          </div>
        </div>

        {/* Publicidad superior */}
        <AdBanner
          height={120}
          width={600}
          data={{
            title: "Publicidad",
            image:
              "https://tse3.mm.bing.net/th/id/OIP.H5uLxJxRhB_dd_6jPkK-kgHaCU?pid=Api&P=0&h=180",
            url: "https://empresa2.com",
          }}
        />

        {/* Video */}
        <Card className="overflow-hidden border-border/60 border-none">
          <CardContent className="p-0">
            <div
              className="
                relative w-full
                h-[30vh]  min-h-[230px] md:min-h-[400px]
                md:h-[50vh] md:aspect-video
              "
            > 
              <iframe
                src={url}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full md:w-[90%] h-[230px] md:h-full mx-auto"
              />
            </div>
          </CardContent>
        </Card>

        {/* CTA continuar */}
        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            className="
              w-full sm:w-auto
              flex items-center gap-3
              rounded-2xl px-8 py-6
              bg-lima text-black
              hover:bg-lima/90
              shadow-lg hover:shadow-xl
            "
          >
            Siguiente video
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Publicidad inferior */}
        <AdBanner
          height={120}
          width={600}
          data={{
            title: "Publicidad",
            image:
              "https://tse3.mm.bing.net/th/id/OIP.H5uLxJxRhB_dd_6jPkK-kgHaCU?pid=Api&P=0&h=180",
            url: "https://empresa2.com",
          }}
        />
      </main>
    </div>
  );
}
