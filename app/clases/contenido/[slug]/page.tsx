import { createClient } from "@/lib/supabase/server";

interface pageProps {
  params: { slug: string };
  searchParams: { titulo: string };
}
async function Contenido({ params, searchParams }: pageProps) {
  const supabase = await createClient();
  const { slug } = await params;
  const query = await searchParams;
  const { data: video } = await supabase.from("gramma").select("*").eq("titulo", query.titulo).maybeSingle();
  return (
    <div>
      <h1 className="text-8xl text-white">{slug}</h1>
      <embed src={video.url} type="application/pdf" width="100%" height="800" />
    </div>
  );
}

export default Contenido;
