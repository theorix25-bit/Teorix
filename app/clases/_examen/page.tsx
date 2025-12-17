"use client";
import data from "@/preguntas_normalizado.json";
import { useEffect, useState } from "react";

function page() {
  const [num, setNum] = useState<number>(0);
  const [datosPregunta, setDatosPregunta] = useState(data[0]);
  const [stateExp, setStateExp] = useState(true);
  const [res, setRes] = useState(false);

  function evaluarRespuesta(a: number, b: number) {
    setStateExp(false);
    a == b ? setRes(true) : setRes(false);
  }
  useEffect(() => {
    setDatosPregunta(data[num]);
    setStateExp(true);
  }, [num]);
  const { pregunta, numero, opciones, correcta, explicacion } = datosPregunta;
  return (
    <>
      <div>
        <p className="">N°{numero}</p>
        <p className="text-2xl text-center">{pregunta}</p>
        <div className="flex gap-3 flex-wrap mt-4">
          {opciones.map((o, i) => (
            <button
              key={i}
              className="w-full py-2 border border-lima rounded-md text-sm hover:bg-zinc-900 "
              onClick={() => evaluarRespuesta(i, correcta)}
              disabled={!stateExp}
            >
              {o}{" "}
              <i
                className={`bi ${
                  i == correcta ? "bi-check-circle-fill" : "bi-x-circle"
                }`}
                style={{ display: stateExp ? "none" : "inline-block" }}
              ></i>{" "}
            </button>
          ))}
        </div>
        <div
          className="flex mt-5 justify-end items-center"
          style={{ display: stateExp ? "none" : "flex" }}
        >
          <p className="text-2xl text-center block w-fit ">
            {res ? "Correcto" : "incorrecto"}
          </p>

          <button
            disabled={stateExp}
            className="px-3 py-2 rounded-md bg-lima text-black ml-5 "
            onClick={() => setNum(num + 1)}
          >
            Siguiente
          </button>
        </div>

        <div className="p-4 px-5">
          <div style={{ display: stateExp ? "none" : "block" }}>
            <p className="mb-2">Explicación:</p>
            <p>{explicacion}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
