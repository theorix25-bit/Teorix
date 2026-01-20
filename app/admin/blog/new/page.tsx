"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import slugify from "slugify";
import { useRouter } from "next/navigation";

// Componentes e Iconos
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditorBlog from "@/components/editor";
import { createBlog } from "@/lib/blog";
import { Upload, X, Globe, Type, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Esquema ampliado
const formSchema = z.object({
  title: z.string().min(10, "El título debe tener al menos 10 caracteres"),
  category: z.string().min(1, "La categoría es obligatoria"),
  content: z.string().min(10, "El contenido es muy corto"),
  meta_title: z.string().min(5, "El meta título es necesario para SEO"),
  meta_description: z.string().max(160, "Máximo 160 caracteres"),
});

export default function NewBlogPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      meta_title: "",
      meta_description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setUploading(true);
    let imageUrl = "";

    try {
      // 1. Subir imagen si existe
      if (imageFile) {
        const supabase = createClient();
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `featured-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blogs')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blogs')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      // 2. Crear blog en la DB
      const {data, error} = await createBlog({
        ...values,
        slug: slugify(values.title, { lower: true }),
        image_url: imageUrl,
      });
      if(error) console.log(error)
        console.log(data)
      router.push("/admin/blog");

    } catch (error) {
      console.error(error);
      alert("Error al crear el blog");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-[#111111] text-[#F8F9FB] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#C6FF5B]">Nuevo Blog</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0E2633]/30 p-6 rounded-2xl border border-white/5 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#C6FF5B]">Título del Blog</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-[#0E2633] border-white/10 text-white focus:ring-[#C6FF5B]" 
                        placeholder="Escribe un título impactante" {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#C6FF5B]">Contenido</FormLabel>
                    <FormControl>
                      <EditorBlog content={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* COLUMNA DERECHA: Sidebar SEO & Media */}
          <div className="space-y-6">
            
            {/* Portada */}
            <div className="bg-[#0E2633]/30 p-6 rounded-2xl border border-white/5">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-[#C6FF5B] mb-4">
                <ImageIcon size={16} /> Portada
              </h2>
              <div className="relative border-2 border-dashed border-white/10 rounded-xl overflow-hidden bg-[#111111] aspect-video flex items-center justify-center">
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setImageFile(null); setPreviewUrl(""); }}
                      className="absolute top-2 right-2 p-1 bg-[#E6392D] rounded-full text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer p-4">
                    <Upload size={24} className="text-[#C6FF5B] mb-2" />
                    <span className="text-xs text-center opacity-60">Subir imagen principal</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                )}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-[#0E2633]/30 p-6 rounded-2xl border border-white/5 space-y-4">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-[#C6FF5B] mb-2">
                <Globe size={16} /> SEO & Clasificación
              </h2>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] opacity-60">Categoría</FormLabel>
                    <FormControl>
                      <Input className="bg-[#0E2633] border-white/10 text-sm" placeholder="Ej: Noticias" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meta_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] opacity-60">Meta Title</FormLabel>
                    <FormControl>
                      <Input className="bg-[#0E2633] border-white/10 text-sm" placeholder="Título SEO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meta_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] opacity-60">Meta Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="bg-[#0E2633] border-white/10 text-sm resize-none" 
                        rows={3} 
                        placeholder="Breve descripción para Google..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-[#C6FF5B] text-[#111111] hover:bg-[#a3d34a] font-bold py-6 text-lg rounded-xl"
            >
              {uploading ? "Creando..." : "Publicar Blog"}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  );
}