"use client";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, CheckCircle, Lock, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data - esto se reemplazará con datos de Supabase
const lessonsByType: Record<string, any> = {
  b: {
    name: "Carnet B",
    description: "Automóviles y furgonetas",
    lessons: [
      {
        id: 1,
        title: "Señales de Tráfico Fundamentales",
        description:
          "Aprende a identificar y comprender las señales básicas de tráfico",
        duration: "15 min",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        completed: true,
        locked: false,
      },
      {
        id: 2,
        title: "Normas de Circulación Básicas",
        description: "Reglas fundamentales para circular con seguridad",
        duration: "20 min",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        completed: true,
        locked: false,
      },
      {
        id: 3,
        title: "Prioridades y Cruces",
        description:
          "Cómo determinar quién tiene prioridad en diferentes situaciones",
        duration: "18 min",
        videoUrl: "https://www.youtube.com/watch?v=example3",
        completed: false,
        locked: false,
      },
      {
        id: 4,
        title: "Estacionamiento y Parada",
        description:
          "Reglas para estacionar correctamente y situaciones prohibidas",
        duration: "12 min",
        videoUrl: "https://www.youtube.com/watch?v=example4",
        completed: false,
        locked: true,
      },
      {
        id: 5,
        title: "Conducción Nocturna y Condiciones Adversas",
        description: "Técnicas para conducir de noche y con mal tiempo",
        duration: "22 min",
        videoUrl: "https://www.youtube.com/watch?v=example5",
        completed: false,
        locked: true,
      },
    ],
  },
  a: {
    name: "Carnet A",
    description: "Motocicletas sin limitaciones",
    lessons: [
      {
        id: 1,
        title: "Fundamentos de la Moto",
        description: "Posición, equilibrio y controles básicos",
        duration: "18 min",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        completed: false,
        locked: false,
      },
      {
        id: 2,
        title: "Equipamiento de Seguridad",
        description: "Protección obligatoria y recomendada para motociclistas",
        duration: "10 min",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        completed: false,
        locked: false,
      },
    ],
  },
  a2: {
    name: "Carnet A2",
    description: "Motocicletas hasta 35 kW",
    lessons: [
      {
        id: 1,
        title: "Iniciación a la Moto A2",
        description: "Primeros pasos con motos de potencia limitada",
        duration: "15 min",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        completed: false,
        locked: false,
      },
    ],
  },
  c: {
    name: "Carnet C",
    description: "Camiones de más de 3.500 kg",
    lessons: [
      {
        id: 1,
        title: "Características de Vehículos Pesados",
        description: "Diferencias con automóviles y precauciones especiales",
        duration: "25 min",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        completed: false,
        locked: false,
      },
    ],
  },
  d: {
    name: "Carnet D",
    description: "Autobuses y transporte de pasajeros",
    lessons: [
      {
        id: 1,
        title: "Transporte de Pasajeros",
        description: "Normativa y responsabilidades del conductor de autobús",
        duration: "20 min",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        completed: false,
        locked: false,
      },
    ],
  },
};

const Lessons = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const licenseData = id ? lessonsByType[id] : null;

  if (!licenseData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light text-center">
        <div>
          <h2 className="fw-bold mb-3">Tipo de carnet no encontrado</h2>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/clases")}
          >
            Volver a tipos de carnet
          </button>
        </div>
      </div>
    );
  }

  const completedLessons = licenseData.lessons.filter(
    (l: any) => l.completed
  ).length;
  const totalLessons = licenseData.lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-vh-100">


      {/* Main Content */}
      <main className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-lime">{licenseData.name}</h2>
          <p className="text-white fs-5">{licenseData.description}</p>
        </div>

        {/* Progreso */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-semibold mb-0">Tu progreso</h5>
              <span className="badge bg-lima bg-opacity-25 text-black">
                {completedLessons} / {totalLessons} lecciones
              </span>
            </div>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-lima"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <small className="text-white d-block mt-2">
              {progressPercentage.toFixed(0)}% completado
            </small>
          </div>
        </div>

        {/* Lecciones */}
        <h3 className="fw-bold mb-4 text-lima ">Lecciones disponibles</h3>
        <div className="d-flex flex-column gap-3">
          {licenseData.lessons.map((lesson: any, index: number) => (
            <div
              key={lesson.id}
              className={`card border  ${
                lesson.locked ? "opacity-75" : "hover-shadow"
              }`}
              onClick={() =>
                !lesson.locked && console.log("Abriendo lección:", lesson.id)
              }
              style={{ cursor: lesson.locked ? "not-allowed" : "pointer" }}
            >
              <div className="card-body d-flex align-items-start gap-3">
                {/* Icono */}
                <div
                  className={`rounded d-flex align-items-center justify-content-center flex-shrink-0`}
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: lesson.completed
                      ? "rgba(111, 66, 193, 0.15)"
                      : lesson.locked
                      ? "rgba(108, 117, 125, 0.15)"
                      : "rgba(13, 202, 240, 0.15)",
                  }}
                >
                  {lesson.completed ? (
                    <CheckCircle className="text-lima" size={24} />
                  ) : lesson.locked ? (
                    <Lock className="text-secondary" size={24} />
                  ) : (
                    <PlayCircle className="text-info" size={24} />
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <small className="text-lima">#{index + 1}</small>
                      <h5 className="fw-semibold mb-1">{lesson.title}</h5>
                    </div>
                    <span className="badge bg-lima text-secondary d-flex align-items-center gap-1">
                      <Clock size={14} /> {lesson.duration}
                    </span>
                  </div>
                  <p className="text-white mb-2">{lesson.description}</p>

                  {!lesson.locked ? (
                    <button
                      className={`btn btn-sm ${
                        lesson.completed ? "btn-outline-theorix" : "btn-theorix"
                      }`}
                    >
                      {lesson.completed
                        ? "Repasar lección"
                        : "Comenzar lección"}
                    </button>
                  ) : (
                    <small className="text-muted fst-italic">
                      Completa las lecciones anteriores para desbloquear
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consejo de Theo */}
        <div className="card border-primary-subtle bg-primary bg-opacity-10 mt-5">
          <div className="card-body d-flex align-items-start gap-3">
            {/* <img
              src="/src/assets/theo-eye.png"
              alt="Theo"
              className="rounded-circle"
              style={{
                width: "60px",
                height: "60px",
                animation: "pulse 2s infinite",
              }}
            /> */}
            <div>
              <h5 className="fw-bold text-lime mb-2">Consejo de Theo</h5>
              <p className="text-white mb-0">
                ¡Recuerda practicar regularmente! La constancia es clave para
                aprobar tu examen. Te recomiendo ver una lección al día y hacer
                tests después de cada una. ¡Vamos, tú puedes! 💪
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .hover-shadow:hover {
          box-shadow: 0 0 20px rgba(111, 66, 193, 0.2);
          transform: translateY(-4px);
          transition: all 0.3s ease;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Lessons;
