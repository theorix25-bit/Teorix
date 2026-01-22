import { supabaseAdmin } from "@/lib/supabase/admin";
import UserPlanForm from "./form";

async function UsersAdminPage() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  
  if (error) {
    console.error("Error fetching users:", error);
    return <div className="p-10 text-red-500">Error al cargar usuarios de Auth.</div>;
  }

  const users = data.users.map((u) => ({
    email: u.email || "",
    id: u.id,
  }));
  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#C6FF5B]">Gestión de Membresías</h1>
          <p className="text-[#F8F9FB]/50 mt-2">Busca usuarios por email y gestiona sus niveles de acceso.</p>
        </header>
        <UserPlanForm users={users} />
      </div>
    </div>
  );
}

export default UsersAdminPage;