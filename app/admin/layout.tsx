import BottomNav from "@/components/admin/BottomNav";
import Header from "@/components/admin/header";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/supabase/server";

async function layoutAdmin({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const role = data?.claims?.app_metadata?.role || "user";
  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      {/* Menu Lateral (Solo Desktop) */}
      <Sidebar role={role} />

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
        <BottomNav role={role} />
      </div>
    </div>
  );
}

export default layoutAdmin;