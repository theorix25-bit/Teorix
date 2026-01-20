import BottomNav from "@/components/admin/BottomNav";
import Header from "@/components/admin/header";
import Sidebar from "@/components/Sidebar";

function layoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      {/* Menu Lateral (Solo Desktop) */}
      <Sidebar />

      {/* Contenedor Principal */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Header />
        
        {/* Área de Contenido Scrolleable */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-24 lg:pb-0">
            {children}
          </div>
        </main>

        {/* Menu Inferior (Solo Móvil) */}
        <BottomNav />
      </div>
    </div>
  );
}

export default layoutAdmin;