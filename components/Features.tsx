import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Brain, Database, ShieldCheck } from "lucide-react";

function Features() {
  const diferencial = [
    {
      titulo: "Nuestro MÉTODO tiene 85% de aptos",
      texto:
        "No es suerte, es estrategia pura y dura. Hemos analizado miles de exámenes reales para identificar patrones, detectar trampas comunes y entender exactamente qué busca la DGT en cada pregunta.",
    },
    {
      titulo: "Enseñamos la lógica vial real",
      texto:
        "Olvídate de memorizar respuestas como un loro. Te enseñamos a entender la lógica detrás de cada norma y la técnica de test que realmente funciona. No memorizas mierdas inútiles, aprendes a pensar como un conductor responsable.",
    },
    {
      titulo: "Aquí Vienes a Ganar, No a Estudiar de Más",
      texto:
        "Nuestro enfoque es quirúrgico: te mostramos exactamente qué necesitas saber para aprobar, sin relleno, sin pérdidas de tiempo. Maximizamos tu eficiencia para que estudies menos pero mejor, y apruebes rápido.",
    },
  ];
  const metodo = [
    {
      titulo: "Ingeniería Inversa del Examen",
      texto:
        "Hemos analizado miles de exámenes reales de la DGT. El Big Data nos ayuda a identificar exactamente qué necesitas saber, cómo te lo van a preguntar y, lo más importante, los errores que cometen sistemáticamente todos nuestros alumnos.",
      icono: Database,
    },
    {
      titulo: "Sin Contenido Relleno",
      texto:
        "No pierdas el tiempo con información irrelevante. Te convertimos en un auténtico hacker del examen: aprendes a detectar patrones, identificar trampas diseñadas para confundirte y pensar exactamente como piensa la DGT.",
      icono: Brain,
    },
    {
      titulo: "Teórico Blindado",
      texto:
        "El algoritmo identifica automáticamente las áreas donde cometes más errores y te presenta ejercicios específicos para reforzarlas. Este es el teórico blindado contra suspensos que estabas buscando.",
      icono: ShieldCheck,
    },
  ];
  const preguntas = [
    { pregunta: "Pregutna", respuesta: "Respuesta" },
    { pregunta: "Pregutna", respuesta: "Respuesta" },
    { pregunta: "Pregutna", respuesta: "Respuesta" },
    { pregunta: "Pregutna", respuesta: "Respuesta" },
    { pregunta: "Pregutna", respuesta: "Respuesta" },
  ];

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center md:w-4/5 mt-5 mx-auto relative">
        <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-hoodie/15 rounded-full blur-3xl animate-pulse"></div>

        <div className="flex justify-center items-start mt-14">
          <div className=" px-4">
            <h2 className=" text-5xl text-lima text-center mt-8">
              TU PROFE PARTICULAR, <span className="text-6xl block">24/7</span>
            </h2>
            <p className="text-xl mt-8 text-center mb-2">
              IA + ACOMPAÑAMIENTO HUMANO REAL + BIG DATA
            </p>
            <p className=" px-4">
              Nuestra misión: ayudar a DGT, autoescuelas y alumnos a bajar el
              50% de suspensos en España.
            </p>
            <div className="mt-4 flex gap-4 px-4 mb-6 justify-center">
              <button className="px-3 py-2 border rounded-md bg-lima text-black border-lima hover:bg-lima/95 transition-colors duration-100 font-bold ">
                Descubre nuestro método
              </button>
              <button className="px-3 py-2 border rounded-md  bg-hoodie text-white border-hoodie hover:bg-hoodie/95 transition-colors duration-100 font-bold">
                Manual Gratuito
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 left-5 text-8xl md:bottom-0 md:left-0 md:text-9xl text-lima  opacity-30">
          *
        </div>
        <div className="flex justify-center overflow-hidden px-4 rounded-xl w-[85dvw] md:w-2/3 mx-auto ">
          <img
            src="alumno_Theorix.webp"
            alt=""
            className="md:w-[540px] rounded-2xl object-cover z-10 "
          />
        </div>
      </section>

      <section className="px-4 mt-12 relative">
        <div className="absolute bottom-0 left-0 size-80  bg-lima/15 rounded-full blur-3xl animate-pulse"></div>

        <div className="px-2 md:w-2/3 mx-auto">
          <h2 className="text-4xl md:text-5xl text-center">
            SOMOS EL ORIGEN DEL <span className="text-lima">85%</span>{" "}
          </h2>
          <h3 className="text-xl md:text-2xl  mt-3 mb-3 text-center">
            LUCHAMOS CONTRA EL <span className="text-hoodie">50%</span> DE
            SUSPENSOS
          </h3>
          <p className="mb-2 w-4/5 mx-auto md:text-lg md:text-center">
            No es magia ni suerte ciega. Es pura estrategia respaldada por
            análisis de datos, inteligencia artificial y años de experiencia
            destilados en un sistema que funciona.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 px-4 mt-3">
          {diferencial.map((d, i) => (
            <div
              key={i}
              className="border py-4 px-4 border-lima bg-lima/15 rounded-md border-l-4 hover:border-l-8 border-b-2 w-full md:w-1/4 hover:border-hoodie/80 hover:bg-hoodie/15 transition-all duration-300"
            >
              <h4 className="text-lg mb-2">{d.titulo}</h4>
              <p>{d.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="absolute bottom-0 left-[20%] w-96 h-96 bg-lima/15 rounded-full blur-3xl animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="h-fit lg:sticky lg:top-4">
            <h2 className="text-4xl font-bold mb-6 text-lima">
              MÉTODO TEORIX*
            </h2>
            <p className=" text-lg mt-3">
              ¿Por qué otros métodos fallan? te bombardean con información
              irrelevante y te dejan solo frente a un examen diseñado para
              pillarte con trampas y preguntas confusas.
            </p>
            <p className=" text-lg mt-3">
              Aquí no te tragas los 3.500 tests de la DGT como si fueras un
              robot programado para memorizar. Te damos los test que SÍ importan
              de verdad y la técnica precisa para entender la lógica detrás de
              cada pregunta. Es la diferencia entre estudiar a ciegas y estudiar
              con un mapa del tesoro en la mano.
            </p>
            <img
              src="./metodoTeorix.webp"
              alt=""
              className=" rounded-xl h-80 w-11/12 object-cover mx-auto mt-5 bg-top "
            />
          </div>

          <div className="space-y-8">
            {metodo.map((m, i) => (
              <div
                key={i}
                className="p-6 rounded-xl shadow-inner border-lima/15 border shadow-lima md:w-[520px] mx-auto "
              >
                <m.icono className="text-lima mx-auto mb-3 size-14 md:size-24" />
                <h3 className=" text-xl md:text-3xl  font-semibold text-center mb-2">
                  {m.titulo}
                </h3>
                <p className=" mt-3 px-2 md:text-lg text-sm ">{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:w-[90dvw] mx-auto mt-10 relative ">
        <h2 className="text-5xl text-lima text-center mb-8">
          Preguntas frecuentes
        </h2>

        <div className=" flex gap-8 w-full">
          <div className=" md:w-1/2 rounded-md overflow-hidden">
            <img src="clasesTeo.webp" alt="" className="object-cover" />
          </div>
          <div className="flex justify-center items-center w-full md:w-1/2">
            <Accordion type="single" className="w-full">
              {preguntas.map((p, i) => (
                <AccordionItem value={`${i}`}>
                  <AccordionTrigger>{p.pregunta}</AccordionTrigger>
                  <AccordionContent>{p.respuesta}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}

export default Features;
