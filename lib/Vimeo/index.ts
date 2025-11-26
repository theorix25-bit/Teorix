import { createClient } from "@/lib/supabase/client";
import { createClientVimeo } from "@/lib/Vimeo/client";
const client = createClientVimeo();
const supabase = createClient();

/* 
✔ Devuelve todos los videos del usuario
✔ Sirve para armar tu panel de administración
✔ Cada video trae: id, thumbnail, duración, visibilidad, etc.
*/
export function getVideos() {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: "/me/videos",
        query: {
          per_page: 100,
          page: 1,
        },
      },
      function (error, body) {
        if (error) return reject(error);
        resolve(body.data);
      }
    );
  });
}
/* 
Recupera:
título, descripción, duración, privacidad, archivos disponibles, thumbnails, stats básicas  */
export function getVideoById(id: string) {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: `/videos/${id}`,
      },
      function (error, body) {
        if (error) return reject(error);
        resolve(body);
      }
    );
  });
}
/* 
✔ Busca por texto, no por ID
✔ Ideal para paneles de administración o autocompletado
✔ Devuelve todos los videos cuyo título contenga el texto buscado
*/
export function searchVideo(title: string) {
  return new Promise<Video[]>((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: "/me/videos",
        query: {
          query: title,
          per_page: 50,
        },
      },
      function (error, body) {
        if (error) return reject(error);
        resolve(body.data);
      }
    );
  });
}

/* 
reproducciones, likes, comentarios
*/
export function getVideoStats(id: string) {
  return new Promise((resolve, reject) => {
    client.request(
      {
        method: "GET",
        path: `/videos/${id}/stats`,
      },
      function (error, body) {
        if (error) return reject(error);
        resolve(body);
      }
    );
  });
}

/* 
✔ Mantiene tu base sincronizada automáticamente
✔ Tus videos aparecen en tu panel sin subir URLs manualmente
*/

export async function syncVideos() {
  const videos: any = await getVideos();

  for (const v of videos) {
    const videoId = v.uri.split("/").pop(); // extraer id

    await supabase.from("videos").upsert({
      id: videoId,
      title: v.name,
      description: v.description,
      thumbnail: v.pictures?.sizes?.[3]?.link,
      duration: v.duration,
      privacy: v.privacy?.view,
      embed_url: v.player_embed_url,
      created_at: new Date().toISOString(),
    });
  }

  return { success: true, total: videos.length };
}


