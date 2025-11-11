import { Video, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Video,
    title: "Microlecciones + Vídeos reales",
    description:
      "Aprende con contenido directo y visual. Nada de teoría muerta.",
    badge: "Rápido",
  },
  {
    number: "02",
    icon: Target,
    title: "Seguimiento personalizado",
    description:
      "Tu tutor real te acompaña. Detecta tus errores, ajusta tu plan y acelera tu progreso.",
    badge: "Personal",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Aprobado garantizado",
    description:
      "Método probado que funciona. Miles de aprobados que empezaron igual que tú.",
    badge: "APTO ✓",
  },
];

export const MethodSection = () => {
  return (
    <div className="py-2 py-md-5 position-relative overflow-hidden">
      <div className="container mx-auto position-relative z-index-1">
        <div className="text-center mb-5 mb-lg-5">
          <div className="d-inline-block px-4 py-2 rounded-pill border border-hoodie mb-3">
            <span className="text-white fw-bold text-uppercase fs-6 tracking-wider ">
              Método S1
            </span>
          </div>
          <h2 className="display-2 fw-black text-foreground mb-3 mb-md-3">
            Cómo funciona
          </h2>
          <p className="display-7 text-muted-foreground max-w-500px mx-auto">
            Tres pasos simples para tu{" "}
            <span className="text-lima fw-bold">APTO</span>
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 g-lg-5">
          {steps.map((item, index) => (
            <div className="col" key={index}>
              <div className="position-relative rounded-4 p-3 p-md-5 border "
              style={{}}>
                <div className="position-absolute rounded-4 d-flex align-items-center justify-content-center fs-4">
                  {item.number}
                </div>

                <div className="d-flex justify-content-end mb-3">
                  <span className="px-3 py-1 rounded-pill text-lima fw-bold text-uppercase fs-7 ">
                    icono
                  </span>
                </div>

                <div className="mb-4 w-16 h-16 bg-muted-50 rounded-4 d-flex align-items-center justify-content-center custom-icon-hover">
                  <i className="bi bi-lightbulb fs-1 text-lima"></i>{" "}
                </div>

                <h3 className="fs-4 text-lima mb-3 lh-sm">
                  {item.title}
                </h3>
                <p className="">
                  {item.description}
                </p>

                <div className="position-absolute bottom-0 end-0 w-24 h-24 bg-primary-5 rounded-top-start custom-hover-decoration"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 mt-lg-5">
          <Link href={"/clases"} className="btn btn-outline-theorix btn-lg ">
            Ver cómo funciona en detalle
          </Link>
        </div>
      </div>
    </div>
  );
};
