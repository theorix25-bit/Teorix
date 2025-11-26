"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChatAssistant({urlAsistente}:{urlAsistente:string}) {
  const [token, setToken] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleChat = async () => {
    if (!open && !token) {
      const res = await fetch("/api/asistente");
      const data = await res.json();

      setToken(data.token);
    }

    setOpen(!open);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const closeChat = () => {
    setOpen(false);
    setFullscreen(false);
  };
  return (
    <>
      {/* Botón flotante */}
      <img
        src="https://icons.veryicon.com/png/o/miscellaneous/jinfeng-information-technology/chat-118.png"
        onClick={toggleChat}
        className="fixed bottom-5 bg-lima rounded-full p-2 left-5 w-10 cursor-pointer z-[1001] transition-transform active:scale-90"
      />

      {open && (
        <div
          className={`fixed  ${fullscreen? "bottom-2 left-3": "left-5 bottom-20"} bg-white rounded-xl shadow-xl overflow-hidden z-[1500] transition-all
            ${fullscreen ? "w-[97vw] h-[98vh] " : " w-[90vw] h-[80vh] lg:w-[30vw] lg:h-[75vh]"}`}
        >
          {token && (
            <div className="absolute top-2 right-2 flex gap-2 z-[1100]">
              <button
                onClick={toggleFullscreen}
                className="bg-black/20 hover:bg-black/40 text-white px-3 py-1 rounded"
              >
                ⛶
              </button>
              <button
                onClick={closeChat}
                className="bg-black/20 hover:bg-black/40 text-white px-3 py-1 rounded"
              >
                x
              </button>
            </div>
          )}

          {!token ? (
            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold mb-3">Hola Bienvenido</h3>
                Inicia Sesión para usar el Asistente
              </div>
              <div className="flex gap-3 justify-center">
                <Link
                  href={"/auth/login"}
                  onClick={() => setOpen(false)}
                  className="border px-3 py-2 rounded-lg w-1/2 text-center"
                >
                  Ingresar
                </Link>
                <Link
                  href={"/auth/sign-up"}
                  onClick={() => setOpen(false)}
                  className="border px-3 py-2 rounded-lg w-1/2 text-center"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          ) : (
            <iframe
              src={`${urlAsistente}/?token=${token}`}
              allow="microphone"
              allowFullScreen
              className="w-full h-full border-none"
            />
          )}
        </div>
      )}
    </>
  );
}
