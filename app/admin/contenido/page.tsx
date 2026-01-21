// admin/hero/page.tsx
import { DynamicAdminForm } from '@/components/DynamicAdminForm';
import { createClient } from '@/lib/supabase/server';
import { HeroContent } from '@/types/content';

export default async function AdminHeroPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('elementos_web')
    .select('*')
    .eq('seccion', 'hero')
    .order('orden', { ascending: true });

  if (error || !data) {
    return <div className="p-8 text-white">Error cargando contenidos o sin textos.</div>;
  }

  // Transformamos el array plano de la DB al objeto estructurado HeroContent
  const initialContent = data.reduce((acc, item) => {
    acc[item.llave] = { 
      texto: item.contenido || '', 
      meta: item.metadata || {}, 
      tipo: item.tipo 
    };
    return acc;
  }, {} as any) as HeroContent;

  return (
    <div className="p-8 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Panel Admin: Sección Hero</h1>
      <DynamicAdminForm initialData={initialContent} />
    </div>
  );
}