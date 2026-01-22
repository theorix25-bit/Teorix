


import Link from 'next/link';
import { 
  LayoutDashboard, 
  MousePointerClick, 
  ShieldCheck, 
  HelpCircle, 
  Mail, 
  ArrowUpRight,
  BookOpen,
  Sparkles,
  LayoutGrid,
  TrendingUp
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

// Definimos el mapa de secciones con su estilo visual
const SECCIONES_MENU = [
  { 
    id: 'hero', 
    label: 'Hero Principal', 
    desc: 'Título, eslogan y botones de entrada', 
    icon: LayoutDashboard, 
    color: 'text-blue-400',
    url: 'hero' 
  },
  { 
    id: 'como_funciona', 
    label: 'Cómo Funciona', 
    desc: 'Sección de misión e imagen de la App', 
    icon: MousePointerClick, 
    color: 'text-[#C6FF5B]',
    url: 'como_funciona' 
  },
  { 
    id: 'puntos_dolor', 
    label: 'Puntos de Dolor', 
    desc: 'Problemas del sistema vs Solución Teorix', 
    icon: ShieldCheck, // Importa ShieldCheck de lucide-react
    color: 'text-red-400',
    url: 'puntos_dolor' 
  },
  { 
  id: 'metodo', 
  label: 'El Método', 
  desc: 'Los 3 pasos: Calibración, Ruta y Soporte', 
  icon: Sparkles, // O BookOpen
  color: 'text-yellow-400',
  url: 'metodo' 
},
{ 
  id: 'community_sc', 
  label: 'Comunidad Teorix', 
  desc: 'Cards de beneficios, emojis y métricas de visualización', 
  icon: LayoutGrid, // También puedes usar Users si prefieres un enfoque social
  color: 'text-lima', 
  url: 'community_sc' 
},
{ 
  id: 'exito_sc', 
  label: 'Estrategia y Éxito', 
  desc: 'Big Data, IA y métricas de aprobados (85%)', 
  icon: TrendingUp, 
  color: 'text-lima', 
  url: 'exito_sc' 
},
];

const supabase = await createClient();
const { data } = await supabase.from("elementos_web").select("seccion");

// 1. Extraemos solo los nombres únicos de las secciones que vienen de la DB
// Esto transforma [{seccion: 'hero'}, {seccion: 'hero'}] en ['hero']
const seccionesExistentes = Array.from(new Set(data?.map(item => item.seccion)));

// 2. Filtramos tu menú para que solo aparezcan las que tienen datos en la DB
const seccionesAMostrar = SECCIONES_MENU.filter(item => 
  seccionesExistentes.includes(item.id)
);
export default function AdminDashboard() {
  return (
    <div className="min-h-screen text-white p-8">
      <header className="max-w-5xl mx-auto mb-12">
        <h1 className="text-3xl font-bold italic tracking-tighter">CENTRAL DE CONTENIDO</h1>
        <p className="text-white/40 text-sm mt-1 uppercase tracking-widest">Panel de Administración Teorix</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {seccionesAMostrar.map((item) => (
            <Link
              key={item.id}
              href={`/admin/contenido/${item.url}`}
              className="group relative bg-[#0E2633]/40 border border-white/5 p-6 rounded-3xl hover:border-[#C6FF5B]/40 transition-all duration-300 hover:bg-[#0E2633]/60 flex flex-col justify-between aspect-square md:aspect-auto md:h-48"
            >
              {/* Icono con círculo de fondo sutil */}
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={26} />
              </div>

              {/* Textos */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg group-hover:text-[#C6FF5B] transition-colors">
                    {item.label}
                  </h3>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-[#C6FF5B] transition-all" />
                </div>
                <p className="text-[11px] text-white/30 uppercase tracking-wider font-medium mt-1">
                  {item.desc}
                </p>
              </div>

              {/* Efecto de resplandor al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF5B]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity pointer-events-none" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}