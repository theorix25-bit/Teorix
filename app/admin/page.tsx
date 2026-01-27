import Link from "next/link";
import { 
  Users, 
  Archive, 
  BookOpen, 
  ArrowUpRight, 
  ShieldCheck,
  Book
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const menuCards = [
  { 
    url: "/admin/usuarios", 
    id: "usuarios", 
    icon: Users, 
    label: "Usuarios", 
    desc: "Control de miembros", 
    color: "text-purple-400",
    roles: ["admin", "asistente"] 
  },
  { 
    url: "/admin/contenido", 
    id: "contenido", 
    icon: Book, 
    label: "Contenido", 
    desc: "Control de texto", 
    color: "text-lima",
    roles: ["admin"] 
  },
  { 
    url: "/admin/documentos", 
    id: "Pdf", 
    icon: Archive, 
    label: "Documentos", 
    desc: "Librería de PDFs", 
    color: "text-orange-400",
    roles: ["admin"] 
  },
  { 
    url: "/admin/blog", 
    id: "blogs", 
    icon: BookOpen, 
    label: "Blogs", 
    desc: "Artículos y noticias", 
    color: "text-emerald-400",
    roles: ["admin", "editor"] 
  },
  { 
    url: "/admin/roles", 
    id: "roles", 
    icon: ShieldCheck, // Importa ShieldCheck de lucide-react
    label: "Roles", 
    desc: "Gestión de permisos", 
    color: "text-blue-500",
    roles: ["admin"] // SOLO el admin puede ver esto  
  },
];

export default async function AdminHomePage() {
  const supabase = await createClient();
  
  // Obtenemos los claims para saber el rol
  const { data } = await supabase.auth.getClaims();
  const role = data?.claims?.app_metadata?.role || "user";
  const userName = data?.claims?.user_metadata?.full_name || "Usuario";

  // Filtrar las tarjetas según el rol del usuario
  const filteredMenu = menuCards.filter(item => item.roles.includes(role));

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-[#111111] text-[#F8F9FB]">
      {/* Saludo de Bienvenida Dinámico */}
      <header className="mb-10 mt-4">
        <h1 className="text-3xl font-black text-[#F8F9FB] uppercase tracking-tighter">
          Bienvenido, <span className="text-[#C6FF5B]">{role}</span>
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Hola {userName}, ¿qué deseas gestionar hoy en la plataforma Theorix?
        </p>
      </header>

      {/* Grid de Accesos Rápidos Filtrado */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMenu.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="group relative bg-[#0E2633]/40 border border-white/5 p-6 rounded-3xl hover:border-[#C6FF5B]/40 transition-all duration-300 hover:bg-[#0E2633]/60 flex flex-col justify-between aspect-square md:aspect-auto md:h-48"
          >
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
              <item.icon size={26} />
            </div>

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

            <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF5B]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity pointer-events-none" />
          </Link>
        ))}
      </div>

      <footer className="mt-12 p-6 bg-[#C6FF5B]/5 border border-[#C6FF5B]/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-[#C6FF5B] rounded-full animate-pulse shadow-[0_0_8px_#C6FF5B]" />
           <Link 
          href="/" 
          className="text-xs font-bold uppercase tracking-widest text-[#C6FF5B] hover:underline"
        >
          Ir a la web principal
        </Link>
        </div>
      </footer>
    </div>
  );
}