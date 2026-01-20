import { getAllBlogs, deleteBlog } from "@/lib/blog";
import Link from "next/link";
import { Plus, Edit3, Trash2, Calendar, Tag, ExternalLink } from "lucide-react";
import { DeleteBlogButton } from "@/components/DeleteBlogButton";

export default async function AdminBlogs() {
  const { data: blogs } = await getAllBlogs();

  return (
    <div className="p-6 min-h-screen bg-[#111111] text-[#F8F9FB]">
      {/* HEADER DEL PANEL */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#C6FF5B]">Gestión de Contenido</h1>
          <p className="text-[#F8F9FB]/50 text-sm mt-1">Administra, edita y publica tus artículos de Theorix.</p>
        </div>
        
        <Link 
          href="/admin/blog/new" 
          className="flex items-center gap-2 bg-[#C6FF5B] text-[#111111] px-5 py-2.5 rounded-xl font-bold hover:bg-[#a3d34a] transition-all shadow-lg shadow-[#C6FF5B]/10"
        >
          <Plus size={20} />
          Nuevo Artículo
        </Link>
      </header>

      {/* GRID DE BLOGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div 
            key={blog.id} 
            className="group bg-[#0E2633]/30 border border-white/5 rounded-2xl overflow-hidden hover:border-[#C6FF5B]/30 transition-all flex flex-col"
          >
            {/* IMAGEN DE PORTADA */}
            <div className="relative aspect-video overflow-hidden bg-[#111111]">
              {blog.image_url ? (
                <img 
                  src={blog.image_url} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10">
                  <Tag size={40} />
                </div>
              )}
              {/* Badge de Categoría */}
              <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md text-[#C6FF5B] text-[10px] font-bold px-2 py-1 rounded-md uppercase border border-white/10">
                {blog.category || "Sin categoría"}
              </div>
            </div>

            {/* CONTENIDO DE LA TARJETA */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-[#C6FF5B] transition-colors">
                {blog.title}
              </h3>
              
              <div className="flex items-center gap-4 text-xs text-[#F8F9FB]/40 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <ExternalLink size={14} />
                  /{blog.slug}
                </span>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                <Link 
                  href={`/admin/blog/${blog.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-[#F8F9FB] py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <Edit3 size={16} />
                  Editar
                </Link>
                
                
                <DeleteBlogButton blogId={blog.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {(!blogs || blogs.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-[#F8F9FB]/30">No hay artículos publicados todavía.</p>
        </div>
      )}
    </div>
  );
}