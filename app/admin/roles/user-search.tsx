"use client";

import * as React from "react";
import { Search, User, Mail, ShieldAlert, X, ChevronRight, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoleSelector } from "./role-selector";

interface UserAuth {
  id: string;
  email?: string;
  nombre?: string;
  role?: string;
}

export function UserSearch({ users }: { users: UserAuth[] }) {
  const [query, setQuery] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<UserAuth | null>(null);

  // Filtrar usuarios
  const filteredUsers = React.useMemo(() => {
    if (query.trim() === "") return [];
    return users.filter(
      (user) =>
        user.nombre?.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query, users]);

  const handleSelectUser = (user: UserAuth) => {
    setSelectedUser(user);
    setQuery(""); // Limpiamos el buscador para que la lista desaparezca
  };

  return (
    <div className="w-full space-y-6">
      {/* SECCIÓN BUSCADOR - SIEMPRE DISPONIBLE */}
      <div className="relative group z-30">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search size={20} className={cn(
            "transition-colors duration-300",
            query ? "text-[#C6FF5B]" : "text-white/20"
          )} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar otro usuario por nombre o email..."
          className="w-full h-16 pl-14 pr-16 bg-[#0E2633]/20 border border-white/5 rounded-2xl text-[#F8F9FB] placeholder:text-white/20 outline-none focus:border-[#C6FF5B]/30 focus:bg-[#0E2633]/40 transition-all duration-300 text-sm shadow-2xl"
        />

        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-5 flex items-center text-white/20 hover:text-[#FF5B5B] transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* LISTA DE RESULTADOS - Flota sobre la tarjeta si hay búsqueda */}
        {query && (
          <div className="absolute top-20 left-0 right-0 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {filteredUsers.length > 0 ? (
              <div className="p-2">
                <p className="px-4 py-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Resultados encontrados</p>
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#C6FF5B]/10 group transition-all mb-1"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#C6FF5B] group-hover:text-[#111111] transition-all">
                        <User size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-white group-hover:text-[#C6FF5B] transition-colors">{user.nombre}</span>
                        <span className="text-xs text-white/30 lowercase">{user.email}</span>
                      </div>
                    </div>
                    <UserPlus size={16} className="text-white/10 group-hover:text-[#C6FF5B] transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-xs text-white/20 font-black uppercase tracking-widest">No hay coincidencias para "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECCIÓN TARJETA DE USUARIO - SE ACTUALIZA DINÁMICAMENTE */}
      <div className="relative pt-4 min-h-[200px]">
        {selectedUser ? (
          <div key={selectedUser.id} className="animate-in fade-in slide-in-from-right-8 duration-500 bg-gradient-to-br from-[#0E2633]/60 via-[#0E2633]/20 to-transparent border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            
            {/* Indicador de edición activa */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C6FF5B]" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-[#C6FF5B] flex items-center justify-center text-[#111111] font-black text-4xl shadow-[0_20px_40px_-10px_#C6FF5B50]">
                {selectedUser.nombre?.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#C6FF5B]/10 text-[#C6FF5B] text-[10px] font-black uppercase">Usuario Seleccionado</span>
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                  {selectedUser.nombre}
                </h3>
                <div className="flex items-center gap-2 text-white/40 text-sm mt-4 font-medium italic">
                  <Mail size={14} />
                  <span>{selectedUser.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 w-full md:w-auto z-10">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C6FF5B] font-black mb-1">Privilegios actuales</p>
                <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Cambiar rol del usuario</p>
              </div>
              <RoleSelector userId={selectedUser.id} currentRole={selectedUser.role || null} />
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center py-24 text-white/10 group transition-all duration-500 hover:border-white/10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert size={40} className="opacity-20" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-center">
              Comienza buscando un usuario <br />
              <span className="text-white/40 font-medium tracking-normal normal-case italic">para gestionar sus permisos</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}