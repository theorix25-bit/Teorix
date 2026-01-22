// app/admin/roles/page.tsx
import { ShieldCheck } from "lucide-react";
import { UserSearch } from "./user-search";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function RolesPage() {
  // 1. Traemos los usuarios de la tabla de gestión
  const { data: dbUsers, error: dbError } = await supabaseAdmin
    .from("Usuarios")
    .select("auth_id, nombre, apellido, role");

  // 2. Traemos todos los usuarios del sistema de autenticación
  const { data: { users: authUsers }, error: authError } = await supabaseAdmin.auth.admin.listUsers();

  if (dbError || authError) {
    return <div>Error cargando datos...</div>;
  }

  // 3. Cruzamos los datos (Mapeo inteligente)
  const formattedUsers = dbUsers?.map(dbUser => {
    // Buscamos el usuario correspondiente en la lista de Auth por su ID
    const authUser = authUsers.find(au => au.id === dbUser.auth_id);

    return {
      id: dbUser.auth_id,
      nombre: `${dbUser.nombre || ""} ${dbUser.apellido || ""}`.trim() || "Sin nombre",
      email: authUser?.email || "Email no encontrado", // <--- Aquí traemos el email real
      role: dbUser.role
    };
  }) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-[#111111] text-[#F8F9FB]">
      <header className="mb-10 mt-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#C6FF5B]" size={32} />
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Gestión de <span className="text-[#C6FF5B]">Roles</span>
          </h1>
        </div>
        <p className="text-white/50 text-sm mt-2">
          Busca un usuario específico por nombre o email para modificar sus privilegios.
        </p>
      </header>

      {/* Ahora UserSearch recibe los usuarios con su email correcto */}
      <UserSearch users={formattedUsers} />
      
      <div className="mt-20 opacity-20 flex justify-center">
        <ShieldCheck size={120} />
      </div>
    </div>
  );
}