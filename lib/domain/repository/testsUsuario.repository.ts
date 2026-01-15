import { createClient } from "@/lib/supabase/server";
import { BlogsDB } from "@/types/blog";
import { TestsUsuarioDB, TestsUsuarioUpdateDB } from "@/types/supaBase/testsUsuarios";
import { ok } from "assert";

export class TestsUsuarioRepository {
  static async getTestForByAuthId(
    authId: string
  ): Promise<ApiBaseResponse<TestsUsuarioDB[]>> {
    const supabase = await createClient();

    const { data: test, error } = await supabase
      .from("Tests_Usuarios")
      .select("*")
      .eq("user_id", authId)
    return error || !test || test.length === 0
      ? {
          ok: false,
          data: null,
          error: error?.message ?? "Test no encontrados",
        }
      : { ok: true, data: test, error: null };
  }
  static async createTestsUsuarioDB(authId: string): Promise<{ ok: boolean }> {
    const supaBase = await createClient();
    const { data: res, error } = await supaBase
      .from("Tests_Usuarios")
      .insert([{ user_id: authId, pregunta_actual: 0, puntos: 0, racha: 0 }])
      .select("*");
    return error || !res || res.length === 0 ? { ok: false } : { ok: true };
  }
  static async UpDateTestsUsuario(authId: string, update:TestsUsuarioUpdateDB): Promise<{ ok: boolean }> {
    const supabase = await createClient()
    const {} = await supabase.from("Tests_Usuarios").update(update).eq("user_id",authId)
    return { ok: true };

  }
}
