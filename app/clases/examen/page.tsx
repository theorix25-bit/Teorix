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
        <p className="text-center">Pregunta N°{numero}</p>
        <p className="fw-bold fs-5 text-center">{pregunta}</p>
        <div className="row px-2 g-2">
          {opciones.map((o, i) => (
            <button
              key={i}
              className=" btn btn-theorix p-2"
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
        <button
          disabled={stateExp}
          className="btn btn-lg btn-outline-theorix mt-3 mx-auto "
          style={{ display: stateExp ? "none" : "block" }}
          onClick={() => setNum(num + 1)}
        >
          Siguiente
        </button>
        <div className="p-4">
          <div style={{ display: stateExp ? "none" : "block" }}>
            <br />
            <p className="display-5 text-center">
              {res ? "Correcto" : "incorrecto"}
            </p>
            <p>{explicacion}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
