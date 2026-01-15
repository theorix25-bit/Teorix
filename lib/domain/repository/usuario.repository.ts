import { createClient } from "@/lib/supabase/server";

interface ApiBaseResponse<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}
export class UsuarioRepository {
  static async findByAuthId(authId: string): Promise<ApiBaseResponse<UserDB>> {
    const supabase = await createClient();
    const { data: usuario, error } = await supabase
      .from("Usuarios")
      .select("*")
      .eq("auth_id", authId)
      .maybeSingle();

    if (error || !usuario) {
      return {
        ok: false,
        data: null,
        error: error?.message ?? "Usuario no encontrado",
      };
    }

    return {
      ok: true,
      data: usuario,
      error: null,
    };
  }
}
