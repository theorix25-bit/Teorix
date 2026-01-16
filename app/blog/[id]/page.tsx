// app/blog/[id]/page.tsx

import { getBlogByCategory, getBlogBySlug, /* getAllSlugs */ } from "@/lib/blog";
import BlogDetail from "@/components/ui/BlogDetail";
import type { Metadata, ResolvingMetadata } from "next";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { BlogsDTO } from "@/lib/domain/dto/blogs.dto";



interface BlogPageParams {
  params: {
    id: string;
  };
}
export async function generateMetadata(
  { params }: BlogPageParams,
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const result = await params;

  const { data: post } = await getBlogBySlug(result.id);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "Este artículo no existe.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: post.meta_title ?? "",
    description: post.meta_description ?? "",
    alternates: {
      canonical: `https://teorix.es/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title ?? "",
      description: post.meta_description ?? "",
      url: `https://teorix.es/blog/${post.slug}`,
      type: "article",
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
  };
}
interface Params {
  params: {
    id: string;
  };
}
export default async function BlogPage({ params }:Params) {
  const result  = await params;
  
  const { data: blog } = await getBlogBySlug(result.id);
  const { data: categorys } = await getBlogByCategory(blog.category);

  return <BlogDetail blog={blog} category={categorys} />;
}
