import Link from "next/link";
import { Card, CardContent } from "./card";
import { BlogsDB } from "@/types/blog";
import Image from "next/image";

interface PageProps {
  blog: BlogsDB;
}
export default function BlogCard({ blog }: PageProps) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group">
      <Card className="
        h-full 
        overflow-hidden 
        bg-background/80 
        transition-all 
        hover:-translate-y-1 
        border border-lima/20
        hover:shadow-lg 
        hover:shadow-lima/40
        shadow-md shadow-lima/30
      ">
        {/* Imagen */}
        <div className="relative h-44 overflow-hidden">
        <Image
        src={blog.image_url}
        fill
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 400px"
        alt={blog.title}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
        />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>

        {/* Contenido */}
        <CardContent className="p-4 space-y-2">
          <h3 className="
            font-semibold 
            leading-snug 
            text-sm lg:text-base 
            text-foreground
            line-clamp-2
          ">
            {blog.title}
          </h3>

          <span className="text-xs text-muted-foreground">
                {new Date(blog.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
          </span>
          
        </CardContent>
      </Card>
    </Link>
  );
}
