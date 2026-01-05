import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import Clases from "@/components/Clases";
import { createClient } from "@/lib/supabase/server";

export default async function PageClases() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const auth = data?.claims.sub;

  let { data: user } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("auth_id", data?.claims.sub);
  const isLogged = user?.length == 0;

  return !isLogged ? <Clases /> : <RegistroCompletoUsuario />;
}
