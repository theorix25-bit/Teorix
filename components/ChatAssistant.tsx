"use client";
import Link from "next/link";
import { useState } from "react";
import teo from "@/assets/teo.png";
import Image from "next/image";
import { useUserStore } from "@/hooks/useUseStore";
import { Maximize2, X, Lock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function ChatAssistant({ urlAsistente }: { urlAsistente: string }) {
  const [token, setToken] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const { plan, user, loading } = useUserStore();
  const body = user ? { user, plan } : {};

  const toggleChat = async () => {
    if (!open && !token && user) {
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

  return loading ? null : (
    <>
      {/* Botón flotante con efecto de pulso si no hay sesión */}
      <div className="fixed bottom-5 left-4 z-[100] group">
        <Image
          alt="Teo"
          src={teo}
          onClick={toggleChat}
          className={`w-20 md:w-28 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 `}
        />
        {!open && (
           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-lima text-black text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
             HOLA, SOY TEO*
           </div>
        )}
      </div>

      {open && (
        <div
          className={`fixed transition-all duration-500 ease-in-out z-[1500] overflow-hidden border border-white/10 backdrop-blur-xl bg-carbon/95 shadow-2xl rounded-3xl
            ${fullscreen 
              ? "inset-2 md:inset-4 w-auto h-auto" 
              : "left-4 bottom-6 md:bottom-5 w-[90dvw] h-[88dvh] md:w-[400px] md:h-[530px]"
            }`}
        >
          {/* Header Superior Estilo OS */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#151D2C]">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-lima animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">Teox* Core v2.0</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFullscreen(!fullscreen)} className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                <Maximize2 size={16} />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-white/40 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {!token ? (
            /* VISTA DE ACCESO RESTRINGIDO (MARKETING UI) */
            <div className="p-8 flex flex-col h-[calc(100%-60px)] relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -top-20 -right-20 size-40 bg-lima/10 blur-[60px] rounded-full" />
              
              <div className="flex-1 space-y-4 relative z-10">
                <div className="size-16 bg-lima/10 rounded-2xl flex items-center justify-center border border-lima/20 mb-4">
                  <Lock className="text-lima" size={32} />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    DESBLOQUEA TU <br />
                    <span className="text-lima italic">POTENCIAL IA</span>
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2 font-medium">
                    Para acceder a mi cerebro de datos necesitas ser parte del Círculo Teorix*.
                  </p>
                </div>

                <ul className="space-y-2">
                  {[
                    "Resolución de dudas 24/7",
                    "Predicción de preguntas de examen",
                    "Análisis de tus puntos débiles",
                    "Estrategias personalizadas"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-zinc-300">
                      <CheckCircle2 size={14} className="text-lima" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 relative z-10 mt-auto">
                {!user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/auth/login" className="py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl text-center transition-all">
                      LOGIN
                    </Link>
                    <Link href="/auth/sign-up" className="py-3 bg-lima hover:bg-lima/80 text-black text-xs font-bold rounded-xl text-center transition-all">
                      REGISTRO
                    </Link>
                  </div>
                ) : (
                  <Link href="/#modo" className="group flex items-center justify-between p-4 bg-gradient-to-r from-lima to-lima/80 text-black font-bold rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(191,255,0,0.4)]">
                    <span>UPGRADE AL PLAN PRO</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                
                <p className="text-[10px] text-center text-zinc-500 font-mono">
                ¿LISTOS PARA INICIAR?
                </p>
              </div>
            </div>
          ) : (
            /* VISTA DEL IFRAME (ASISTENTE ACTIVO) */
              //  <iframe
              //   src={`${urlAsistente}/?token=${token}`}
              //   allow="microphone"
              //   allowFullScreen
              //   className="w-full h-full border-none opacity-0 animate-in fade-in duration-1000 fill-mode-forwards"
              // />
              <iframe
              src={`${urlAsistente}/?token=${token}`}
              allow="microphone"
              allowFullScreen
              className="w-full h-[calc(100%-60px)] border-none"
            />
          )}
        </div>
      )}
    </>
  );
}