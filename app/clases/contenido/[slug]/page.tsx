import { AdBanner } from "@/components/ui/AdBanner";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface pageProps {
  params: { slug: string };
  searchParams: { titulo: string };
}

async function Contenido({ params, searchParams }: pageProps) {
  const supabase = await createClient();
  const query = await searchParams;

  const { data: gamma } = await supabase
    .from("gramma")
    .select("*")
    .eq("titulo", query.titulo)
    .maybeSingle()

    if (!gamma) return null;
    if(!gamma.orden) return null
      const { data: siguienteTema } = await supabase
      .from("gramma")
      .select("slug, titulo")
      .eq("orden", (gamma.orden + 1))
      .maybeSingle()
    
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <Link
            href="/clases"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a clases
          </Link>

          <h1 className="text-3xl md:text-4xl font-semibold text-center">
            {gamma.titulo}
          </h1>
        </div>

        {/* Publicidad superior */}
        <AdBanner
          height={120}
          width={900}
          data={{
            title: "Publicidad",
            image:
              "https://tse3.mm.bing.net/th/id/OIP.H5uLxJxRhB_dd_6jPkK-kgHaCU?pid=Api&P=0&h=180",
            url: "https://empresa2.com",
          }}
        />

        {/* Contenido */}
        <Card className="overflow-hidden border-border/60">
          <CardContent className="p-0">
            <div className="relative w-full h-[70vh] min-h-[500px] md:h-auto md:aspect-video">
              <iframe
                src={gamma.url}
                allow="fullscreen; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-popups"
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Info extra / UX */}
        {gamma.descripcion && (
          <Card>
            <CardContent className="py-4">
              <p className="text-muted-foreground leading-relaxed">
                {gamma.descripcion}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Publicidad inferior */}
        <AdBanner
          height={120}
          width={900}
          data={{
            title: "Publicidad",
            image:
              "https://tse3.mm.bing.net/th/id/OIP.H5uLxJxRhB_dd_6jPkK-kgHaCU?pid=Api&P=0&h=180",
            url: "https://empresa2.com",
          }}
        />
        {siguienteTema && (
  <div className="mt-8">
    <Card className="border-lima/40 bg-lima/5 mx-8 md:mx-14">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Siguiente tema
          </p>
          <h3 className="text-lg font-semibold">
            {siguienteTema.titulo}
          </h3>
        </div>

        <Link
          href={`/clases/contenido/${siguienteTema.slug}?titulo=${siguienteTema.titulo}`}
          className="w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-xl bg-lima text-black hover:bg-lima/90"
          >
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
)}

      </main>
    </div>
  );
}

export default Contenido;
