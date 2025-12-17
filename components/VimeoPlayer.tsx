"use client";

import { useEffect, useRef, useState } from "react";

export default function VimeoPlayer({ nombre }: { nombre: string | null }) {
  const [videoUrl, setVideoUrl] = useState<VimeoUrl>();
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    const fetchVideo = async () => {
      try {
        const res = await fetch("/api/vimeo/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre }),
          cache: "force-cache",
        });

        if (!res.ok) throw new Error();
        const data = await res.json();

        if (data.status == 401) {
          setError("no se obtuvo el nombre del video");
        }
        if (mounted) {
          setVideoUrl(data[0].player_embed_url);
        }
      } catch {
        if (mounted) setError("No se pudo cargar el video");
      }
    };

    fetchVideo();
    return () => {
      mounted = false;
    };
  }, [nombre]);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    let destroyed = false;

    const initPlayer = async () => {
      const Player = (await import("@vimeo/player")).default;

      if (destroyed) return;

      playerRef.current = new Player(videoRef.current!, {
        url: videoUrl,
        controls: true,
        playsinline: true,
        dnt: true,
      });
    };

    initPlayer();

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoUrl]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-center py-5">
        <div
          className=" vimeo-wrapper relative w-full max-w-[1100px] aspect-video"
          ref={videoRef}
        >
          {!videoUrl && (
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
