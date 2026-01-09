import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
const supabase = createClient();

/* 
FUNCIONES PARA DATOS DE USUARIO
*/
/**
 * Traer todos los usuarios
 */
export async function getAllUser(): Promise<User[]> {
  let { data: usuarios, error } = await supabase.from("Usuarios").select("*");
  if (error) {
    throw error;
  }
  return usuarios || [];
}

export async function getPlanDBForId(link: ParamValue) {
  let { data: plan, error } = await supabase
    .from("Planes")
    .select("*")
    .eq("slug", link);

  return plan;
}
export async function DeleteUser(id: string) {
  const { data, error } = await supabase
    .from("Usuarios")
    .delete()
    .eq("auth_id", id);
  return { data, error };
}



/* 
FUNCIONES PARA LOS PLANES
*/
export async function getPlansDB(): Promise<PlanDetails[]> {
  let { data: plan, error } = await supabase
    .from("Planes")
    .select("*");
  const sortedPlanes = plan?.sort((a, b) => {
    if (a.precio < b.precio) return -1;
    if (a.precio > b.precio) return 1;
    return 0;
  });
  return sortedPlanes || [];
}
export async function searchSusUser(
  AuthId: string | undefined
): Promise<Subscription[]> {
  const { data } = await supabase
    .from("Planes_usuarios")
    .select("*")
    .eq("usuario_id", AuthId);

  return data ?? [];
}

export async function upDateSusUser(usuario_id: number, numberPlan: number) {
  const { data, error } = await supabase
    .from("Planes_usuarios")
    .update({ plan_id: numberPlan })
    .eq("usuario_id", usuario_id)
    .select();
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
export async function updatePlanUser(id: string | undefined, idPlan: number) {
  const usuario = await searchSusUser(id);
  const res = await upDateSusUser(usuario[0].usuario_id, idPlan);
  return res;
}
export async function updateTableDB(table: string, update: {}, id: number) {
  const { data, error } = await supabase
    .from(table)
    .update(update)
    .eq("id", id);

  if (error) {
    return { error };
  }
  return { data };
}

/* 
FUNCIONES PARA REGISTROS Y AUTENTICACIÓN
*/
export async function sigUpUser({
  email,
  options: {
    data: { name },
    emailRedirectTo,
  },
  password,
}: TypeSignUp) {
  const { supabaseAdmin } = await import("./admin");
  const { error, data } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
      emailRedirectTo,
    },
  });

  return { error, data };
}

export async function setAdminRole(userId: string) {
  const { supabaseAdmin } = await import("./admin");
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      app_metadata: {
        role: "admin",
      },
    }
  );

  return { data, error };
}

export async function deleteUserInAuth(id: string) {
  const { supabaseAdmin } = await import("./admin");
  const result = await supabaseAdmin.auth.admin.deleteUser(id);
  return result;
}

/* 
FUNCIONES PARA STORAGE
*/
export async function uploadFileStorage(filePath: string, file: any) {
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);
  return { data, error };
}

/* 
FUNCIONES PARA LOS VIDEOS
*/
/**
 * Realiza una búsqueda en la base de datos filtrado por id
 *
 *
 */
export async function searchVideoForId(id: number): Promise<VideosDB> {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error en la función que busca en la tabla de videos", error);
    return {} as VideosDB;
  }
  if (data == null || data == undefined) {
    console.error("Error el objeto es", data);
    return {} as VideosDB;
  }
  return (data ?? {}) as VideosDB;
}
/**
 * Función para actualizar el la tabla de progreso videos a true
 *
 */
export async function changeStateVideo(usuario_id: number, video_id: number) {
  const { error } = await supabase
    .from("progreso_video")
    .update({ completado: true })
    .eq("usuario_id", usuario_id)
    .eq("video_id", video_id)
    .eq("completado", false)
    .maybeSingle();

  if (error) {
    console.error("Error actualizando progreso:", error);
    return false;
  }
  return true;
}

/* 
FUNCIONES ADMIN
*/
export async function crearContenido(objeto: {}): Promise<Contenido> {
  const { data, error } = await supabase
    .from("Contenido")
    .insert([objeto])
    .select()
    .maybeSingle();
  if (error) console.error("Error al enviar el contenido", error);
  return (data ?? {}) as Contenido;
}

export async function actualizarContenido(
  idFilter: number,
  objeto: {}
): Promise<Contenido> {
  const { data, error } = await supabase
    .from("Contenido")
    .update(objeto)
    .eq("id", idFilter)
    .select()
    .maybeSingle();
  if (error)
    console.error(
      "Error al actualizar el Contenido de la base de datos",
      error
    );
  console.log(objeto);
  if (data == null) console.error("Error al actualizar al contenido", data);
  return (data ?? {}) as Contenido;
}
