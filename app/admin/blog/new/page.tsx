"use client";

import { useState } from "react";
import slugify from "slugify";
import { createBlog } from "@/lib/blog";
import { useRouter } from "next/navigation";
import EditorBlog from "@/components/editor";

export default function NewBlogPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  async function saveBlog() {
    await createBlog({
      title,
      slug: slugify(title, { lower: true }),
      content, 
    });

    router.push("/admin/blog");
  }

  return (
    <div className="p-4 container">
      <h1 className="text-xl font-bold">Nuevo Blog</h1>

      <input
        type="text"
        className="border p-2 w-full my-3"
        placeholder="Título del blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <EditorBlog content={content} onChange={setContent} />

      <button
        onClick={saveBlog}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Guardar
      </button>
    </div>
  );
}
