import { createClient } from "@/lib/supabase/server";


export class UsuarioRepository {
  static async findByAuthId(authId: string): Promise<ApiBaseResponse<UserDB>> {
    const supabase = await createClient();
    const { data: usuario, error } = await supabase
      .from("Usuarios")
      .select("*")
      .eq("auth_id", authId)
      .maybeSingle();

    return error || !usuario || usuario.length === 0
    ? {
        ok: false,
        data: null,
        error: error?.message ?? "Videos no encontrados",
      }
    : { ok: true, data: usuario, error: null };
  }
}
