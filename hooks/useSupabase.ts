import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
const supabase = createClient();

export async function getUserDBForId(id: string) {
  let { data: usuarios, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("auth_id", id);
  return { usuarios };
}

export async function getUserAuthId() {
  const { data } = await supabase.auth.getClaims();
  return data?.claims.sub;
}


export async function getPlanDBForId(Name: ParamValue) {
  let { data: suscripciones, error } = await supabase
    .from("suscripciones")
    .select("*")
    .eq("link", Name);

  return suscripciones;
}

export async function getPlansDB() {
  let { data: suscripciones, error } = await supabase
    .from("suscripciones")
    .select("*");
  const sortedSuscripciones = suscripciones?.sort((a, b) => {
    if (a.precio < b.precio) return -1;
    if (a.precio > b.precio) return 1;
    return 0;
  });
  return sortedSuscripciones;
}

export async function DeleteUser(id: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .delete()
    .eq("auth_id", id);
  return { data, error };
}

export async function setErrorLog({
  authId,
  details,
  mensaje,
  origin,
}: ErrorLog) {
  const { data, error } = await supabase.from("logs_errores").insert([
    {
      mensaje: mensaje,
      origen: origin,
      detalles: details,
      creado_en: new Date(),
      auth_id: authId,
    },
  ]);
  return { data, error };
}
