import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
import { supabaseAdmin } from "./admin";
const supabase = createClient();

/**
 * Traer todos los usuarios
 */
export async function getAllUser(): Promise<User[]> {
  let { data: usuarios, error } = await supabase.from("usuarios").select("*");
  if (error) {
    throw error;
  }
  return usuarios || [];
}

// FUNCIÓN PARA TRAER LOS DATOS DE UN USUARIO DE LA BASE DE DATOS POR ID
export async function getUserDBForId(id: string) {
  let { data: usuarios, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("auth_id", id);

  if (error) throw error;
  return usuarios || [];
}

// FUNCIÓN PARA TRAER LOS DATOS DEL USUARIO EN SESIÓN ACTIVA
export async function getUserAuthId() {
  const { data } = await supabase.auth.getClaims();
  return data?.claims.sub!;
}

// FUNCIÓN PARA TRAER UN PLAN POR ID ESPECIFICO
export async function getPlanDBForId(Name: ParamValue) {
  let { data: suscripciones, error } = await supabase
    .from("suscripciones")
    .select("*")
    .eq("link", Name);

  return suscripciones;
}

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

export async function getContentClases(): Promise<Clases_b[]> {
  let { data, error } = await supabase
    .from("contenido")
    .select("*")
    .eq("tipo", "clase");
  if (error) return [];
  return data || [];
}

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

// FUNCIÓN PARA TRAER TODOS LOS PLANES DE LA BASE DE DATOS
export async function getPlansDB() :Promise<PlanDetails[]> {
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

// FUNCIÓN PARA BUSCAR EL PLAN DE UN USUARIO
export async function searchSusUser(sub: string): Promise<Subscription[]> {
  const usuarios = await getUserDBForId(sub);

  const id = usuarios[0].id;
  const { data } = await supabase
    .from("usuarios_suscripciones")
    .select("*")
    .eq("id", id);

  return data ?? [];
}
// FUNCIÓN PARA ACTUALIZAR LA TABLA DE SUSCRIPCIONES EN LA BASE DE DATOS
export async function upDateSusUser(
  id: String | undefined,
  plan: number | string | undefined
) {
  const { data, error } = await supabase
    .from("usuarios_suscripciones")
    .update({ suscripcion_id: plan })
    .eq("id", id)
    .select();
  console.log(data);
  return data;
}

// FUNCIÓN PARA ELIMINAR UN USUARIO DE LA TABLA DE USUARIOS
export async function DeleteUser(id: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .delete()
    .eq("auth_id", id);
  return { data, error };
}

// FUNCIÓN PARA REGISTRAR LOS ERRORES Y GUARDARLO EN LA BASE DE DATOS
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

// FUNCIÓN PARA ACTUALIZAR EL PLAN DE UN USUARIO
export async function updatePlanUser(
  id: string | undefined,
  idPlan: number | string | undefined
) {
  const usuario = await getUserDBForId(id!);

  const idSubscription = usuario && usuario[0].id;
  const sus = await upDateSusUser(idSubscription, idPlan);
}

// FUNCIÓN PARA AUTENTICAR NUEVOS USUARIOS
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

// FUNCIÓN PARA ELIMINAR TOTALMENTE EL USUARIO DE LA BASE DE DATOS
export async function deleteUserInAuth(id: string) {
  const result = await supabase.auth.admin.deleteUser(id);
  return result;
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
// FUNCIÓN PARA SUBIR ARCHIVOS AL STORAGE
export async function uploadFileStorage(filePath: string, file: any) {
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);
  return { data, error };
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
**************************
ANALIZAR CADA FUNCIONA PARA REFACTORIZAR
**************************
*/

// 📌 LISTAR TODOS LOS BUCKETS
export async function listBuckets() {
  const { data, error } = await supabase.storage.listBuckets();
  return { data, error };
}

// 📌 OBTENER UN BUCKET POR NOMBRE
export async function getBucket(bucket: string) {
  const { data, error } = await supabase.storage.getBucket(bucket);
  return { data, error };
}

// 📌 CREAR UN BUCKET
export async function createBucket(
  bucket: string,
  options = { public: false }
) {
  const { data, error } = await supabase.storage.createBucket(bucket, options);
  return { data, error };
}

// 📌 VACIAR BUCKET
export async function emptyBucket(bucket: string) {
  const { data, error } = await supabase.storage.emptyBucket(bucket);
  return { data, error };
}

// 📌 ELIMINAR UN BUCKET
export async function deleteBucket(bucket: string) {
  const { data, error } = await supabase.storage.deleteBucket(bucket);
  return { data, error };
}

// ===============================
// 📁 FUNCIONES POR BUCKET (ARCHIVOS)
// ===============================

// 📌 SUBIR ARCHIVO (NO sobrescribe)
export async function uploadFile(bucket: string, filePath: string, file: any) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  return { data, error };
}

// 📌 ACTUALIZAR ARCHIVO (sobrescribe)
export async function updateFile(bucket: string, filePath: string, file: any) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .update(filePath, file);
  return { data, error };
}

// 📌 DESCARGAR ARCHIVO
export async function downloadFile(bucket: string, filePath: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filePath);
  return { data, error };
}

// 📌 LISTAR ARCHIVOS EN UNA CARPETA
export async function listFiles(
  bucket: string,
  folder: string = "",
  options: any = {}
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, options);
  return { data, error };
}

// 📌 OBTENER URL PÚBLICA
export async function getPublicUrl(bucket: string, filePath: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

// 📌 URL FIRMADA (privados)
export async function getSignedUrl(
  bucket: string,
  filePath: string,
  expiresIn: number = 60
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);
  return { data, error };
}

// 📌 URLS FIRMADAS (varias)
export async function getMultipleSignedUrls(
  bucket: string,
  paths: string[],
  expiresIn: number = 60
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrls(paths, expiresIn);
  return { data, error };
}

// 📌 ELIMINAR ARCHIVOS
export async function removeFiles(bucket: string, paths: string[]) {
  const { data, error } = await supabase.storage.from(bucket).remove(paths);
  return { data, error };
}

// 📌 MOVER ARCHIVO
export async function moveFile(bucket: string, from: string, to: string) {
  const { data, error } = await supabase.storage.from(bucket).move(from, to);
  return { data, error };
}

// 📌 COPIAR ARCHIVO
export async function copyFile(bucket: string, from: string, to: string) {
  const { data, error } = await supabase.storage.from(bucket).copy(from, to);
  return { data, error };
}

export async function getBlogs() {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return data;
}
export async function getBlog(slug: string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}
