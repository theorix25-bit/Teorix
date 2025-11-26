"use client";
import { useEffect, useRef } from "react";
import Player, { VimeoUrl } from "@vimeo/player";

export default function VimeoPlayer({ id }: { id: VimeoUrl}) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    // Crear el player
    const player = new Player(videoRef.current, {
      url: id,

      width: 800,
    });
    // FUNCIÓN PARA CUNADO LE DEN PLAY AL VIDEO
    // player.on("play", () => {
    //   console.log("Played the video");
    // });

    // Cleanup SIN async (lo exige React)
    return () => {
      player.destroy(); // no es async
    };
  }, []);

  return (
    <div className="d-flex justify-content-center py-5" ref={videoRef}></div>
  );
}
