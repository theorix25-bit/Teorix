"use client";

import { useUserStore } from "@/hooks/useUseStore";
import { useEffect, useRef, useState } from "react";
interface TypeVimeo {
  videoId: number;
  duration: number;
  name: string;
}
export default function VimeoPlayer({ id }: { id: number | null }) {
  const [video, setVideo] = useState<TypeVimeo>();
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const completadoRef = useRef(false);
  const userId = useUserStore((s) => s.user?.[0].id);

  const guardar = async (videoId: number | null, userId: number) => {
    try {
      const res = await fetch("/api/vimeo/completar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, userId }),
      });
      const data = await res.json();
      if (data.status == 200) {
        alert("video actualizado");
      }
    } catch (error) {
      console.error("Error guardando progreso del video", error);
    }
  };
  useEffect(() => {
    let mounted = true;
    const fetchVideo = async () => {
      try {
        const res = await fetch("/api/vimeo/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
          cache: "force-cache",
        });

        if (!res.ok) throw new Error();
        const data = await res.json();

        if (data.status == 401) {
          setError("no se obtuvo el id del video");
        }
        if (mounted) {
          const { uri, duration, name } = data[0];
          setVideo({
            videoId: Number(uri.split("/").pop()),
            duration,
            name,
          });
        }
      } catch {
        if (mounted) setError("No se pudo cargar el video");
      }
    };

    fetchVideo();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!video || !videoRef.current || userId == undefined) return;

    let destroyed = false;

    const initPlayer = async () => {
      const Player = (await import("@vimeo/player")).default;

      if (destroyed) return;

      const player = new Player(videoRef.current!, {
        id: video.videoId,
        playsinline: true,
        dnt: true,
        responsive: true,
        autopause: true,
        title: false,
        byline: false,
        portrait: false,
      });
      playerRef.current = player;

      player.on("ended", () => {
        if (completadoRef.current) return;
        completadoRef.current = true;
        guardar(id, userId);
      });
    };
    initPlayer();
    completadoRef.current = false;
    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [video?.videoId]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-center py-5">
        <div
          className=" vimeo-wrapper relative w-full max-w-[1100px] aspect-video"
          ref={videoRef}
        >
          {!video && (
            <div className="mb-8 ">
              <div className="relative w-auto aspect-video bg-zinc-800 animate-pulse rounded-xl border-2 border-gray-50/20 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-950 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style></style>
    </>
  );
}
