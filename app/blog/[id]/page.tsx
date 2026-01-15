import { getBlogBySlug } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Params {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: Params) {
  const { data } = await getBlogBySlug(params.slug);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-14">

        {/* Volver */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        {/* Artículo */}
        <article className="mx-auto max-w-3xl">

          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-lima">
              {data.title}
            </h1>

            {data.excerpt && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.excerpt}
              </p>
            )}
          </header>

          {/* Contenido */}
          <div
            className="
              prose
              prose-invert
              prose-lg
              max-w-none

              /* Headings */
              prose-headings:text-white
              prose-headings:font-semibold
              prose-h2:text-2xl
              prose-h3:text-xl
              prose-headings:scroll-mt-24

              /* Links */
              prose-a:text-lima
              prose-a:no-underline
              hover:prose-a:underline

              /* Strong / emphasis */
              prose-strong:text-lima

              /* Blockquotes */
              prose-blockquote:border-l-lima
              prose-blockquote:bg-lima/5
              prose-blockquote:text-zinc-300
              prose-blockquote:rounded-r-lg
              prose-blockquote:py-1

              /* Lists */
              prose-li:marker:text-lima

              /* Code */
              prose-code:text-lima
              prose-code:bg-zinc-900
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:rounded-md

              /* Images */
              prose-img:rounded-xl
              prose-img:border
              prose-img:border-border/50
              prose-img:shadow-lg
            "
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </article>
      </main>
    </div>
  );
}
