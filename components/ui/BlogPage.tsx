"use client"
import { BlogsDB } from "@/types/blog";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BlogCard from "./BlogCard";

interface PageProps {
  blogs: BlogsDB[];
}

export default function BlogPage({ blogs }: PageProps) {
  const router = useRouter();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 lg:px-10 lg:py-14 space-y-8">
      {/* Header */}
      <header className="
  relative overflow-hidden rounded-2xl border border-border
  bg-gradient-to-br from-lima/15 via-accent/10 to-background
  p-6 lg:p-10 space-y-4
">
  <div className="relative z-10 space-y-3">
    <h1 className="
      text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground
    ">
      Blog de conducción
    </h1>

    <p className="
      max-w-3xl text-sm lg:text-lg text-muted-foreground leading-relaxed
    ">
      Guías prácticas, consejos reales y contenido premium para ayudarte a
      <span className="text-lima font-semibold"> aprobar el Carnet B </span>
      y convertirte en un conductor seguro desde el primer día.
    </p>
  </div>

  {/* Glow decorativo */}
  <div className="
    absolute -top-24 -right-24 h-72 w-72 rounded-full
    bg-lima/20 blur-3xl
  " />
</header>

      {/* Grid de Artículos */}
      <div
        className="
          grid gap-4 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          lg:gap-8
        "
      >
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={blog} />
        ))}
      </div>
    </section>
  );
}
