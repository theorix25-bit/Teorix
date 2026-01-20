"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Editor from "@/components/editor";
import { getBlogById, updateBlog } from "@/lib/blog";
import slugify from "slugify";
import { Upload, X, Globe, LayoutIcon, Type } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Estados básicos
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  
  // Estados de SEO
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  
  // Estados de Imagen
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      const blog = await getBlogById(id);
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setCategory(blog.category || "");
        setPreviewUrl(blog.image_url || "");
        setMetaTitle(blog.meta_title || "");
        setMetaDescription(blog.meta_description || "");
      }
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function saveChanges() {
    setUploading(true);
    let finalImageUrl = previewUrl;

    try {
      if (imageFile) {
        const supabase = createClient();
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${id}-${Date.now()}.${fileExt}`;
        const filePath = `featured-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blogs')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blogs')
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

      await updateBlog(id, {
        title,
        slug: slugify(title, { lower: true }),
        content,
        category,
        image_url: finalImageUrl,
        meta_title: metaTitle,
        meta_description: metaDescription
      });

      router.push("/admin/blog");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar");
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <div className="p-10 text-[#F8F9FB] animate-pulse">Cargando datos del blog...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#111111] text-[#F8F9FB] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#C6FF5B]">Editar Blog</h1>
        <button
          onClick={saveChanges}
          disabled={uploading}
          className="px-6 py-2 bg-[#C6FF5B] text-[#111111] font-bold rounded-full hover:bg-[#a3d34a] transition-all disabled:opacity-50"
        >
          {uploading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA IZQUIERDA: Contenido Principal */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#0E2633]/30 p-6 rounded-2xl border border-white/5">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#C6FF5B] mb-4">
              <Type size={16} /> Contenido Principal
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título del post"
                className="w-full bg-[#0E2633] border border-white/10 p-3 rounded-lg outline-none focus:border-[#C6FF5B]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Editor content={content} onChange={setContent} />
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA: SEO e Imagen */}
        <div className="space-y-6">
          {/* SECCIÓN IMAGEN */}
          <section className="bg-[#0E2633]/30 p-6 rounded-2xl border border-white/5">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#C6FF5B] mb-4">
               Portada
            </h2>
            <div className="relative border-2 border-dashed border-white/10 rounded-xl overflow-hidden bg-[#111111]">
              {previewUrl ? (
                <div className="relative aspect-video">
                  <img src={previewUrl} alt="Portada" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => { setImageFile(null); setPreviewUrl(""); }}
                    className="absolute top-2 right-2 p-1 bg-[#E6392D] rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center py-10 cursor-pointer hover:bg-white/5 transition-colors">
                  <Upload size={24} className="text-[#C6FF5B] mb-2" />
                  <span className="text-xs opacity-60 text-center px-4">Subir imagen representativa</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              )}
            </div>
          </section>

          {/* SECCIÓN SEO */}
          <section className="bg-[#0E2633]/30 p-6 rounded-2xl border border-white/5 space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#C6FF5B]">
              <Globe size={16} /> Configuración SEO
            </h2>
            
            <div>
              <label className="text-[10px] uppercase opacity-50 ml-1">Meta Title</label>
              <input
                type="text"
                className="w-full bg-[#0E2633] border border-white/10 p-2 rounded text-sm focus:border-[#C6FF5B] outline-none"
                placeholder="Título para buscadores"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase opacity-50 ml-1">Categoría</label>
              <input
                type="text"
                className="w-full bg-[#0E2633] border border-white/10 p-2 rounded text-sm focus:border-[#C6FF5B] outline-none"
                placeholder="Ej: conducción"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase opacity-50 ml-1">Meta Description</label>
              <textarea
                rows={4}
                className="w-full bg-[#0E2633] border border-white/10 p-2 rounded text-sm focus:border-[#C6FF5B] outline-none resize-none"
                placeholder="Resumen para Google..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
              <p className="text-[10px] mt-1 opacity-40 text-right">
                {metaDescription.length} / 160 caracteres sugeridos
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}