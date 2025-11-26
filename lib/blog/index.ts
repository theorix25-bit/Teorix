import { createClient } from "../supabase/client";

export interface Blog {
  id?: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}
const supabase = createClient();
export async function getAllBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  return { data, error };
}

export async function createBlog(blog: Blog) {
  const { data, error } = await supabase
    .from("blogs")
    .insert(blog)
    .select()
    .single();

  return { data, error };
}

export async function updateBlog(id: string, blog: Blog) {
  const { data, error } = await supabase
    .from("blogs")
    .update(blog)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
}

export async function deleteBlog(id: string) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  return { error };
}
export async function getBlogById(id: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

