import { createClient } from "@/lib/supabase/server";
import { PlanUsuarioDB } from "@/types/supaBase/planUsuario";


export class PlanUsuarioRepository {
  static async findByAuthId(usuarioId: number): Promise<ApiBaseResponse<PlanUsuarioDB>> {
    const supabase = await createClient();
    const { data: planUsuario, error } = await supabase
      .from("Planes_usuarios")
      .select("*")
      .eq("usuario_id", usuarioId)
      .maybeSingle();

    return error || !planUsuario || planUsuario.length === 0
    ? {
        ok: false,
        data: null,
        error: error?.message ?? "Videos no encontrados",
      }
    : { ok: true, data: planUsuario, error: null };
  }
}
