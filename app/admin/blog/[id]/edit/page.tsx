"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Editor from "@/components/editor";
import { getBlogById, updateBlog } from "@/lib/blog";
import slugify from "slugify";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("")
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Cargar datos del blog al iniciar
  useEffect(() => {
    async function fetchBlog() {
      const blog = await getBlogById(id);
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
      }
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  async function saveChanges() {
    await updateBlog(id, {
      title,
      slug: slugify(title, { lower: true }),
      content, 
      category
    });

    router.push("/admin/blog");
  }

  if (loading) return <p className="p-4">Cargando datos...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Editar Blog</h1>

      <input
        type="text"
        className="border p-2 w-full my-3"
        placeholder="Título del blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 w-full my-3"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Editor content={content} onChange={setContent} />

      <button
        onClick={saveChanges}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Guardar Cambios
      </button>
    </div>
  );
}
