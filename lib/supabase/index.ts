import { createClient } from "@/lib/supabase/client";
import { ParamValue } from "next/dist/server/request/params";
import Stripe from "stripe";
const supabase = createClient();

// FUNCIÓN PARA TRAER LOS DATOS DE UN USUARIO DE LA BASE DE DATOS POR ID
export async function getUserDBForId(id: string) {
  let { data: usuarios, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("auth_id", id);
  return { usuarios };
  // NOTA REFACTORIZAR ESTA FUNCTION PARA QUE SOLO DEVUELVA USUARIOS SIN LOS {}
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

// FUNCIÓN PARA TRAER TODOS LOS PLANES DE LA BASE DE DATOS
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

  const idSubscription = usuario.usuarios && usuario.usuarios[0].id;
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
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
      emailRedirectTo,
    },
  });
  return error;
}
// FUNCIÓN PARA ELIMINAR TOTALMENTE EL USUARIO DE LA BASE DE DATOS
export async function deleteUserInAuth(id: string) {
  const result = await supabase.auth.admin.deleteUser(id);
  return result;
}

export async function updateTableDB(table: string, update: {}) {
  const { error } = await supabase.from(table).insert(update);
  return { error };
}
// FUNCIÓN PARA SUBIR ARCHIVOS AL STORAGE
export async function uploadFileStorage(filePath: string, file: any) {
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);
  return { data, error };
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
export async function getBlog(slug:string) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}

