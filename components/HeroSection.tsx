import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
// import heroBg from "@/assets/hero-bg.jpg";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden custom-hero-section">
        {/* <div
          className="position-absolute w-100 h-100 top-0 start-0 bg-cover bg-center"
          style="background-image: url('URL_DE_TU_IMAGEN_DE_FONDO');"
        >
          <div className="position-absolute w-100 h-100 top-0 start-0 hero-gradient-overlay"></div>
        </div> */}

        {/* <div className="position-absolute top-20 start-10 fs-1 text-primary animate-spin-slow opacity-20">
          *
        </div>
        <div className="position-absolute top-40 end-20 fs-2 text-secondary animate-spin-slow opacity-20">
          *
        </div>
        <div className="position-absolute bottom-32 start-25 fs-5 text-primary animate-pulse-glow opacity-30">
          X
        </div> */}

        <div className="position-relative z-index-1 container px-3 px-md-4 text-center">
          {/* <div className="d-flex justify-content-center mb-5">
            <div className="position-relative">
              <svg
                className="w-24 h-24 text-primary animate-blink custom-dropshadow-neon"
                stroke-width="2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>

              <div className="position-absolute rounded-circle inset-minus-4 bg-primary-20 custom-blur-xl animate-pulse-glow"></div>
            </div>
          </div> */}

          <h1 className="display-1 display-md-1 fw-black mb-3 lh-sm">
            <span className="d-block text-foreground">Estudia menos.</span>
            <span className="d-block text-lima ">Aprueba más.</span>
          </h1>

          <p className="fs-4 fs-md-3 text-muted-foreground max-w-500px mx-auto mb-5 fw-medium">
            El teórico en modo{" "}
            <span className="text-lima fw-bold">speedrun</span>. Tutor real,
            método probado y cero drama.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
            <Link href={"./clases"} className="btn btn-theorix btn-lg custom-group">
              Prueba la versión gratis
            </Link>
            <Link href={"./clases"} className="btn btn-theorix btn-lg custom-group">
              Quiero mi cheatcode
            </Link>
          </div>

          <div className="mt-5 d-inline-flex align-items-center gap-2 px-4 py-3 rounded-pill custom-badge-glow border border-primary-20">
            <div className="d-flex custom-space-x-neg-2">
              <div className="custom-avatar bg-gradient-primary-secondary border-2 border-background"></div>
              <div className="custom-avatar bg-gradient-primary-secondary border-2 border-background"></div>
              <div className="custom-avatar bg-gradient-primary-secondary border-2 border-background"></div>
              <div className="custom-avatar bg-gradient-primary-secondary border-2 border-background"></div>
            </div>
            <span className="fs-6 fw-semibold text-foreground">
              +12.847 aprobados este año
            </span>
            <span className="text-primary">✓</span>
          </div>
        </div>

        <div className="position-absolute bottom-0 start-0 w-100 h-32 bottom-gradient-fade"></div>
      </div>
  );
};


