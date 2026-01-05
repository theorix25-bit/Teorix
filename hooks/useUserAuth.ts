import { createClient } from "@/lib/supabase/server";

export default async function AuthButtonServer() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  return { user };
}
