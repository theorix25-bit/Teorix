import { Brain, Database, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";

export function Profesor247() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center md:w-6/6 md:px-8 -mt-8 md:mt-12 mx-auto relative">
        <div className="absolute bottom-0 right-[20%] size-52 md:size-96 bg-hoodie/15 md:right-0 rounded-full blur-3xl animate-pulse"></div>

        <div className="flex justify-center items-start mt-0 md:mt-14">
          <div className=" px-4">
            <h2 className=" text-5xl text-lima text-center mt-8">
              TU PROFE PARTICULAR <span className="text-6xl block">24/7</span>
            </h2>
            <p className="text-lg mt-8 text-center mb-2">
              ASISTENTE IA+ PROFE HUMANO (de carne y hueso) + BIG DATA + ACOMPAÑAMIENTO REAL + CONFIANZA = APTO ASEGURADO
            </p>
            <p className=" px-4 text-center">
            <span className="text-hoodie">NUESTRA MISIÓN</span>: ayudar a DGT, autoescuelas y alumnos a mejorar el 50% de los suspensos actuales. 
            </p>
            <div className="mt-4 flex gap-4 px-4 mb-6 justify-center">
              <Link
                href={"/#metodo"}
                className="px-3 py-2 border rounded-md bg-lima text-black border-lima hover:bg-lima/95 transition-colors duration-100 font-bold  text-center"
              >
                Descubre nuestro método
              </Link>
              
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 left-5 text-8xl md:bottom-0 md:left-0 md:text-9xl text-lima  opacity-30">
          *
        </div>
        <div className="flex justify-center w-[85dvw] md:w-full mx-auto ">
          <img
            src="bg-1.jpg"
            alt=""
            className="rounded-3xl object-cover z-10 "
          />
        </div>
      </section>
    </>
  );
}

export function Exito() {
  const diferencial = [
    {
      titulo: "BIG DATA DE TEORIX*",
      texto:
        `¿Por qué nuestro Algoritmo es invencible? Es como tener un "cerebro gigante" que ha visto, analizado y guardado cada fallo y cada acierto de miles de alumnos que han pasado por el examen de la DGT. Mientras el sistema rancio te suelta 3.500 tests y te dice "suerte, máquina", nosotros usamos programas especiales para encontrar los patrones y las trampas que siempre se repiten, como hace Netflix para saber qué serie te
        va a viciar. Cada clic que haces en un test, cada duda que le escribes a Teox* a las 3 AM y cada pregunta donde la gente suele palmar, genera un pedacito de información valiosísima.`,
    },
    {
      titulo: `AQUÍ VIENES A GANAR, NO A ESTUDIAR MÁS`,
      texto:
      `Millones de datos moviéndose a toda leche. Ningún profesor humano (por muy bueno que sea) podría analizar a mano los fallos de miles de personas para saber exactamente qué coma han cambiado en la pregunta 402 del examen. 
      TEOX*, nuestro asistente con IA. Él es quien procesa ese caos de datos para encontrar las conexiones lógicas que a ti te llevarían meses descubrir solo. 
      • El objetivo es el VALOR: Sacamos provecho de esa montaña de datos para predecir qué te van a preguntar, filtrar la "chapa" que no sirve para nada y darte la Píldora Roja de la lógica vial antes que nadie.`
    },
  ];
  return (
    <>
      <section className="px-4 mt-12 relative">
        <div className="absolute bottom-0 left-0 size-52 md:size-96  bg-lima/15 rounded-full blur-3xl animate-pulse"></div>

        <div className="px-2 md:w-2/3 mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-4">
            SOMOS EL ORIGEN DEL <span className="text-lima">85%</span> DE APTOS
          </h2>
          <h3 className="text-xl mx:text-2xl text-center mb-2">
            AYUDAMOS A <span className="text-hoodie">AUMENTAR</span>  EL 50% DEL RESTO
          </h3>
          <p className="mb-2 w-4/5 mx-auto md:text-lg md:text-center ">
            No es suerte, ni magia ni fé ciega. Es pura ESTRATEGIA. Análisis de datos, inteligencia artificial y años de experiencia de una fórmula que funciona.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 px-2 mt-3">
          {diferencial.map((d, i) => (
            <div
              key={i}
              className="border py-4 px-4 border-lima bg-zinc-900 rounded-md border-l-4 hover:border-l-8 border-b-2 w-full md:w-2/5 hover:border-hoodie/80 hover:bg-hoodie/15 transition-all duration-300"
            >
              <h4 className="text-lg mb-2 ">{d.titulo}</h4>
              <p>{d.texto}</p>
            </div>
          ))}
        </div>

        <div className="px-2 md:w-2/3 mx-auto mt-5">
          <h2 className="text-3xl md:text-4xl text-center mb-4">
            EN LA COMUNIDAD TEORIX*, TODOS APRENDEMOS DE TODOS
          </h2>
          <p className="mb-2 mx-auto md:text-lg md:text-center ">
            En resumen: Manejamos cantidades brutales de datos para descubrir los secretos de la DGT y que tú tomes decisiones más inteligentes en el examen. ¡Es como tener a un detective digital (Teox*) hackeando tu APTO a escala global!
          </p>
        </div>
      </section>
    </>
  );
}

