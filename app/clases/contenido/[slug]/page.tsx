import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface pageProps {
  params: { slug: string };
  searchParams: { titulo: string };
}
async function Contenido({ params, searchParams }: pageProps) {
  const supabase = await createClient();
  const { slug } = await params;
  const query = await searchParams;
  const { data: gamma } = await supabase
    .from("gramma")
    .select("*")
    .eq("titulo", query.titulo)
    .maybeSingle();
  return (
    gamma && (
      <div>
        <h1 className="text-3xl text-white text-center mb-4 px-4 mt-4">
          {gamma.titulo}
        </h1>
        <div>
          <div className="text-center">
            <Link href={"/clases"} className="border px-3 py-2 rounded-lg ">
              volver
            </Link>
          </div>
          <embed
            src={gamma.url}
            className="mx-auto w-[100%] px-3 lg:w-[67%]  h-[600px] mt-3"
            type="application/pdf"
          />
        </div>
      </div>
    )
  );
}

export default Contenido;
