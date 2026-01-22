import { DynamicAdminForm } from '@/components/DynamicAdminForm';
import { createClient } from '@/lib/supabase/server';
import { HeroContent } from '@/types/content';

export default async function page({ params }: { params: { seccion: string } }) {
  const supabase = await createClient();
  const res = await params
  const { data } = await supabase
    .from('elementos_web')
    .select('*')
    .eq('seccion', res.seccion)
    .order('orden');

    if(data == null) throw new Error("error al obtener datos")
      console.log(res.seccion)
  const initialContent = data.reduce((acc, item) => {
    acc[item.llave] = { 
      texto: item.contenido || '', 
      meta: item.metadata || {}, 
      tipo: item.tipo 
    };
    return acc;
  }, {} as any) as HeroContent;

  return (
    <main className="container max-w-4xl py-10">
      <header className="mb-10 text-center">
        {/* <h1 className="text-4xl font-extrabold tracking-tight"></h1> */}
        <p className="text-muted-foreground mt-2">Edita el contenido visual y textual de la sección de misión.</p>
      </header>
      
      <DynamicAdminForm sectionName="como_funciona" initialData={initialContent} />
    </main>
  );
  }
