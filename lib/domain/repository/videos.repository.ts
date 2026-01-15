import { VideosDB } from "@/types/supaBase/videos";
import { VideosDTO } from "../dto/videos.dto";
import { createClient } from "@/lib/supabase/server";

export class VideosRepository {
  static async getAllVideos(): Promise<ApiBaseResponse<VideosDB[]>> {
    const supabase = await createClient();

    const { data: videos, error } = await supabase
      .from("videos")
      .select("*")
      .order("orden", { ascending: true });

    return error || !videos || videos.length === 0
    ? {
        ok: false,
        data: null,
        error: error?.message ?? "Videos no encontrados",
      }
    : { ok: true, data: videos, error: null };
  }
}
