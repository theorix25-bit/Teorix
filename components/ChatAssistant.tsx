"use client";
import Link from "next/link";
import { useState } from "react";
import teo from "@/assets/teo.png";
import Image from "next/image";
import { useUserStore } from "@/hooks/useUseStore";

export default function ChatAssistant({
  urlAsistente,
}: {
  urlAsistente: string;
}) {
  const [token, setToken] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const { plan, user, loading } = useUserStore();

  const body = user ? { user, plan } : {};

  const toggleChat = async () => {
    if (!open && !token) {
      const res = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

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
  return loading ? (
    ""
  ) : (
    <>
      {/* Botón flotante */}
      <Image
        alt="Teo"
        src={teo}
        onClick={toggleChat}
        id="ChatTeo"
        className="fixed bottom-5 left-[-20] hover:left-[-5] hover:scale-110 w-20 md:w-28 cursor-pointer z-[100] transition-all duration-100 active:scale-80"
      />

      {open && (
        <div
          className={`fixed  ${
            fullscreen ? "bottom-2 left-3" : "left-5 bottom-24 md:bottom-32"
          } bg-white rounded-xl shadow-xl overflow-hidden z-[1500] transition-all
            ${
              fullscreen
                ? "w-[97vw] h-[98vh] "
                : " w-[90vw] h-[80vh] lg:w-[30vw] lg:h-[75vh]"
            }`}
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
            <div className="p-5 pb-2 flex flex-col justify-between h-full text-black">
              <div>
                <h3 className="text-2xl font-bold mb-3">Hola Bienvenido</h3>
                <p className="text-md">
                  Inicia Sesión y adquiere un plan para usar el Asistente
                </p>
              </div>
              <div className="">
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
                <Link
                  href={"/#planes"}
                  className=" float-end underline"
                  onClick={() => setOpen(false)}
                >
                  Ver planes
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
