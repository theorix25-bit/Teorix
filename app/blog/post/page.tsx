"use client";

import { ArrowLeft, ImageIcon, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

// DATA EN DURO (Simulando la respuesta de tu Service/Builder)

const BLOG_DATA = [
  {
    idx: 0,
    id: "f3b91d22-1c9a-4b6a-bd34-9e12c8a91b11",
    title: "Aprender a conducir joven: guía completa para obtener el Carnet B",
    slug: "aprender-a-conducir-joven-carnet-b",
    category: "CONDUCCIÓN",
    content: `
      <h2>¿Por qué aprender a conducir siendo joven?</h2>
      <p>
        Aprender a conducir a una edad temprana es una gran ventaja. Los jóvenes suelen adaptarse más rápido,
        desarrollan mejores reflejos y adquieren hábitos de conducción más seguros desde el inicio.
      </p>
      <p>
        Obtener el <strong>Carnet B</strong> no solo significa poder manejar un vehículo, sino también ganar
        independencia, confianza y nuevas oportunidades en la vida diaria.
      </p>

      <h2>Requisitos básicos para obtener el Carnet B</h2>
      <p>
        Antes de comenzar, es importante conocer los requisitos mínimos para acceder al Carnet B.
        Estos pueden variar según el país, pero generalmente incluyen:
      </p>
      <ul>
        <li>Edad mínima legal para conducir.</li>
        <li>Documento de identidad vigente.</li>
        <li>Examen médico (vista, reflejos y audición).</li>
        <li>Aprobación del examen teórico.</li>
        <li>Aprobación del examen práctico de conducción.</li>
      </ul>

      <h2>La importancia de la teoría vial</h2>
      <p>
        Muchos jóvenes cometen el error de subestimar la teoría. Sin embargo, conocer las normas de tránsito
        es fundamental para aprobar los exámenes y, más importante aún, para conducir de forma segura.
      </p>
      <p>
        Estudiar señales de tránsito, prioridades, límites de velocidad y conducción defensiva
        te dará seguridad y reducirá el estrés durante el examen práctico.
      </p>

      <h2>La práctica: aprender a conducir con confianza</h2>
      <p>
        La práctica es donde se consolidan los conocimientos. Al principio es normal cometer errores,
        pero lo importante es aprender de ellos.
      </p>
      <ul>
        <li>Practicar en zonas tranquilas y poco transitadas.</li>
        <li>Aprender a usar correctamente los espejos.</li>
        <li>Controlar el embrague, freno y acelerador.</li>
        <li>Anticipar situaciones de riesgo.</li>
      </ul>

      <h2>Nervios y miedo al volante</h2>
      <p>
        Sentir nervios al conducir es completamente normal, especialmente durante las primeras prácticas
        o el día del examen. La clave está en mantener la calma y confiar en el proceso de aprendizaje.
      </p>
      <p>
        Con el tiempo y la práctica constante, el miedo se transforma en seguridad.
        Conducir bien no es un talento innato, es una habilidad que se aprende.
      </p>

      <h2>Consejos para aprobar el examen práctico</h2>
      <p>
        El examen práctico puede generar mucha ansiedad, pero con una buena preparación es totalmente alcanzable.
      </p>
      <ul>
        <li>Dormir bien la noche anterior.</li>
        <li>Escuchar atentamente las indicaciones del examinador.</li>
        <li>Conducir con calma y sin apuro.</li>
        <li>Priorizar siempre la seguridad.</li>
      </ul>

      <h2>Responsabilidad y seguridad vial</h2>
      <p>
        Obtener el Carnet B implica una gran responsabilidad. Un buen conductor no solo piensa en sí mismo,
        sino también en los demás usuarios de la vía.
      </p>
      <p>
        Respetar las normas, evitar distracciones y nunca conducir bajo los efectos del alcohol
        son pilares fundamentales de la seguridad vial.
      </p>

      <h2>Conclusión: el Carnet B como habilidad para toda la vida</h2>
      <p>
        Aprender a conducir siendo joven es una inversión a largo plazo. El Carnet B no es solo un permiso,
        es una herramienta que te acompañará durante toda tu vida.
      </p>
      <p>
        Con estudio, práctica y responsabilidad, cualquier joven puede convertirse en un conductor seguro
        y confiado.
      </p>
    `,
    image_url:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2128&auto=format&fit=crop",
    created_at: "2026-01-15 10:00:00",
    updated_at: "2026-01-15 10:00:00",
  },
  {
    idx: 1,
    id: "c8d4a6f1-9a3e-4c7a-9f21-7b2d9caa4412",
    title: "Errores comunes al aprender a conducir (y cómo evitarlos)",
    slug: "errores-comunes-aprender-a-conducir",
    category: "CONDUCCIÓN",
    content: `
      <h2>Aprender a conducir no es fácil (y está bien)</h2>
      <p>
        Cuando comienzas a conducir, cometer errores es completamente normal.
        La clave no es evitarlos a toda costa, sino <strong>aprender de ellos</strong>
        y corregirlos a tiempo.
      </p>

      <h2>Error #1: No respetar los tiempos de aprendizaje</h2>
      <p>
        Muchos jóvenes se frustran al no dominar el vehículo rápidamente.
        Cada persona aprende a su ritmo, y forzar el proceso solo genera más estrés.
      </p>

      <h2>Error #2: Descuidar la teoría vial</h2>
      <p>
        Confiar únicamente en la práctica es un error frecuente.
        La teoría es la base de una conducción segura y es clave para aprobar el examen.
      </p>
      <ul>
        <li>Señales de tránsito</li>
        <li>Prioridades de paso</li>
        <li>Normas de seguridad vial</li>
      </ul>

      <h2>Error #3: Conducir con nervios excesivos</h2>
      <p>
        El miedo al volante puede bloquearte.
        Respirar profundo, mantener la calma y confiar en lo aprendido
        marca una gran diferencia.
      </p>

      <h2>Error #4: No mirar correctamente los espejos</h2>
      <p>
        Un error muy común en principiantes es no usar los espejos con frecuencia.
        Mirarlos constantemente mejora la percepción del entorno y previene accidentes.
      </p>

      <h2>Error #5: Pensar solo en aprobar el examen</h2>
      <p>
        Conducir bien no se trata solo de aprobar una prueba.
        Se trata de desarrollar una habilidad que usarás toda la vida.
      </p>

      <h2>Conclusión</h2>
      <p>
        Equivocarse al aprender a conducir es parte del proceso.
        Identificar estos errores a tiempo te ayudará a convertirte
        en un conductor más seguro, confiado y responsable.
      </p>
    `,
    image_url:
      "https://images.unsplash.com/photo-1517949908119-720a1bbeb84d?q=80&w=2128&auto=format&fit=crop",
    created_at: "2026-01-15 10:30:00",
    updated_at: "2026-01-15 10:30:00",
  },
];


export default function BlogDetail() {
  const router = useRouter();
  const post = BLOG_DATA[0]; // Simulamos que seleccionamos el primero
  const relatedPosts = BLOG_DATA.slice(1); // El resto son relacionados

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Back Button con Shadcn */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="rounded-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Volver
          </Button>

          <div className="space-y-4">
            <Badge variant="secondary" className="tracking-widest font-bold">
              {post.category}
            </Badge>
            <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar size={14} />
              <span>{post.created_at.split(' ')[0]}</span>
            </div>
          </div>

          {/* Main Image con Aspect Ratio */}
          <div className="overflow-hidden rounded-2xl border bg-muted shadow-sm">
            <AspectRatio ratio={21 / 9}>
              {post.image_url ? (
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-secondary">
                  <ImageIcon size={60} className="text-muted-foreground/40" />
                </div>
              )}
            </AspectRatio>
          </div>

          {/* Text Content con dangerouslySetInnerHTML */}
          <article 
            className="prose
    prose-invert
    max-w-none

    /* BASE */
    prose-p:text-base
    prose-p:leading-7
    prose-p:text-zinc-300
    prose-p:my-4

    /* HEADINGS */
    prose-h1:text-4xl
    prose-h1:font-bold
    prose-h1:tracking-tight
    prose-h1:mb-6
    prose-h1:mt-10
    prose-h1:text-white

    prose-h2:text-3xl
    prose-h2:font-semibold
    prose-h2:tracking-tight
    prose-h2:mt-12
    prose-h2:mb-4
    prose-h2:text-white

    prose-h3:text-2xl
    prose-h3:font-semibold
    prose-h3:mt-10
    prose-h3:mb-3
    prose-h3:text-white

    prose-h4:text-xl
    prose-h4:font-medium
    prose-h4:mt-8
    prose-h4:mb-2
    prose-h4:text-zinc-200

    prose-headings:scroll-mt-24

    /* LINKS */
    prose-a:text-lima
    prose-a:font-medium
    prose-a:no-underline
    hover:prose-a:underline

    /* STRONG / EMPHASIS */
    prose-strong:text-lima
    prose-strong:font-semibold

    /* LISTS */
    prose-ul:my-6
    prose-ol:my-6
    prose-li:my-2
    prose-li:text-zinc-300
    prose-li:leading-7
    prose-li:marker:text-lima

    /* BLOCKQUOTE */
    prose-blockquote:border-l-4
    prose-blockquote:border-lima
    prose-blockquote:bg-lima/5
    prose-blockquote:px-6
    prose-blockquote:py-3
    prose-blockquote:rounded-r-xl
    prose-blockquote:text-zinc-300
    prose-blockquote:font-normal

    /* INLINE CODE */
    prose-code:text-lima
    prose-code:bg-zinc-900
    prose-code:rounded-md
    prose-code:px-1.5
    prose-code:py-0.5
    prose-code:text-sm

    /* CODE BLOCKS */
    prose-pre:bg-zinc-900
    prose-pre:border
    prose-pre:border-border/60
    prose-pre:rounded-xl
    prose-pre:p-5
    prose-pre:overflow-x-auto
    prose-pre:text-sm

    /* IMAGES */
    prose-img:rounded-xl
    prose-img:shadow-lg
    prose-img:border
    prose-img:border-border/60
    prose-img:my-8
  "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Sidebar Related (Desktop) */}
        <aside className="hidden lg:block w-80 space-y-6">
          <h2 className="font-bold text-xl border-b pb-2">Relacionados</h2>
          <div className="space-y-6">
            {BLOG_DATA.map((item) => (
              <RelatedCard key={item.id} post={item} />
            ))}
          </div>
        </aside>
      </div>

      {/* Related (Mobile) */}
      <div className="lg:hidden mt-12 space-y-4">
        <h2 className="font-bold text-xl border-b pb-2">Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BLOG_DATA.map((item) => (
            <RelatedCard key={item.id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ post }: { post: typeof BLOG_DATA[0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="overflow-hidden border-none shadow-none bg-transparent group-hover:bg-muted/50 transition-colors rounded-xl p-2">
        <div className="space-y-3">
          <div className="w-full h-32 bg-muted rounded-lg overflow-hidden relative">
            {post.image_url ? (
               <img src={post.image_url} className="object-cover w-full h-full" alt="" />
            ) : (
              <div className="flex items-center justify-center h-full"><ImageIcon className="text-muted-foreground/20" /></div>
            )}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {post.category}
            </span>
            <p className="font-bold leading-snug text-sm line-clamp-2 group-hover:underline">
              {post.title}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {post.created_at.split(' ')[0]}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}