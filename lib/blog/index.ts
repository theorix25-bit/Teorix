import { BlogsDB } from "@/types/blog";
import { createClient } from "../supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

export interface Blog {
  id?: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image_url?: string;
  meta_title: string;
  meta_description: string;
  created_at?: string;
  updated_at?: string;
}
const supabase = createClient();
export async function getAllBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || data.length === 0 || data === null)
    throw new Error("Error al traer los blogs");
  return { data, error };
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()
    
  if (error || data == null) {
    // throw new Error("error category");
    return {data:[],error}
  }
  return { data, error };
}

export async function getBlogByCategory(category: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("category", category);
  if (error || !data) {
    throw new Error("error category");
  }
  return { data, error };
}

export async function createBlog(blog: Blog) {
  const { data, error } = await supabase
    .from("blogs")
    .insert(blog)
    .select("*")
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
