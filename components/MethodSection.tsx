import { Video, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Video,
    title: "Microlecciones + Vídeos reales",
    description:
      "Aprende con contenido directo y visual. Nada de teoría muerta. Solo lo que necesitas para aprobar.",
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
    <div className="py-5 py-md-5 bg-background position-relative overflow-hidden">
      <div className="position-absolute custom-glow-top-right bg-primary-5 rounded-circle custom-blur-3xl"></div>
      <div className="position-absolute custom-glow-bottom-left bg-secondary-5 rounded-circle custom-blur-3xl"></div>

      <div className="container mx-auto position-relative z-index-1">
        <div className="text-center mb-5 mb-lg-5">
          <div className="d-inline-block px-4 py-2 rounded-pill bg-primary-10 border border-primary-20 mb-3">
            <span className="text-primary fw-bold text-uppercase fs-6 tracking-wider">
              Método THEORIX
            </span>
          </div>
          <h2 className="fs-1 fw-black text-foreground mb-3 mb-md-3">
            Cómo funciona
          </h2>
          <p className="fs-5 text-muted-foreground max-w-500px mx-auto">
            Tres pasos simples para tu{" "}
            <span className="text-primary fw-bold">APTO</span>
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 g-lg-5 max-w-1000px mx-auto">
          {steps.map((item) => (
            <>
              <div className="col">
                <div className="position-relative bg-card rounded-4 p-4 p-md-5 border border-border custom-hover-step">
                  <div className="position-absolute custom-number-badge bg-gradient-primary-secondary rounded-4 d-flex align-items-center justify-content-center fs-4 fw-black text-primary-foreground shadow">
                    {item.number}
                  </div>

                  <div className="d-flex justify-content-end mb-3">
                    <span className="px-3 py-1 rounded-pill bg-primary-20 text-primary fw-bold text-uppercase fs-7 tracking-wider">
                      icono
                    </span>
                  </div>

                  <div className="mb-4 w-16 h-16 bg-muted-50 rounded-4 d-flex align-items-center justify-content-center custom-icon-hover">
                    <i className="bi bi-lightbulb fs-3 text-primary"></i>{" "}
                  </div>

                  <h3 className="fs-4 fw-bold text-foreground mb-3 lh-sm">
                      {item.title}
                    
                  </h3>
                  <p className="text-muted-foreground lh-base">
                    {item.description}
                  </p>

                  <div className="position-absolute bottom-0 end-0 w-24 h-24 bg-primary-5 rounded-top-start custom-hover-decoration"></div>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="text-center mt-5 mt-lg-5">
          <a href="#" className="btn btn-outline btn-lg custom-group">
            Ver cómo funciona en detalle
            <span className="ms-2 custom-group-hover-translate-x-1">🔍</span>
          </a>
        </div>
      </div>
    </div>
  );
};
