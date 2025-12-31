import { searchVideo } from "@/lib/Vimeo";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Videos({ params, searchParams }: PageProps) {
  // const { slug } = await params;
  const query = await searchParams;

  const titulo = query.titulo;

  const video = await searchVideo(titulo);
  const url = video[0].player_embed_url;

  return (
    <div>
      <h1 className="text-3xl text-white text-center">{titulo}</h1>
      <iframe
        src={url}
        width="100%"
        height="800"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
