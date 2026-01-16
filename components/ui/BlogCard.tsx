import { BlogsDTO } from "@/lib/domain/dto/blogs.dto";
import { Badge } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./card";
import { BlogsDB } from "@/types/blog";

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
        border border-border 
        transition-all 
        hover:-translate-y-1 
        hover:shadow-lg
      ">
        {/* Imagen */}
        <div className="relative h-28 sm:h-32 lg:h-40 overflow-hidden">
          <img
            src={`${blog.image_url}`}
            alt={blog.title}
            className="
              h-full w-full object-cover 
              transition-transform duration-300 
              group-hover:scale-105
            "
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
