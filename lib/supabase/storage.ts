import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUrlPrivate(path: string) {
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(path, 60 * 60);
  return data?.signedUrl;
}
