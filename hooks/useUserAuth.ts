import { createClient } from "@/lib/supabase/server";

// Este componente sigue siendo asíncrono y se ejecuta SOLO en el servidor.
export default async function AuthButtonServer() {
  const supabase = await createClient();

  // Obtener la información del usuario en el servidor (usando cookies).
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  

  return {user};
}
