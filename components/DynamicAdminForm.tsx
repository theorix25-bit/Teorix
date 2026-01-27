"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, Type, Link as LinkIcon, Sparkles, ImageIcon, ListChecks } from "lucide-react"
import toast from "react-hot-toast"
import { refreshContent } from "@/app/admin/actions/refreshContent"
import { Content } from "@radix-ui/react-accordion"

interface DynamicAdminFormProps {
  sectionName: string;
  initialData: Record<string, any>;
}

export function DynamicAdminForm({ sectionName, initialData }: DynamicAdminFormProps) {
  const [isPending, setIsPending] = useState(false)
  const supabase = createClient()
  
  const form = useForm({ 
    defaultValues: initialData 
  })

  const onSubmit = async (values: any) => {
    setIsPending(true)
    const updates = Object.entries(values).map(async ([llave, data]: [string, any]) => {
      return supabase
        .from('elementos_web')
        .update({ contenido: data.texto, metadata: data.meta })
        .eq('llave', llave)
    })

    try {
      await Promise.all(updates)
      await refreshContent()
      toast.success("Cambios publicados")
    } catch (error) {
      toast.error("Error al guardar")
    } finally {
      setIsPending(false)
    }
  }
  const tiposConDisenoPropio = [
    'button', 'card_pq',
  'benefit', 'faq_item', 'imagen', 'lista', 'card_paso', 
  'lista_iconos', 'post_cs', 'card_exito', 'card_testimonio', 
  'button', 'badge_list', 'feature_item', 'step_item'
];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg border border-border sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h2 className="text-lg font-semibold capitalize">{sectionName}</h2>
            <p className="text-xs text-muted-foreground">Gestiona los textos y enlaces de esta sección</p>
          </div>
          <Button type="submit" disabled={isPending} className="shadow-lg transition-all hover:scale-105">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isPending ? "Publicando..." : "Publicar Cambios"}
          </Button>
        </div>

        <Accordion type="multiple" className="w-full space-y-4">
          {Object.keys(initialData).map((llave) => (
            <AccordionItem 
              key={llave} 
              value={llave} 
              className="border rounded-xl px-4 bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {initialData[llave].tipo === 'boton' ? <LinkIcon size={18} /> : <Type size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-tight">
                        {llave.replace(`${sectionName}_`, "").replace(/_/g, " ")}
                    </span>
                    <Badge variant="outline" className="w-fit text-[10px] h-4 mt-1 ">
                      {initialData[llave].tipo}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 space-y-6">
                <Separator />
                {!tiposConDisenoPropio.includes(initialData[llave].tipo) && (
                    <FormField
                      control={form.control}
                      name={`${llave}.texto`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Sparkles size={14} className="text-blue-500" />
                            Contenido Principal
                          </FormLabel>
                          <FormControl>
                            {initialData[llave].tipo === 'titulo' || initialData[llave].tipo === 'subtitulo' ? (
                              <Input {...field} className="text-lg font-medium" />
                            ) : (
                              <Textarea {...field} className="min-h-[120px] leading-relaxed" />
                            )}
                          </FormControl>
                          <FormDescription>Este es el texto que se mostrará directamente en la web.</FormDescription>
                        </FormItem>
                      )}
                    />
                )}
                {initialData[llave].tipo === 'imagen' && (
                  <div className="flex flex-col gap-4 mb-6 p-4 rounded-lg bg-slate-950/50 border border-dashed border-primary/30">
                    <FormLabel className="flex items-center gap-2">
                      <ImageIcon size={14} className="text-primary" />
                      Vista Previa del Asset
                    </FormLabel>

                    <div className="relative aspect-video w-full max-w-sm mx-auto overflow-hidden rounded-md border bg-muted">
                      <img 
                          src={form.watch(`${llave}.texto`)} 
                          alt="Preview" 
                          className="object-cover w-full h-full transition-opacity hover:opacity-80"
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`${llave}.texto`}
                      render={({ field }) => (
                        <FormItem>
                          <FormDescription>URL de la imagen (Storage)</FormDescription>
                          <FormControl>
                            <Input {...field} placeholder="https://..." className="font-mono text-xs" />
                          </FormControl>
                        </FormItem>
                      )}
    />
  </div>
                )} 
                {initialData[llave].tipo === 'lista' && (
                  <div className="space-y-4 bg-slate-900/30 p-4 rounded-xl border border-white/5">
                    <FormLabel className="text-blue-400">Editor de Lista de Puntos</FormLabel>
                    {form.watch(`${llave}.meta.items`)?.map((item: any, index: number) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input 
                          className="w-12 text-center bg-background text-black" 
                          {...form.register(`${llave}.meta.items.${index}.icon`)} 
                        />
                        <Input 
                          className="flex-1 bg-background text-black" 
                          {...form.register(`${llave}.meta.items.${index}.text`)} 
                        />
                      </div>
                    ))}
                    <FormDescription>Cambia los iconos (emojis) y los textos de la lista de frustraciones.</FormDescription>
                  </div>
                )}
                {initialData[llave].tipo === 'card_paso' && (
                  <div className="space-y-4 p-6 bg-slate-900/50 border border-[#C6FF5B]/20 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#C6FF5B] text-black font-bold">PASO</Badge>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">Editor de Tarjeta</span>
                    </div>
                                
                    {/* Título y Subtítulo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`${llave}.texto`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase opacity-50">Cabecera</FormLabel>
                            <Input {...field} className="bg-background text-black border-white/10" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${llave}.meta.subtitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase opacity-50">Subtítulo</FormLabel>
                            <Input {...field} className="bg-background text-black border-white/10" />
                          </FormItem>
                        )}
                      />
                    </div>
                      
                    {/* Lista de beneficios (Array en metadata) */}
                    <div className="space-y-2">
                      <FormLabel className="text-[10px] uppercase opacity-50">Beneficios (Items)</FormLabel>
                      {form.watch(`${llave}.meta.items`)?.map((_: any, index: number) => (
                        <Input 
                          key={index}
                          {...form.register(`${llave}.meta.items.${index}`)}
                          className="bg-background/50 text-black h-8 text-sm"
                        />
                      ))}
                    </div>
                    
                    {/* Texto de cierre (Quote) */}
                    <FormField
                        control={form.control}
                        name={`${llave}.meta.footer_text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase opacity-50">Eslogan de cierre</FormLabel>
                            <Input {...field} className="bg-background text-black border-white/10 italic " />
                          </FormItem>
                        )}
                      />
                  </div>
                )} 
                {initialData[llave].tipo === 'lista_iconos' && (
                  <div className="space-y-3 p-4 bg-slate-900/40 border border-blue-500/20 rounded-xl">
                    <FormLabel className="text-blue-400 text-xs font-bold flex items-center gap-2">
                      <ListChecks size={14} /> LISTA DE CARACTERÍSTICAS
                    </FormLabel>
                                
                    <div className="space-y-2">
                      {form.watch(`${llave}.meta.items`)?.map((_: any, index: number) => (
                        <div key={index} className="flex gap-2">
                          {/* Editor de Icono/Emoji */}
                          <FormControl className="w-12">
                            <Input 
                              {...form.register(`${llave}.meta.items.${index}.icon`)} 
                              className="text-center text-black bg-background border-white/5"
                            />
                          </FormControl>
                          
                          {/* Editor de Texto */}
                          <FormControl className="flex-1">
                            <Input 
                              {...form.register(`${llave}.meta.items.${index}.text`)} 
                              className="bg-background text-black border-white/5"
                            />
                          </FormControl>
                        </div>
                      ))}
                    </div>
                    <FormDescription className="text-[10px]">
                      Asegúrate de usar emojis que contrasten bien con el fondo oscuro.
                    </FormDescription>
                  </div>
                )}  
                {initialData[llave].tipo === 'post_cs' && (
                <div className="space-y-4 p-6 bg-slate-900/50 border border-[#C6FF5B]/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-[#C6FF5B] text-black font-bold">CARD COMUNIDAD</Badge>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Editor de post_cs</span>
                  </div>

                  {/* Título Principal (contenido) */}
                  <FormField
                    control={form.control}
                    name={`${llave}.texto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">Título de la Card</FormLabel>
                        <Input {...field} className="bg-background text-black border-white/10 h-12 text-lg font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Categoría (Badge superior) */}
                    <FormField
                      control={form.control}
                      name={`${llave}.meta.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase opacity-50">Categoría (Ruta 80/20...)</FormLabel>
                          <Input {...field} className="bg-background text-black border-white/10" />
                        </FormItem>
                      )}
                    />

                    {/* Emoji / Icono */}
                    <FormField
                      control={form.control}
                      name={`${llave}.meta.emoji`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase opacity-50">Emoji / Icono</FormLabel>
                          <Input {...field} className="bg-background text-black border-white/10 text-center text-xl" />
                        </FormItem>
                      )}
                    />

                    {/* Visualizaciones */}
                    <FormField
                      control={form.control}
                      name={`${llave}.meta.views`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase opacity-50">Views (12.4K...)</FormLabel>
                          <Input {...field} className="bg-background text-black border-white/10" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                )}
                {initialData[llave].tipo === 'card_exito' && (
                <div className="space-y-4 p-6 bg-zinc-900/50 border border-lima/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-lima text-black font-bold uppercase">Estrategia Éxito</Badge>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Editor de Algoritmo</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Título de la Card (en metadata) */}
                    <FormField
                      control={form.control}
                      name={`${llave}.meta.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase opacity-50">Título Principal</FormLabel>
                          <Input {...field} className="bg-background text-black border-white/10 font-bold" />
                        </FormItem>
                      )}
                    />
                    {/* Subtítulo (en metadata) */}
                    <FormField
                      control={form.control}
                      name={`${llave}.meta.subtitle`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase opacity-50">Subtítulo (Cerebro Gigante...)</FormLabel>
                          <Input {...field} className="bg-background border-white/10 font-mono text-xs text-black" />
                        </FormItem>
                      )}
                    />
                  </div>
                    
                  {/* Descripción Larga (contenido) */}
                  <FormField
                    control={form.control}
                    name={`${llave}.texto`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50 text-blue-400">Explicación del Algoritmo</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[150px] bg-background text-black border-white/10 text-sm leading-relaxed" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Frase Highlight (en metadata) */}
                  <FormField
                    control={form.control}
                    name={`${llave}.meta.highlight`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">Frase Destacada (Highlight)</FormLabel>
                        <Input {...field} className="bg-background text-black border-white/10 italic text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                )}
                {initialData[llave].tipo === 'card_testimonio' && (
                  <div className="space-y-4 p-6 bg-zinc-900/80 border border-lima/30 rounded-2xl relative overflow-hidden">
                    {/* Badge de Previsualización estilo Web */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lima font-black text-xs tracking-tighter uppercase">Testimonio Real</span>
                      <div className="bg-lima text-black text-[10px] px-2 py-0.5 rounded font-bold">APTO ✓</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">Nombre del Alumno</FormLabel>
                        <Input {...form.register(`${llave}.meta.nombre`)} className="bg-background text-black border-white/10" />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">Edad / Info</FormLabel>
                        <Input {...form.register(`${llave}.meta.edad`)} className="bg-background text-black border-white/10" />
                      </FormItem>
                    </div>

                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50">Cita / Testimonio</FormLabel>
                      <Textarea {...form.register(`${llave}.texto`)} className="bg-background text-black border-white/10 italic" />
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50">Tag de Gamificación (Footer)</FormLabel>
                      <Input {...form.register(`${llave}.meta.footer_tag`)} className="bg-background text-black border-white/10 font-mono" />
                    </FormItem>
                  </div>
                )}
                {initialData[llave].tipo === 'button' && (
                  <div className="p-6 bg-zinc-900/50 border border-lima/20 rounded-2xl space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-lima text-black font-bold uppercase">Configuración de Botón</Badge>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        {llave.includes('primary') ? 'Estilo Principal (Borde)' : 'Estilo Secundario (Sólido)'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* ICONO / EMOJI */}
                      <FormItem className="col-span-1">
                        <FormLabel className="text-[10px] uppercase opacity-50 font-bold">Emoji / Icono</FormLabel>
                        <FormControl>
                          <Input 
                            {...form.register(`${llave}.meta.icon`)} 
                            placeholder="Ej: ⚡" 
                            className="bg-background text-black text-center text-xl h-12" 
                          />
                        </FormControl>
                      </FormItem>

                      {/* TEXTO DEL BOTÓN */}
                      <FormItem className="col-span-3">
                        <FormLabel className="text-[10px] uppercase opacity-50 font-bold">Texto del Botón</FormLabel>
                        <FormControl>
                          <Input 
                            {...form.register(`${llave}.texto`)} 
                            placeholder="Ej: CREAR CUENTA GRATIS" 
                            className="bg-background text-black h-12 font-bold uppercase" 
                          />
                        </FormControl>
                      </FormItem>
                    </div>

                    {/* URL DE DESTINO */}
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50 font-bold text-blue-400">URL / Link de destino (href)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔗</span>
                          <Input 
                            {...form.register(`${llave}.meta.href`)} 
                            placeholder="/auth/sign-up" 
                            className="bg-background text-black pl-8 font-mono text-xs" 
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-[9px]">Usa rutas relativas (ej: /#ruta) o enlaces externos completos.</FormDescription>
                    </FormItem>

                    {/* SUBTEXTO OPCIONAL (Si lo usas en otros botones) */}
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50 font-bold">Subtexto (Opcional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...form.register(`${llave}.meta.subtext`)} 
                          placeholder="Ej: No requiere tarjeta" 
                          className="bg-background text-black text-sm italic" 
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
                {initialData[llave].tipo === 'badge_list' && (
                  <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-lima">Configuración de Mini Beneficios</p>

                    {/* Mapeamos 3 espacios fijos para mantener la estética del diseño */}
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 items-end border-b border-white/5 pb-4 last:border-0">
                        <FormItem className="col-span-1">
                          <FormLabel className="text-[9px] uppercase opacity-50">Icono {index + 1}</FormLabel>
                          <Input 
                            {...form.register(`${llave}.meta.${index}.icon`)} 
                            placeholder="Ej: 🎯" 
                            className="bg-background text-center text-black"
                          />
                        </FormItem>
                        <FormItem className="col-span-3">
                          <FormLabel className="text-[9px] uppercase opacity-50">Etiqueta {index + 1}</FormLabel>
                          <Input 
                            {...form.register(`${llave}.meta.${index}.label`)} 
                            placeholder="Ej: Entrena" 
                            className="bg-background text-black"
                          />
                        </FormItem>
                      </div>
                    ))}
                  </div>
                )}
                {initialData[llave].tipo === 'feature_item' && (
                  <div className="space-y-4 p-4 bg-zinc-800/40 rounded-xl border border-white/5">
                    <div className="grid grid-cols-4 gap-4">
                      <FormItem className="col-span-1">
                        <FormLabel className="text-[10px] uppercase opacity-50">Icono</FormLabel>
                        <Input {...form.register(`${llave}.meta.icon`)} className="bg-background text-center text-black text-xl" />
                      </FormItem>
                      <FormItem className="col-span-3">
                        <FormLabel className="text-[10px] uppercase opacity-50">Título</FormLabel>
                        <Input {...form.register(`${llave}.meta.title`)} className="bg-background text-black" />
                      </FormItem>
                    </div>
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50">Descripción</FormLabel>
                      <Textarea {...form.register(`${llave}.texto`)} className="bg-background h-20 text-black" />
                    </FormItem>
                  </div>
                )}
                {initialData[llave].tipo === 'step_item' && (
                  <div className="space-y-4 p-4 bg-zinc-800/40 rounded-xl border border-white/5">
                    <div className="grid grid-cols-4 gap-4">
                      <FormItem className="col-span-4">
                        <FormLabel className="text-[10px] uppercase opacity-50">Título del Paso</FormLabel>
                        <Input {...form.register(`${llave}.meta.titulo`)} className="bg-background text-black" />
                      </FormItem>
                    </div>
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50">Descripción / Acción</FormLabel>
                      <Textarea {...form.register(`${llave}.texto`)} className="bg-background h-20 text-black" />
                    </FormItem>
                  </div>
                )}
                {initialData[llave].tipo === 'faq_item' && (
                  <div className="p-5 bg-zinc-900/60 border border-white/10 rounded-2xl space-y-4 shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-lima shadow-[0_0_8px_rgba(191,255,0,0.8)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-lima">Editor de Objeciones</span>
                    </div>

                    {/* Pregunta Principal */}
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50 font-bold">La Duda / Pregunta</FormLabel>
                      <Input 
                        {...form.register(`${llave}.meta.pregunta`)} 
                        placeholder="Ej: ¿Esto vale si ya estoy en una autoescuela?"
                        className="bg-background/50 border-white/5 text-black focus:border-lima/50 transition-colors font-bold"
                      />
                    </FormItem>

                    {/* Respuesta (Contenido principal) */}
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50 font-bold">La Respuesta / Argumento</FormLabel>
                      <Textarea 
                        {...form.register(`${llave}.texto`)} 
                        placeholder="Explica por qué Teorix es la solución..."
                        className="bg-background/50 border-white/5 text-black focus:border-lima/50 transition-colors min-h-[80px] resize-none"
                      />
                    </FormItem>

                    {/* Configuración del CTA (Link) */}
                    {initialData[llave].meta.linkText && 
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-30 font-bold">Texto del Botón</FormLabel>
                        <Input 
                          {...form.register(`${llave}.meta.linkText`)} 
                          placeholder="Ej: Hacer test (2 min)"
                          className="bg-background/30 border-white/5 text-xs h-8 text-black"
                        />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-30 font-bold">URL de destino</FormLabel>
                        <Input 
                          {...form.register(`${llave}.meta.href`)} 
                          placeholder="Ej: /#test"
                          className="bg-background/30 border-white/5 text-xs h-8 font-mono text-black"
                        />
                      </FormItem>
                    </div> }
                    
                    
                  </div>
                )}
                {initialData[llave].tipo === 'benefit' && (
                  <div className="flex flex-col md:flex-row gap-4 p-4 bg-zinc-900/40 border border-white/5 rounded-xl items-end group transition-colors hover:border-lima/20">
                    {/* Editor de Icono (Emoji o Lucide) */}
                    <FormItem className="w-full md:w-20">
                      <FormLabel className="text-[10px] uppercase opacity-50 font-bold">Icono</FormLabel>
                      <FormControl>
                        <Input 
                          {...form.register(`${llave}.meta.icon`)} 
                          placeholder="🎯" 
                          className="text-center text-xl bg-background border-white/5 text-black focus:border-lima/50"
                        />
                      </FormControl>
                    </FormItem>
                    {/* Texto del Beneficio */}
                    <FormItem className="flex-1 w-full">
                      <FormLabel className="text-[10px] uppercase opacity-50 font-bold">Texto del Beneficio</FormLabel>
                      <FormControl>
                        <Input 
                          {...form.register(`${llave}.texto`)} 
                          placeholder="Ej: Entrena lo que cae"
                          className="bg-background border-white/5 focus:border-lima/50 font-medium text-black"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
                {initialData[llave].tipo === 'card_pq' && (
                  <div className="space-y-4 p-6 bg-zinc-900/80 border border-lima/30 rounded-2xl relative overflow-hidden">
                    {/* Badge de Previsualización estilo Web */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lima font-black text-xs tracking-tighter uppercase">PARA QUIÉN</span>
                      {/* <div className="bg-lima text-black text-[10px] px-2 py-0.5 rounded font-bold">APTO ✓</div> */}
                    </div>
                    {/* 
                    Miguel Hola, Quedaste en crear esta sección para que se edite en el admin
                    y verificar que funcione
                    */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">icon</FormLabel>
                        <Input {...form.register(`${llave}.meta.icon`)} className="bg-background text-black border-white/10" />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">badge</FormLabel>
                        <Input {...form.register(`${llave}.meta.badge`)} className="bg-background text-black border-white/10" />
                      </FormItem>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">Titulo</FormLabel>
                        <Input {...form.register(`${llave}.meta.card_title`)} className="bg-background text-black border-white/10" />
                      </FormItem>
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase opacity-50">subTitulo</FormLabel>
                        <Input {...form.register(`${llave}.meta.card_subtitle`)} className="bg-background text-black border-white/10" />
                      </FormItem>
                    </div>
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase opacity-50">lista Descripción</FormLabel>
                      <Textarea {...form.register(`${llave}.meta.list[0]`)} className="bg-background text-black " />
                      <Textarea {...form.register(`${llave}.meta.list[1]`)} className="bg-background text-black " />
                      <Textarea {...form.register(`${llave}.meta.list[2]`)} className="bg-background text-black " />
                    </FormItem>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </form>
    </Form>
  )
}