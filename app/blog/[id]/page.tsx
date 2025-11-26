import { getBlogBySlug } from "@/lib/blog";

interface Params {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: Params) {
  const { data } = await getBlogBySlug(params.slug);

  return (
    <article className="prose max-w-2xl mx-auto py-8">
      <h1>{data.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </article>
  );
}
