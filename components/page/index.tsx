import { createClient } from "@/lib/supabase/server";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";

export async function Profesor247() {

  const supabase = await createClient();
  const { data: rawContent } = await supabase
    .from("elementos_web")
    .select("*")
    .eq("seccion", "garantia");

  const content = rawContent?.reduce((acc: any, item) => {
    acc[item.llave] = { texto: item.contenido, meta: item.metadata };
    return acc;
  }, {}) || {};
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center md:w-6/6 md:px-8 -mt-8 md:mt-12 mx-auto relative mb-8">
        <div className="absolute bottom-0 right-[20%] size-52 md:size-96 bg-hoodie/15 md:right-0 rounded-full blur-3xl animate-pulse"></div>
        <div className="flex justify-center w-[85dvw] md:w-full mx-auto ">
          <img
            src={content.imagen_principal.texto}
            alt=""
            className="rounded-3xl object-cover z-10 "
          />
        </div>  
        <div className="flex justify-center items-start mt-0 md:mt-14">
          <div className=" px-4">
            <h2 className=" text-5xl text-lima text-center mt-8">
              {content.titulo_garantia?.texto}
            </h2>
            <h3 className=" text-4xl text-lima text-center mt-8">
              {content.regalo_promesa?.texto}
            </h3>
            
            <p className="text-lg mt-8 text-center mb-2">
            </p>
            <p className=" px-4 text-center">
              {content.regalo_promesa?.meta?.subtext}
            </p>
            <div className="mt-4 flex gap-4 px-4 mb-6 justify-center">
              <Link
                href={"/#metodo"}
                className="px-3 py-2 border rounded-md bg-lima text-black border-lima hover:bg-lima/95 transition-colors duration-100 font-bold  text-center"
              >
                {content.cta_garantia?.texto}
              </Link>
              
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 left-5 text-8xl md:bottom-0 md:left-0 md:text-9xl text-lima  opacity-30">
          *
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
