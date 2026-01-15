import { createClient } from "@/lib/supabase/server";
import { BlogsDB } from "@/types/blog";

export class BlogsRepository {
  static async getAllBlogs(): Promise<ApiBaseResponse<BlogsDB[]>> {
    const supabase = await createClient();

    const { data: blogs, error } = await supabase.from("blogs").select("*");

    return error || !blogs || blogs.length === 0
      ? {
          ok: false,
          data: null,
          error: error?.message ?? "Blogs no encontrados",
        }
      : { ok: true, data: blogs, error: null };
  }
}
