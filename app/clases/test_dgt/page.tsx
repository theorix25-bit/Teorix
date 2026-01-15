"use client";

import data from "@/preguntas_normalizado.json";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Flame,
  Star,
} from "lucide-react";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { ApiResponse } from "@/types";
import { TestsUsuarioUpdateDTO } from "@/lib/domain/dto/testsUsuario.dto";

/* --------------------------------
   Skeleton Component
---------------------------------*/
function SkeletonQuiz() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-2xl
          rounded-3xl
          bg-zinc-950
          border border-zinc-800
          p-6
          animate-pulse
        "
      >
        <div className="space-y-4 mb-6">
          <div className="h-2 w-full bg-zinc-800 rounded-full" />
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-zinc-800 rounded-md" />
            <div className="h-4 w-20 bg-zinc-800 rounded-md" />
          </div>
          <div className="h-6 w-3/4 mx-auto bg-zinc-800 rounded-lg" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 w-full bg-zinc-900 border border-zinc-800 rounded-xl"
            />
          ))}
        </div>

        <div className="mt-6">
          <div className="h-12 w-full bg-zinc-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}


function Page() {
  const { playCorrect, playWrong } = useQuizSounds();

  const [num, setNum] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [correcto, setCorrecto] = useState<boolean | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [cargando, setCargando] = useState(true);

  /* -----------------------------
     CARGAR PROGRESO
  ------------------------------*/
  useEffect(() => {
    cargarProgreso();
  }, []);

  async function cargarProgreso() {
    try {
      const res = await fetch("/api/tests");
      const json: ApiResponse<TestsUsuarioUpdateDTO[]> = await res.json();
      const result = json.data;

      if (!result || result.length === 0) {
        setNum(0);
        return;
      }
      

      setNum(result[0].preguntaActual);
      setPuntos(result[0].puntos);
      setRacha(result[0].racha);
    } catch (error) {
      console.error("Error cargando progreso", error);
      setNum(0);
    } finally {
      setCargando(false);
    }
  }

  /* -----------------------------
     GUARDAR PROGRESO
  ------------------------------*/
  async function guardarProgreso(
    nextNum: number,
    nextPuntos: number,
    nextRacha: number
  ) {
    try {
      await fetch("/api/tests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta_actual: nextNum,
          puntos: nextPuntos,
          racha: nextRacha,
        }),
      });
    } catch (error) {
      console.error("Error guardando progreso", error);
    }
  }

  /* -----------------------------
     EVALUAR RESPUESTA
  ------------------------------*/
  function evaluarRespuesta(index: number) {
    if (respondido || num === null) return;

    const preguntaActual = data[num];
    const esCorrecta = index === preguntaActual.correcta;

    setRespondido(true);
    setCorrecto(esCorrecta);

    if (esCorrecta) {
      const nuevosPuntos = puntos + 10;
      const nuevaRacha = racha + 1;

      setPuntos(nuevosPuntos);
      setRacha(nuevaRacha);

      playCorrect();
      toast.success("¡Correcto! +10 puntos 🔥");

      guardarProgreso(num, nuevosPuntos, nuevaRacha);
    } else {
      setRacha(0);

      playWrong();
      toast.error("Respuesta incorrecta 😕");

      guardarProgreso(num, puntos, 0);
    }
  }

  /* -----------------------------
     SIGUIENTE PREGUNTA
  ------------------------------*/
  function siguientePregunta() {
    if (num === null) return;

    const next = num + 1;

    // Fin del quiz
    if (next >= data.length) {
      toast.success("🎉 Test completado");
      guardarProgreso(num, puntos, racha);
      return;
    }

    setRespondido(false);
    setCorrecto(null);
    setNum(next);

    guardarProgreso(next, puntos, racha);
  }

  /* -----------------------------
     GUARD DE RENDER
  ------------------------------*/
  if (
    cargando ||
    num === null ||
    num < 0 ||
    num >= data.length
  ) {
    return <SkeletonQuiz />;
  }

  const preguntaActual = data[num];
  const progreso = Math.round(((num + 1) / data.length) * 100);

  return (
    <>
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card
        className="
          w-full max-w-2xl
          rounded-3xl
          bg-zinc-950
          border border-lima/40
          shadow-[0_0_40px_-10px_rgba(163,230,53,0.25)]
        "
      >
        <CardHeader className="space-y-4">
          <div className="space-y-1">
            <Progress value={progreso} className="h-2" />
            <p className="text-xs text-zinc-400 text-right">
              {num + 1} / {data.length}
            </p>
          </div>

          <div className="flex justify-between text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-lima" />
              {puntos} pts
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-400" />
              Racha {racha}
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center">
            {preguntaActual.pregunta}
          </h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {preguntaActual.opciones.map((op, i) => {
              const esCorrecta = i === preguntaActual.correcta;

              return (
                <button
                  key={i}
                  disabled={respondido}
                  onClick={() => evaluarRespuesta(i)}
                  className={`
                    w-full px-5 py-4 rounded-xl border text-left transition-all
                    ${
                      !respondido
                        ? "border-zinc-700 hover:border-lima hover:bg-lima/5"
                        : esCorrecta
                        ? "border-lima bg-lima/10 text-lima"
                        : "border-zinc-700 text-zinc-500"
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span>{op}</span>
                    {respondido && esCorrecta && (
                      <CheckCircle className="h-5 w-5 text-lima" />
                    )}
                    {respondido && !esCorrecta && correcto === false && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {respondido && (
            <>
              <div
                className={`font-semibold ${
                  correcto ? "text-lima" : "text-red-400"
                }`}
              >
                {correcto ? "¡Correcto!" : "Incorrecto"}
              </div>

              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-sm text-zinc-400 mb-1">Explicación</p>
                <p className="text-zinc-200">
                  {preguntaActual.explicacion}
                </p>
              </div>

              <button
                onClick={siguientePregunta}
                className="
                  w-full mt-4 flex items-center justify-center gap-2
                  rounded-xl bg-lima text-black py-4 font-bold
                  hover:bg-lima/90 transition
                "
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </CardContent>
        
      </Card>
    </div>
    
    </>
  );
}

export default Page;
