"use client";

import { Home, Users, Archive, BookOpen, Book, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos la misma estructura de roles que en el Sidebar
const items = [
  { url: "/admin", id: "inicio", icon: Home, label: "Inicio", roles: ["admin", "asistente", "editor"] },
  { url: "/admin/usuarios", id: "usuarios", icon: Users, label: "Usuarios", roles: ["admin", "asistente"] },
  { url: "/admin/contenido", id: "contenido", icon: Book, label: "Contenido", roles: ["admin"] },
  { url: "/admin/documentos", id: "Pdf", icon: Archive, label: "Docs", roles: ["admin"] },
  { url: "/admin/blog", id: "blogs", icon: BookOpen, label: "Blogs", roles: ["admin", "editor"] },
  { url: "/admin/roles",id: "roles", icon: ShieldCheck, label: "Roles", roles: ["admin"]
},
];

interface BottomNavProps {
  role: string;
}

export default function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();

  // Filtramos los items según el rol del usuario
  const filteredItems = items.filter((item) => item.roles.includes(role));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:hidden">
      <nav className="mx-auto flex items-center justify-around h-16 bg-[#0E2633]/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl px-2">
        {filteredItems.map(({ id, icon: Icon, label, url }) => {
          const isActive = pathname === url;
          
          return (
            <Link
              key={id}
              href={url}
              className="relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300"
            >
              {/* Indicador de fondo para el activo */}
              {isActive && (
                <div className="absolute inset-x-1 inset-y-2 bg-[#C6FF5B]/10 rounded-xl animate-in fade-in zoom-in duration-300" />
              )}

              <div className={`transition-all duration-300 ${isActive ? "-translate-y-1" : ""}`}>
                <Icon 
                  size={20} 
                  className={`transition-colors ${isActive ? "text-[#C6FF5B]" : "text-white/40"}`} 
                />
              </div>

              <span className={`text-[10px] mt-1 font-bold uppercase tracking-tighter transition-colors ${
                isActive ? "text-[#C6FF5B]" : "text-white/70"
              }`}>
                {label}
              </span>

              {/* Puntito brillante para el activo */}
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-[#C6FF5B] rounded-full shadow-[0_0_8px_#C6FF5B]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}