"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateRoleAction(authId: string, newRole: string) {

  // 1. ACTUALIZAR TU TABLA "Usuarios"
  // Esto es para que en tu base de datos de gestión el cambio sea visible
  const { error: tableError } = await supabaseAdmin
    .from("Usuarios")
    .update({ role: newRole })
    .eq("auth_id", authId);

  if (tableError) {
    console.error("Error en tabla Usuarios:", tableError.message);
    throw new Error("No se pudo actualizar la tabla de usuarios");
  }

  // 2. EJECUTAR LA FUNCIÓN RPC EN SUPABASE AUTH
  // Aquí es donde "llamas" a la función SQL que pegaste en el editor de Supabase
  const { error: rpcError } = await supabaseAdmin.rpc('update_user_role', {
    target_user_id: authId, // El nombre del parámetro debe coincidir con el del SQL
    new_role: newRole
  });

  if (rpcError) {
    console.error("Error en RPC (Auth):", rpcError.message);
    // Opcional: podrías revertir el cambio en la tabla Usuarios si esto falla
    throw new Error("Error sincronizando con el sistema de autenticación");
  }

  // 3. REVALIDAR LA RUTA
  // Esto limpia la caché de Next.js y hace que la tabla se vea actualizada al instante
  revalidatePath("/admin/roles");
}