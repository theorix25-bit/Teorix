import { createClient } from "@/lib/supabase/server";
import { PlanDB } from "@/types/supaBase/planes";

export class PlanesRepository {
  static async find(): Promise<ApiBaseResponse<PlanDB[]>> {
    const supabase = await createClient();
    const { data: plan, error } = await supabase
      .from("Planes")
      .select("*")
      .order("orden", { ascending: true });
    return error || !plan || plan.length === 0
      ? {
          ok: false,
          data: null,
          error: error?.message ?? "Videos no encontrados",
        }
      : { ok: true, data: plan, error: null };
  }
}
