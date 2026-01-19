"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import slugify from "slugify";
import { useRouter } from "next/navigation";

// Componentes de Shadcn
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
import EditorBlog from "@/components/editor";
import { createBlog } from "@/lib/blog";

// 1. Definimos el esquema de validación con Zod
const formSchema = z.object({
  title: z.string().min(10, "El título debe tener al menos 10 caracteres"),
  category: z.string().min(1, "La categoría es obligatoria"),
  content: z.string().min(10, "El contenido es muy corto"),
});

export default function NewBlogPage() {
  const router = useRouter();

  // 2. Inicializamos el form con el resolver de Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  // 3. Función de envío
  async function onSubmit(values:any) {
    await createBlog({
      ...values,
      slug: slugify(values.title, { lower: true }),
    });
    router.push("/admin/blog");
  }

  return (
    <div className="p-4 container max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nuevo Blog</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Campo de Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe el título aquí" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Categoría */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Tecnología" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo del Editor (Componente Externo) */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <FormControl>
                  <EditorBlog 
                    content={field.value} 
                    onChange={field.onChange} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Guardar Blog
          </Button>
        </form>
      </Form>
    </div>
  );
}