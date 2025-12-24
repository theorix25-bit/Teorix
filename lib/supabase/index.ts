import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
import { supabaseAdmin } from "./admin";
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
export async function getUserDBForId(id: string | undefined) {
  let { data: usuarios, error } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("auth_id", id);
  if (usuarios?.length == 0)
    console.error("problemas al buscar el usuario por auth_id");
  if (error) throw error;
  return usuarios || [];
}
export async function getUserAuthId() {
  const { data, error } = await supabase.auth.getClaims();
  if (error) console.error("error al buscar el authId");
  return data?.claims.sub;
}
export async function getPlanDBForId(link: ParamValue) {
  let { data: suscripciones, error } = await supabase
    .from("suscripciones")
    .select("*")
    .eq("link", link);

  return suscripciones;
}
export async function DeleteUser(id: string) {
  const { data, error } = await supabase
    .from("Usuarios")
    .delete()
    .eq("auth_id", id);
  return { data, error };
}


/* 
FUNCIONES PARA EL CONTENIDO
*/
/**
 * Traer todo el contenido
 */
export async function getAllContent() {
  const { data: contenido, error: contenidoError } = await supabase
    .from("contenido")
    .select("*")
    .order("orden", { ascending: true });

  if (contenidoError) {
    console.error("Error cargando contenido:", contenidoError);
    throw contenidoError;
  }
  return contenido;
}
/**
 * Requiere actualización: Agregar el parámetro de tipo y pasarlo como filtro
 *
 */
export async function getContentClases(): Promise<Clases_b[]> {
  let { data, error } = await supabase
    .from("contenido")
    .select("*")
    .eq("tipo", "clase");
  if (error) return [];
  return data || [];
}
export async function getDBCarnetB<T>(): Promise<T[]> {
  // Debería recibir un id
  const { data, error } = await supabase.from("clases").select("*");
  if (error || !data) {
    console.error("Error al obtener carnet B:", error);
    return [] as T[];
  }
  return (data || []) as T[];
}
export async function getDBTema<T>(claseId: number): Promise<T[]> {
  const { data, error } = await supabase
    .from("temas")
    .select("*")
    .eq("clase_id", claseId)
    .order("id");

  if (error || !data) {
    console.error("Error al obtener carnet B:", error);
    return [];
  }
  return data;
}
export async function getDBSubTema<T>(temaId: number): Promise<T[]> {
  const { data, error } = await supabase
    .from("subtemas")
    .select("*")
    .eq("tema_id", temaId)
    .order("id");

  if (error || !data) {
    console.error("Error al obtener el sub Tema:", error);
    return [];
  }
  return data;
}
export async function getDBTemaSlug<T>(slug: string): Promise<T> {
  const { data, error } = await supabase
    .from("clases")
    .select("*, temas(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error al obtener el slug:", error);
    // return [];
  }
  return data;
}
export async function getDBSubTemaSlug<T>(slug: string): Promise<T[]> {
  let { data, error } = await supabase
    .from("temas")
    .select("*")
    .eq("slug", slug);

  if (error) {
    console.error("Error al obtener el slug:", error);
    return [] as T[];
  }

  return (data ?? []) as T[];
}


/* 
FUNCIONES PARA EL PROGRESO
*/
/**
 * traer el progreso del usuario
 */
export async function getUserProgress(userId: number) {
  // 2. Traer el progreso del usuario SOLO para subtemas
  const { data: progreso, error: progresoError } = await supabase
    .from("progreso")
    .select("*")
    .eq("usuario_id", userId);

  if (progresoError) {
    console.error("Error cargando progreso:", progresoError);
    throw progresoError;
  }
  return progreso || [];
}
/**
 * Trae el progreso del usuario de filtrado por etapa
 *  */

export async function getProgress(userId: number) {
  const contenido = await getAllContent();
  const progreso = await getUserProgress(userId);
  // Convertir progreso en un mapa para lookup rápido
  const progresoMap = {} as any;
  progreso.forEach((p) => {
    progresoMap[p.contenido_id] = p;
  });

  // 3. Armar jerarquía: clases → temas → subtemas
  const clases = contenido.filter((c) => c.tipo === "clase");

  const result = clases.map((clase) => {
    const temas = contenido.filter(
      (t) => t.tipo === "tema" && t.padre_id === clase.id
    );

    const temasConProgreso = temas.map((tema) => {
      const subtemas = contenido.filter(
        (s) => s.tipo === "subtema" && s.padre_id === tema.id
      );

      const subtemasConProgreso = subtemas.map((sub) => ({
        ...sub,
        progreso: progresoMap[sub.id] || {
          completado: false,
          completado_en: null,
        }, // si no existe, progreso = false
      }));

      return {
        ...tema,
        subtemas: subtemasConProgreso,
        completado: subtemasConProgreso.every(
          (s) => s.progreso.completado === true
        ),
      };
    });

    return {
      ...clase,
      temas: temasConProgreso,
      completado: temasConProgreso.every((t) => t.completado === true),
    };
  });

  return result;
}
export async function getContent2() {
  const { data, error } = await supabase
    .from("contenido_2")
    .select("*")
    .order("orden", { ascending: true });
  if (error) console.error("error al traer el contenido", error);
  return data ?? [];
}
export async function getProgress2(usuario_id: number) {
  const { data, error } = await supabase
    .from("progresos_2")
    .select("*")
    .eq("usuario_id", usuario_id);
  if (error) console.error("Error al traer el progreso del usuario");
  return data ?? [];
}


/* 
FUNCIONES PARA LAS SUSCRIPCIONES 
*/
export async function getPlansDB(): Promise<PlanDetails[]> {
  let { data: suscripciones, error } = await supabase
    .from("suscripciones")
    .select("*");
  const sortedSuscripciones = suscripciones?.sort((a, b) => {
    if (a.precio < b.precio) return -1;
    if (a.precio > b.precio) return 1;
    return 0;
  });
  return sortedSuscripciones || [];
}
export async function searchSusUser(
  AuthId: string | undefined
): Promise<Subscription[]> {
  const { data } = await supabase
    .from("usuarios_suscripciones")
    .select("*")
    .eq("usuario_id", AuthId);

  return data ?? [];
}
/**
 * FUNCIÓN PARA TRAER EL PLAN DE UN USUARIO POR SU ID DE LA TABLA usuarios_suscripciones
 * @property {number} id
 * @return Subscription[] 

 */
export async function getPlanUser(id: number) {
  const { data } = await supabase
    .from("usuarios_suscripciones")
    .select("*")
    .eq("usuario_id", id);

  return data ?? [];
}
export async function upDateSusUser(usuario_id: number, numberPlan: number) {
  const { data, error } = await supabase
    .from("usuarios_suscripciones")
    .update({ suscripcion_id: numberPlan })
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
  const result = await supabase.auth.admin.deleteUser(id);
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
