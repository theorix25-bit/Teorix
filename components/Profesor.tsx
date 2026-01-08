function Profesor() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center md:w-4/5 mt-5 mx-auto">
        <div className="flex justify-center items-start mt-14">
          <div className=" px-8">
            <h2 className=" text-5xl text-lima text-center mt-8">
              TU PROFE  PARTICULAR,  <span className="text-6xl block">24/7</span>
            </h2>
            <p className="text-xl mt-8 text-center mb-2">
              IA + ACOMPAÑAMIENTO HUMANO REAL + BIG DATA
            </p>
            <p className=" px-4">
              Nuestra misión: ayudar a DGT, autoescuelas y alumnos a bajar el
              50% de suspensos en España.
            </p>
            <div className="mt-4 flex gap-4 px-4 mb-6 justify-center">
              <button className="px-3 py-2 border rounded-md bg-lima text-black border-lima hover:bg-lima/95 transition-colors duration-100 font-bold ">Descubre nuestro método</button>
              <button className="px-3 py-2 border rounded-md  bg-hoodie text-white border-hoodie hover:bg-hoodie/95 transition-colors duration-100 font-bold">Manual Gratuito</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center overflow-hidden px-4 rounded-xl w-[85dvw] md:w-2/3 mx-auto">
          <img
            src="alumno_Theorix.webp"
            alt=""
            className="md:w-[540px] rounded-2xl  "
          />
        </div>
      </div>
    </>
  );
}

export default Profesor;
