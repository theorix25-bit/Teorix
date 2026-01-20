import { createClient } from "@/lib/supabase/server";
import { User, ShieldCheck, LogOut, Bell } from "lucide-react";

export default async function Header() {
  // Aquí podrías recibir el correo por props o desde un estado de auth
  const supabase = await createClient()
  const email = (await supabase.auth.getClaims()).data?.claims.email
  
  console.log(email)
  const userEmail = email || "admin@teorix.com"; 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#111111]/80 backdrop-blur-md px-6 py-3">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        
        {/* LADO IZQUIERDO: Branding */}
        <div className="flex items-center gap-4">
          <div className="bg-[#C6FF5B] p-1.5 rounded-lg">
            <ShieldCheck size={22} className="text-[#111111]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-[#F8F9FB] leading-none uppercase">
              Teorix <span className="text-[#C6FF5B]">Admin</span>
            </h1>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-0.5">
              Panel de Control
            </p>
          </div>
        </div>

        {/* LADO DERECHO: Perfil y Acciones */}
        <div className="flex items-center gap-6">

          {/* Info del Usuario */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#F8F9FB] mb-1">Administrador</p>
              <p className="text-[13px] text-white">{userEmail}</p>
            </div>
            
            <div className="group relative cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#0E2633] border border-white/10 flex items-center justify-center text-[#C6FF5B] group-hover:border-[#C6FF5B] transition-all">
                <User size={18} />
              </div>
              
              {/* Tooltip o Mini Menú al pasar el mouse (opcional) */}
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block pt-2">
                <div className="bg-[#0E2633] border border-white/10 p-2 rounded-xl shadow-2xl min-w-[120px]">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#E6392D] hover:bg-[#E6392D]/10 rounded-lg transition-colors font-bold">
                    <LogOut size={14} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}