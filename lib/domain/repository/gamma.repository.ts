import { createClient } from "@/lib/supabase/server";
import { GammaDB } from "@/types/supaBase/gamma";
import { PlanDB } from "@/types/supaBase/planes";

export class GammaRepository {
  static async findAllDocs(): Promise<ApiBaseResponse<GammaDB[]>> {
    const supabase = await createClient();
    const { data: gamma, error } = await supabase
      .from("gramma")
      .select("*")
      .order("orden", { ascending: true });

    return error || !gamma || gamma.length === 0
      ? {
          ok: false,
          data: null,
          error: error?.message ?? "Videos no encontrados",
        }
      : { ok: true, data: gamma, error: null };
  }
}
