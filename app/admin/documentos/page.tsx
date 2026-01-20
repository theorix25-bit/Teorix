import Link from "next/link";
import { 
  FilePlus, 
  FileEdit, 
  FileMinus, 
  FileText, 
  ChevronRight, 
  Layers 
} from "lucide-react";

async function Documento() {
  // Aquí podrías traer conteos rápidos para el UX
  // const totalDocs = documentos?.length || 0;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#111111] text-[#F8F9FB] min-h-[80vh]">
      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-[#C6FF5B] flex items-center gap-3">
          <FileText size={32} />
          Gestión de Documentos
        </h1>
        <p className="text-white/50 mt-2">
          Administra la biblioteca de recursos, guías y documentos técnicos de la plataforma.
        </p>
      </header>

      {/* TARJETAS DE ACCIÓN RÁPIDA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Crear */}
        <Link href="/admin/documentos/crear" className="group">
          <div className="h-full bg-[#0E2633]/30 border border-white/5 p-8 rounded-2xl hover:border-[#C6FF5B]/50 transition-all hover:bg-[#0E2633]/50 relative overflow-hidden">
            <div className="bg-[#C6FF5B]/10 w-12 h-12 rounded-lg flex items-center justify-center text-[#C6FF5B] mb-6 group-hover:scale-110 transition-transform">
              <FilePlus size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Nuevo Documento</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Sube nuevos archivos, define su categoría y asigna los permisos de acceso por plan.
            </p>
            <ChevronRight className="absolute bottom-6 right-6 text-white/20 group-hover:text-[#C6FF5B] transition-colors" />
          </div>
        </Link>

        {/* Editar */}
        <Link href="/admin/documentos/editar" className="group">
          <div className="h-full bg-[#0E2633]/30 border border-white/5 p-8 rounded-2xl hover:border-[#C6FF5B]/50 transition-all hover:bg-[#0E2633]/50 relative overflow-hidden">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <FileEdit size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Modificar Existente</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Actualiza versiones de archivos, cambia títulos o reasigna documentos a otros planes.
            </p>
            <ChevronRight className="absolute bottom-6 right-6 text-white/20 group-hover:text-[#C6FF5B] transition-colors" />
          </div>
        </Link>

        {/* Eliminar / Listado */}
        <Link href="/admin/documentos/eliminar" className="group">
          <div className="h-full bg-[#E6392D]/5 border border-white/5 p-8 rounded-2xl hover:border-[#E6392D]/40 transition-all hover:bg-[#E6392D]/10 relative overflow-hidden">
            <div className="bg-[#E6392D]/10 w-12 h-12 rounded-lg flex items-center justify-center text-[#E6392D] mb-6 group-hover:scale-110 transition-transform">
              <FileMinus size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Eliminar</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              Remueve documentos obsoletos de la base de datos de forma permanente.
            </p>
            <ChevronRight className="absolute bottom-6 right-6 text-white/20 group-hover:text-[#E6392D] transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Documento;