"use client"
import { ArrowLeft, ImageIcon, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { BlogsDB } from "@/types/blog";
import Image from "next/image";

interface PagePros {
  blog:BlogsDB
  category:any[]
}
export default function BlogDetail({blog,category}:PagePros) {
  const router = useRouter(); 
  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Back Button con Shadcn */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="rounded-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Volver
          </Button>

          <div className="space-y-4">
            <Badge variant="secondary" className="tracking-widest font-bold capitalize">
              {blog.category}
            </Badge>
            <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar size={14} />
              <span>
                {new Date(blog.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Main Image con Aspect Ratio */}
          <div className="overflow-hidden rounded-2xl bg-muted border border-lima/30 shadow-md shadow-lima/40">
            <AspectRatio ratio={21 / 9}>
              {blog.image_url ? (
                <Image
                  src={blog.image_url} 
                  alt={blog.title} 
                  fill
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-secondary">
                  <ImageIcon size={60} className="text-muted-foreground/40" />
                </div>
              )}
            </AspectRatio>
          </div>

          <article 
            className="prose
    prose-invert
    max-w-none

    /* BASE */
    prose-p:text-base
    prose-p:leading-7
    prose-p:text-zinc-300
    prose-p:my-4

    /* HEADINGS */
    prose-h1:text-4xl
    prose-h1:font-bold
    prose-h1:tracking-tight
    prose-h1:mb-6
    prose-h1:mt-10
    prose-h1:text-white

    prose-h2:text-3xl
    prose-h2:font-semibold
    prose-h2:tracking-tight
    prose-h2:mt-12
    prose-h2:mb-4
    prose-h2:text-white

    prose-h3:text-2xl
    prose-h3:font-semibold
    prose-h3:mt-10
    prose-h3:mb-3
    prose-h3:text-white

    prose-h4:text-xl
    prose-h4:font-medium
    prose-h4:mt-8
    prose-h4:mb-2
    prose-h4:text-zinc-200

    prose-headings:scroll-mt-24

    /* LINKS */
    prose-a:text-lima
    prose-a:font-medium
    prose-a:no-underline
    hover:prose-a:underline

    /* STRONG / EMPHASIS */
    prose-strong:text-lima
    prose-strong:font-semibold

    /* LISTS */
    prose-ul:my-6
    prose-ol:my-6
    prose-li:my-2
    prose-li:text-zinc-300
    prose-li:leading-7
    prose-li:marker:text-lima

    /* BLOCKQUOTE */
    prose-blockquote:border-l-4
    prose-blockquote:border-lima
    prose-blockquote:bg-lima/5
    prose-blockquote:px-6
    prose-blockquote:py-3
    prose-blockquote:rounded-r-xl
    prose-blockquote:text-zinc-300
    prose-blockquote:font-normal

    /* INLINE CODE */
    prose-code:text-lima
    prose-code:bg-zinc-900
    prose-code:rounded-md
    prose-code:px-1.5
    prose-code:py-0.5
    prose-code:text-sm

    /* CODE BLOCKS */
    prose-pre:bg-zinc-900
    prose-pre:border
    prose-pre:border-border/60
    prose-pre:rounded-xl
    prose-pre:p-5
    prose-pre:overflow-x-auto
    prose-pre:text-sm

    /* IMAGES */
    prose-img:rounded-xl
    prose-img:shadow-lg
    prose-img:border
    prose-img:border-border/60
    prose-img:my-8
  "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Sidebar Related (Desktop) */}
        <aside className="hidden lg:block w-80 space-y-6">
          <h2 className="font-bold text-xl border-b pb-2">Relacionados</h2>
          <div className="space-y-6">
            {category.map((item) => (
              <RelatedCard key={item.id} post={item} />
            ))}
          </div>
        </aside>
      </div>

      {/* Related (Mobile) */}
      <div className="lg:hidden mt-12 space-y-4">
        <h2 className="font-bold text-xl border-b pb-2">Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {category.map((item) => (
            <RelatedCard key={item.id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ post }: { post: BlogsDB }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="overflow-hidden bg-transparent group-hover:bg-muted/50 transition-colors rounded-xl border-lima shadow-lima ">
        <div className="space-y-3">
          <div className="w-full h-32 bg-muted rounded-lg overflow-hidden relative">
            {post.image_url ? (
              <Image src={post.image_url} fill className="object-cover w-full h-full" alt={post.title} />
            ) : (
              <div className="flex items-center justify-center h-full"><ImageIcon className="text-muted-foreground/20" /></div>
            )}
          </div>
          <div className="space-y-1 px-2 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {post.category}
            </span>
            <p className="font-bold leading-snug text-sm line-clamp-2 group-hover:underline">
              {post.title}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {/* {post.created_at.split(' ')[0]} */}
              <span>
                {new Date(post.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                </span>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}