export function Metodo() {
  const metodo = [
    {
      titulo: `INGENIERÍA INVERSA DEL EXAMEN`,
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
  return (
    <>
      {/*Metodo teorix */}
      <section
        className="max-w-7xl mx-auto p-6 mt-6 md:py-14  relative"
        id="metodo"
      >
        <div className="absolute bottom-0 left-[20%] size-52 md:size-96 bg-lima/15 rounded-full blur-3xl md:hidden animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-10">
          <div className="h-fit lg:sticky lg:top-4">
            <h2 className="text-4xl font-bold mb-4 text-lima text-center">
              FÓRMULA TEORIX*
            </h2>
            <p className=" text-lg mt-3">
              ¿Por qué otros métodos fallan? te bombardean con información irrelevante y te dejan solo frente a un examen diseñado para pillarte
con trampas y preguntas confusas.
            </p>
            <p className=" text-lg mt-3">
              Aquí no te tragas los 3.500 tests de la DGT como si fueras un robot programado para memorizar. Te damos los test que SÍ importan
de verdad y la técnica precisa para entender la lógica detrás de cada pregunta. Es la diferencia entre estudiar a ciegas y estudiar
acompañado y con la ayuda de un mapa del tesoro en la mano.
            </p>
            <img
              src="bg-2.jpg"
              alt=""
              className=" rounded-xl h-80 w-11/12 object-cover mx-auto mt-5 bg-top "
            />
          </div>

          <div className="space-y-8">
            <div
                className="p-6 rounded-xl  bg-zinc-900 shadow-inner border-lima/15 border shadow-lima md:w-[520px] mx-auto relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-[20%] md:left-[40%] size-52 md:size-70 bg-lima/15 rounded-full blur-3xl  animate-pulse"></div>

                <Database className="text-lima mx-auto mb-3 size-14 md:size-24" />
                <h3 className=" text-xl md:text-3xl  font-semibold text-center mb-2">
                  INGENIERÍA INVERSA DEL EXAMEN
                </h3>
                <ul className="list-disc ml-5">
                  <li>Analizamos miles de exámenes reales de la DGT</li>

                  <li>Identificamos lo que necesitas saber.</li>

                  <li>Cómo te lo van a preguntar.</li>

                  <li>Conocemos los errores que cometen sistemáticamente todos nuestros alumnos.</li>

                </ul>
            </div>

            <div className="p-6 rounded-xl  bg-zinc-900 shadow-inner border-lima/15 border shadow-lima md:w-[520px] mx-auto relative overflow-hidden">
                <div className="absolute bottom-0 left-[20%] md:left-[40%] size-52 md:size-70 bg-lima/15 rounded-full blur-3xl  animate-pulse"></div>
                <Brain className="text-lima mx-auto mb-3 size-14 md:size-24" />
                <h3 className=" text-xl md:text-3xl  font-semibold text-center mb-2">
                  SIN CONTENIDO DE RELLENO
                </h3>
                <p className=" mt-3 px-2 md:text-lg text-sm ">No pierdas el tiempo con información irrelevante.</p>
                <p className=" mt-3 px-2 md:text-lg text-sm ">Aprendes a detectar patrones, identificar trampas que te confunden y te ayudamos a pensar como la DGT. </p>
            </div>

            <div className="p-6 rounded-xl  bg-zinc-900 shadow-inner border-lima/15 border shadow-lima md:w-[520px] mx-auto relative overflow-hidden">
                <div className="absolute bottom-0 left-[20%] md:left-[40%] size-52 md:size-70 bg-lima/15 rounded-full blur-3xl  animate-pulse"></div>
                <ShieldCheck className="text-lima mx-auto mb-3 size-14 md:size-24" />
                <h3 className=" text-xl md:text-3xl  font-semibold text-center mb-2">
                  TEÓRICO BLINDADO
                </h3>
                <p className=" mt-3 px-2 md:text-lg text-sm ">Con el algoritmo Teorix* identificamos las áreas dónde cometes más errores y te presenta lo que necesitas para mejorarlas. Es la fórmula blindada contra los suspensos. </p>
            </div>
            
          </div>
        </div>
        <div className="flex justify-center">
        <Link
            href={"https://gamma.app/docs/GUIA-DE-ESTUDIO-TEORIX-EL-CHEATCODE-PARA-TU-APTO-8m90eh7tj6mt267"}
            className="border px-4 py-3 text-md md:text-2xl text-lima border-lima rounded-xl hover:bg-lima hover:text-black transition-colors duration-200"
            >
            Ver cómo funciona en detalle
          </Link>
        </div>
      </section>
    </>
  );
}



export function Datos() {
  const datos = [
    {
      Titulo: "12847",
      subTitulo: "Alumnos Aprobados",
      texto:
        "Han confiado en nuestro método este año y han conseguido superar el examen teórico a la primera",
    },
    {
      Titulo: "80%",
      subTitulo: "Tasa de Éxito",
      texto:
        "Han confiado en nuestro método este año y han conseguido superar el examen teórico a la primera",
    },
    {
      Titulo: "3",
      subTitulo: "Semanas de Media",
      texto:
        "Tiempo promedio que nuestros alumnos necesitan para aprobar el teórico",
    },
  ];
  return (
    <>
      {/* Datos que hablan */}
      <section className="px-4 md:w-[80dvw] mx-auto mt-10 md:mt-4 relative">
        <div className="md:flex flex-row-reverse gap-8 justify-center items-center">
          <div className=" md:px-10 mx-auto w-fit ">
            <h2 className="text-5xl text-center mb-4 mt-10 capitalize">
              Los <span className="text-lima"> datos</span> hablan por si{" "}
              <span className="text-hoodie">solos</span>
            </h2>
            <p className=" mb-4 text-center text-lg">
              Más de doce mil personas ya han transformado su experiencia de
              aprendizaje con Teorix. No son números al azar: cada aprobado
              representa a alguien que decidió dejar atrás los métodos
              tradicionales de memorización y apostar por un sistema inteligente
              que realmente funciona.
            </p>
            <p className="mb-4 text-center text-lg">
              ¿Qué tienen en común todos ellos? Confiaron en un método
              respaldado por datos reales, inteligencia artificial avanzada y el
              apoyo de profesores expertos. La pregunta no es si funciona, sino
              cuándo vas a unirte tú a esta revolución del aprendizaje vial.
            </p>
          </div>
          <Carousel className="md:w-1/2 w-[70dvw] max-w-md mx-auto mt-7 md:mt-0 bg-zinc-900">
            <CarouselContent>
              {datos.map((d, i) => (
                <CarouselItem key={i} className="basis-full">
                  <div className=" px-4 h-80 rounded-xl shadow-inner border border-lima/30 shadow-lima flex flex-col justify-center items-center align-middle  ">
                    <h3 className="text-7xl ">{d.Titulo}</h3>
                    <p className="mt-1 text-3xl text-center">{d.subTitulo}</p>
                    <p className="m-2 text-lg text-center">{d.texto}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
}

export function Algoritmo() {
  return (
    <>
      <section className="px-4 md:w-[80dvw] mx-auto mt-16 relative">
        <h2 className="text-5xl text-center text-lima">El Algoritmo 80/20</h2>
        <h3 className="text-4xl text-center mt-1">
          Tu Manual <span className="text-hoodie">Gratuito</span> para Dominar
          el Examen Teórico
        </h3>
        <p className="mt-4 text-center">
          Este documento estratégico ha sido diseñado siguiendo el famoso
          principio del 80/20 o Ley de Pareto para maximizar tu eficiencia
          absoluta en la preparación del examen teórico de conducir. La premisa
          es tan sencilla como poderosa: al dominar el 20% del contenido más
          relevante y de mayor impacto, serás capaz de responder correctamente
          al 80% de las preguntas del examen real.
        </p>
        <div className=" md:flex ">
          <div className=" md:w-1/4 p-4 ">
            <p className="text-3xl  rounded-full w-11 h-11 text-center align-middle p-1 bg-gradient-to-br from-lima to-hoodie text-black ">
              1
            </p>
            <p className="mt-3 mb-2 text-2xl">Identifica Patrones Comunes</p>
            <p>
              Aprende a reconocer las estructuras típicas de las preguntas de
              examen y las trampas más frecuentes que usa la DGT para confundir
              a los aspirantes.
            </p>
          </div>
          <div className=" md:w-1/4 p-4 ">
            <p className="text-3xl  rounded-full w-11 h-11 text-center align-middle p-1 bg-gradient-to-br from-lima to-hoodie text-black ms-auto md:m-0">
              2
            </p>
            <p className="mt-3 mb-2 text-2xl text-end md:text-start">
              Practica con Propósito
            </p>
            <p className=" text-end md:text-start">
              No hagas tests al azar. Usa los ejercicios específicos del manual
              para reforzar los conceptos clave y automatizar las respuestas
              correctas.
            </p>
          </div>
          <div className=" md:w-1/4 p-4 ">
            <p className="text-3xl  rounded-full w-11 h-11 text-center align-middle p-1 bg-gradient-to-br from-lima to-hoodie text-black">
              3
            </p>
            <p className="mt-3 mb-2 text-2xl text-">Repasa Estratégicamente</p>
            <p className=" text-">
              El manual incluye técnicas de repaso espaciado para consolidar el
              conocimiento en tu memoria a largo plazo con el mínimo esfuerzo.
            </p>
          </div>
          <div className=" md:w-1/4 p-4 ">
            <p className="text-3xl  rounded-full w-11 h-11 text-center align-middle p-1 bg-gradient-to-br from-lima to-hoodie text-black ms-auto md:m-0">
              4
            </p>
            <p className="mt-3 mb-2 text-2xl text-end md:text-start">
              Enfoque en lo Esencial
            </p>
            <p className=" text-end md:text-start">
              Prioriza las secciones clave de este documento. No todo el
              contenido tiene el mismo peso en el examen real. Céntrate
              exclusivamente en los temas recurrentes y de alta probabilidad de
              aparecer.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
