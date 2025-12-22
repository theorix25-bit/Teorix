import React from "react";

function Profesor() {
  return (
    <>
      <div className="grid grid-cols-2 px-28 justify-between gap-5 h-[300px] mx-auto">
        <div className="flex justify-center items-start border">
          <div className=" border">
            <h2 className=" text-7xl text-lima text-center mt-8">
              TU PROFE <br /> PARTICULAR, <br /> 24/7
            </h2>
            <p className="text-xl mt-8 text-center">IA + ACOMPAÑAMIENTO HUMANO REAL + BIG DATA</p>
            <p>
              Nuestra misión: ayudar a DGT, autoescuelas y alumnos a bajar el
              50% de suspensos en España.
            </p>
            <div>
              <button>Descubre nuestro método</button>
              <button>Manual Gratuito</button>
            </div>
          </div>
        </div>

        <div className="flex justify-end border overflow-hidden">
          <img
            src="alumno_Theorix.webp"
            alt=""
            className="w-[540px] rounded-2xl  "
          />
        </div>
      </div>
    </>
  );
}

export default Profesor;
