import ChatAssistant from "@/components/ChatAssistant";
import { crearContenido } from "@/lib/supabase";
import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const urlAsistente = process.env.NEXT_URL_ASISTENTE!;

  // const contenidos = [
  //   // ===== CLASES =====
  //   {
  //     id: 1,
  //     contenido_id: null,
  //     titulo: "Teoría del Conductor – Clase 2",
  //     descripcion:
  //       "Introducción al carnet B, normativa básica y seguridad vial.",
  //     tipo: "clase",
  //     orden: 1,
  //     slug: "teora-del-conductor-clase-1",
  //   },
  //   {
  //     id: 2,
  //     contenido_id: null,
  //     titulo: "Reglamento y Señales – Clase 1",
  //     descripcion: "Estudio profundo de señales de tránsito y prioridades.",
  //     tipo: "clase",
  //     orden: 2,
  //     slug: "reglamento-y-seales-clase-2",
  //   },
  //   {
  //     id: 3,
  //     contenido_id: null,
  //     titulo: "Mecánica Básica – Clase 3",
  //     descripcion:
  //       "Conceptos esenciales de mantenimiento y control del vehículo.",
  //     tipo: "clase",
  //     orden: 3,
  //     slug: "mecnica-bsica-clase-3",
  //   },

  //   // ===== TEMAS =====
  //   {
  //     id: 4,
  //     contenido_id: 2,
  //     titulo: "Normativa General de Tránsito",
  //     descripcion: "Conceptos básicos sobre normas viales.",
  //     tipo: "tema",
  //     orden: 1,
  //     slug: "normativa-general-de-trnsito",
  //   },
  //   {
  //     id: 5,
  //     contenido_id: 2,
  //     titulo: "Documentación Obligatoria",
  //     descripcion: "Documentos necesarios para circular.",
  //     tipo: "tema",
  //     orden: 2,
  //     slug: "documentacin-obligatoria",
  //   },
  //   {
  //     id: 6,
  //     contenido_id: 2,
  //     titulo: "Factores de Riesgo y Conducción Segura",
  //     descripcion: "Principales factores que afectan la seguridad.",
  //     tipo: "tema",
  //     orden: 3,
  //     slug: "factores-de-riesgo-y-conduccin-segura",
  //   },

  //   {
  //     id: 7,
  //     contenido_id: 3,
  //     titulo: "Señales de Advertencia",
  //     descripcion: "Señales que alertan sobre peligros.",
  //     tipo: "tema",
  //     orden: 1,
  //     slug: "seales-de-advertencia",
  //   },
  //   {
  //     id: 8,
  //     contenido_id: 3,
  //     titulo: "Señales Reglamentarias",
  //     descripcion: "Señales que imponen obligaciones.",
  //     tipo: "tema",
  //     orden: 2,
  //     slug: "seales-reglamentarias",
  //   },
  //   {
  //     id: 9,
  //     contenido_id: 3,
  //     titulo: "Señales Informativas",
  //     descripcion: "Señales que brindan orientación.",
  //     tipo: "tema",
  //     orden: 3,
  //     slug: "seales-informativas",
  //   },

  //   // ===== SUBTEMAS =====
  //   {
  //     id: 13,
  //     contenido_id: 16,
  //     titulo: "Conceptos Básicos",
  //     descripcion: "Definiciones fundamentales aplicadas a la normativa vial.",
  //     tipo: "subtema",
  //     orden: 1,
  //     slug: "conceptos-basicos",
  //   },
  //   {
  //     id: 14,
  //     contenido_id: 16,
  //     titulo: "Normas Generales de Circulación",
  //     descripcion: "Principales reglas aplicadas a la conducción.",
  //     tipo: "subtema",
  //     orden: 2,
  //     slug: "normas-generales-circulacion",
  //   },
  //   {
  //     id: 15,
  //     contenido_id: 16,
  //     titulo: "Prioridades de Paso",
  //     descripcion: "Orden jerárquico de prioridades en la vía.",
  //     tipo: "subtema",
  //     orden: 3,
  //     slug: "prioridades-de-paso",
  //   },

  //   {
  //     id: 16,
  //     contenido_id: 17,
  //     titulo: "Documentación del Conductor",
  //     descripcion: "Documentos requeridos para poder circular.",
  //     tipo: "subtema",
  //     orden: 1,
  //     slug: "documentacion-del-conductor",
  //   },
  //   {
  //     id: 17,
  //     contenido_id: 17,
  //     titulo: "Documentación del Vehículo",
  //     descripcion: "Papeles necesarios del automotor.",
  //     tipo: "subtema",
  //     orden: 2,
  //     slug: "documentacion-del-vehiculo",
  //   },
  // ];
  // contenidos.forEach(c=> crearContenido(c))
  // crearContenido({});
  return (
    <>
      {/* <div className=" max-w-6xl flex justify-end gap-3 text-white p-2 ">
        <span className="nav-item hover:text-lima">
          <Link href={"/clases/examen"} className="nav-link">
            Test
          </Link>
        </span>
        <span className="nav-item hover:text-lima">
          <Link href={"/clases/documentos"} className="nav-link">
            Documentos
          </Link>
        </span>
        <span className="nav-item hover:text-lima ">
          <Link href={"/clases/videos"} className="nav-link">
            Videos
          </Link>
        </span>
      </div> */}
      <div className="bg-carbon text-white">{children}</div>
      <ChatAssistant urlAsistente={urlAsistente} />
    </>
  );
}
