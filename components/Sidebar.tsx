"use client";

import { Home, Users, Book, Archive, BookOpen, ChevronRight, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos qué roles pueden ver qué links
const items = [
  { url: "/admin", id: "inicio", icon: Home, label: "Inicio", roles: ["admin", "asistente", "editor"] },
  { url: "/admin/usuarios", id: "usuarios", icon: Users, label: "Usuarios", roles: ["admin", "asistente"] },
  { url: "/admin/contenido", id: "contenido", icon: Book, label: "Contenido", roles: ["admin"] },
  { url: "/admin/documentos", id: "Pdf", icon: Archive, label: "Documentos", roles: ["admin"] },
  { url: "/admin/blog", id: "blogs", icon: BookOpen, label: "Blogs", roles: ["admin", "editor"] },
  { url: "/admin/roles",id: "roles", icon: ShieldCheck, label: "Roles", roles: ["admin"]},
];

interface SidebarProps {
  role: string; // Recibimos el rol desde el Server Component (Layout)
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // Filtramos los items según el rol actual
  const filteredItems = items.filter((item) => item.roles.includes(role));

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#111111] border-r border-white/5 p-4">
      {/* Logo / Badge */}
      <div className="px-4 py-6 mb-8 bg-[#0E2633]/30 rounded-2xl border border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6FF5B]">
          Panel {role}
        </p>
        <h2 className="text-xl font-bold text-white tracking-tighter">
          Teorix <span className="opacity-70 text-sm">v 1 . 0</span>
        </h2>
      </div>

      {/* Navegación Filtrada */}
      <nav className="flex-1 space-y-2">
        {filteredItems.map(({ id, icon: Icon, label, url }) => {
          const isActive = pathname === url;
          return (
            <Link
              key={id}
              href={url}
              className={`flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                ? "bg-[#C6FF5B] text-[#111111] shadow-[0_10px_20px_-10px_#C6FF5B50]" 
                : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? "text-[#111111]" : "group-hover:text-[#C6FF5B] transition-colors"} />
                <span className="text-sm font-bold tracking-tight">{label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="animate-in slide-in-from-left-2" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer del Sidebar */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-white/40 hover:text-[#E6392D] transition-colors text-sm font-bold">
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}