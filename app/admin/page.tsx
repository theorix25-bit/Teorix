
import Link from "next/link";
import { 
  Home, 
  Users, 
  Play, 
  Video, 
  Archive, 
  BookOpen, 
  ArrowUpRight 
} from "lucide-react";

const menuCards = [
  // { url: "/admin", id: "inicio", icon: Home, label: "Inicio", desc: "Panel principal", color: "text-blue-400" },
  { url: "/admin/usuarios", id: "usuarios", icon: Users, label: "Usuarios", desc: "Control de miembros", color: "text-purple-400" },
  // { url: "/admin/planes", id: "planes", icon: Play, label: "Planes", desc: "Membresías y fases", color: "text-[#C6FF5B]" },
  // { url: "/admin/videos", id: "videos", icon: Video, label: "Videos", desc: "Contenido multimedia", color: "text-red-400" },
  { url: "/admin/documentos", id: "Pdf", icon: Archive, label: "Documentos", desc: "Librería de PDFs", color: "text-orange-400" },
  { url: "/admin/blog", id: "blogs", icon: BookOpen, label: "Blogs", desc: "Artículos y noticias", color: "text-emerald-400" },
];

export default function AdminHomePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen bg-[#111111] text-[#F8F9FB]">
      {/* Saludo de Bienvenida */}
      <header className="mb-10 mt-4">
        <h1 className="text-3xl font-black text-[#F8F9FB] uppercase tracking-tighter">
          Bienvenido, <span className="text-[#C6FF5B]">Admin</span>
        </h1>
        <p className="text-white/50 text-sm mt-2">
          ¿Qué deseas gestionar hoy en la plataforma Theorix?
        </p>
      </header>

      {/* Grid de Accesos Rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {menuCards.map((item) => (
          <Link
            key={item.id}
            href={item.url}
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

      {/* Sección de "Acción Rápida" o Status */}
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