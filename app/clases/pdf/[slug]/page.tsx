import { getUrlPrivate } from "@/lib/supabase/storage";

interface PageProps {
  params: { slug: string };
  searchParams: { path: string };
}
async function Pdf({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const path = query.path;
  const doc = await getUrlPrivate(path);

  return (
    <div>
      <h1 className="text-3xl text-white text-center mb-8">{slug}</h1>
      <div className="md:w-[90%] w-[95%] mx-auto rounded-xl">
      <embed src={doc} type="application/pdf" width="100%" height="800" />

      </div>
    </div>
  );
}

export default Pdf;
