"use client"

import { useForm } from "react-hook-form"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { refreshContent } from "@/app/admin/actions/refreshContent"
import toast from "react-hot-toast"

interface DynamicAdminFormProps {
  initialData: Record<string, any>;
}

export function DynamicAdminForm({  initialData }: DynamicAdminFormProps) {
  const supabase = createClient()
  const form = useForm({ defaultValues: initialData })

  const onSubmit = async (values: any) => {
    // Supabase no permite actualizar múltiples filas con diferentes datos en un solo .update()
    // Así que ejecutamos promesas en paralelo para cada llave modificada
    const updates = Object.entries(values).map(async ([llave, data]: [string, any]) => {
      return supabase
        .from('elementos_web')
        .update({ 
          contenido: data.texto, 
          metadata: data.meta 
        })
        .eq('llave', llave)
    })

    try {
      await Promise.all(updates)
      await refreshContent() // Limpia la caché de Next.js
      toast.success(`Sección actualizada`)
    } catch (error) {
      toast.error("Error al guardar los cambios")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(initialData).map((llave) => (
          <div key={llave} className="p-4 border rounded-xl bg-card text-card-foreground shadow-sm">
            <h3 className="text-sm font-black uppercase mb-4 text-muted-foreground">{llave}</h3>
            
            {/* Campo de Texto Principal */}
            <FormField
              control={form.control}
              name={`${llave}.texto`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    {initialData[llave].tipo === 'titulo' || initialData[llave].tipo === 'subtitulo' ? (
                      <Input {...field} />
                    ) : (
                      <Textarea {...field} rows={3} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Campos Dinámicos de Metadata (Ej: URL de botón) */}
            {initialData[llave].meta && Object.keys(initialData[llave].meta).map((metaKey) => (
              <FormField
                key={metaKey}
                control={form.control}
                name={`${llave}.meta.${metaKey}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-500 text-xs">Atributo: {metaKey}</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-slate-50 text-black dark:bg-slate-900" />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        ))}
        <Button type="submit"  className=" bg-lima text-black">Guardar cambios</Button>
      </form>
    </Form>
  )
}