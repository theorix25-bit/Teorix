import { createClient } from "@/lib/supabase/server";
import { PlanUsuarioDB } from "@/types/supaBase/planUsuario";

interface ApiBaseResponse<T> {
  ok: boolean;
  data: T | null;
  error: string | null;
}
export class PlanUsuarioRepository {
  static async findByAuthId(usuarioId: number): Promise<ApiBaseResponse<PlanUsuarioDB>> {
    const supabase = await createClient();
    const { data: planUsuario, error } = await supabase
      .from("Planes_usuarios")
      .select("*")
      .eq("usuario_id", usuarioId)
      .maybeSingle();

    if (error || !planUsuario) {
      return {
        ok: false,
        data: null,
        error: error?.message ?? "Plan Usuario no encontrado",
      };
    }

    return {
      ok: true,
      data: planUsuario,
      error: null,
    };
  }
}
