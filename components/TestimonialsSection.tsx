"use client";
import { useEffect, useState } from "react"; // ¡Corregido! Se añadió la coma

const testimonials = [
  {
    name: "Laura M.",
    age: 19,
    result: "APTO ✅",
    text: "Aprobé a la primera sin estudiar mil páginas. El método es brutal.",
    streak: "Racha x5",
  },
  {
    name: "Carlos R.",
    age: 21,
    result: "APTO ✅",
    text: "Mi tutor me salvó. Llevaba 3 suspensos y con THEORIX aprobé directo.",
    streak: "Boss final ✓",
  },
  {
    name: "Ana S.",
    age: 18,
    result: "APTO ✅",
    text: "Estudiar con vídeos es otro nivel. Nada que ver con leer PDFs aburridos.",
    streak: "Speedrun mode",
  },
];

export const TestimonialsSection = () => {
  const [approvalRate, setApprovalRate] = useState(0);

  useEffect(() => {
    // Counter animation
    const target = 85;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setApprovalRate(target);
        clearInterval(timer);
      } else {
        setApprovalRate(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="py-5 py-md-5 custom-bg-card-30 position-relative overflow-hidden custom-font-sans">
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-5">
          <div className="position-absolute top-10 start-10 fs-0 text-primary">
            *
          </div>
          <div className="position-absolute bottom-10 end-10 fs-0 text-secondary">
            X
          </div>
        </div>

        <div className="container position-relative z-index-1">
          <div className="text-center mb-5 mb-lg-5">
            <div className="d-inline-flex align-items-baseline gap-3 mb-3">
              <span className="custom-text-9xl fw-black text-primary neon-glow">
                +98%
              </span>
            </div>
            <h2 className="fs-3 fs-md-2 fw-black text-foreground mb-3">
              de alumnos aprueban a la primera
            </h2>
            <p className="fs-5 text-muted-foreground">
              Y tú serás el siguiente. Sin drama.{" "}
              <span className="text-primary">✓</span>
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4 max-w-1000px mx-auto">
            {testimonials.map((item) => (
              <div className="col">
                <>
                  <div className="bg-background rounded-4 p-4 p-md-5 border border-2 border-primary-20 custom-hover-testimonial position-relative overflow-hidden">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div>
                        <h4 className="fs-5 fw-bold text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-muted-foreground small">{item.age}</p>
                      </div>
                      <div className="px-3 py-1 rounded-pill bg-primary text-primary-foreground small fw-black">
                        {item.result}
                      </div>
                    </div>

                    <blockquote className="text-foreground-90 lh-base mb-4 fst-italic">
                      {item.text}
                    </blockquote>

                    <div className="d-flex align-items-center gap-2">
                      <div className="flex-grow-1 custom-h-px bg-border"></div>
                      <span className="small fw-bold text-secondary text-uppercase tracking-wider">
                        {item.streak}
                      </span>
                    </div>

                    <div className="position-absolute top-4 end-4 fs-1 opacity-0 custom-hover-check text-primary">
                      ✓
                    </div>
                  </div>
                </>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 mt-lg-5">
            <div className="d-inline-flex align-items-center gap-3 px-4 py-3 rounded-4 bg-muted-50 border border-border">
              <span className="fs-2">🎯</span>
              <div className="text-start">
                <p className="small fw-bold text-primary text-uppercase tracking-wider">
                  Achievement Unlocked
                </p>
                <p className="text-foreground fw-semibold lh-sm">
                  Tu APTO está más cerca de lo que piensas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsSection;
