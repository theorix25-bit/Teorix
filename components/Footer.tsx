import { Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-top border-border py-5 py-md-5 px-3 px-md-4">
      <div className="container mx-auto">
        <div className="row row-cols-1 row-cols-md-4 g-5 mb-5 mb-lg-5">
          <div className="col-md-6">
            <h3 className="fs-2 fw-black text-foreground mb-3">
              THEORIX<span className="text-lima">*</span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              No enseñamos más. Enseñamos mejor.
            </p>

            <div className="d-flex gap-3">
              <a
                href="#"
                className="custom-social-icon bg-card border border-border text-foreground custom-hover-social-icon"
              >
                <i className="bi bi-instagram fs-5 text-lima"></i>
              </a>

              <a
                href="#"
                className="custom-social-icon bg-card border border-border text-foreground custom-hover-social-icon"
              >
                <i className="bi bi-youtube fs-5"></i>
              </a>

              <a
                href="#"
                className="custom-social-icon bg-card border border-border text-foreground custom-hover-social-icon"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <h4 className="text-foreground fw-bold mb-3 text-uppercase tracking-wider small">
              Producto
            </h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h4 className="text-foreground fw-bold mb-3 text-uppercase tracking-wider small">
              Soporte
            </h4>
            <ul className="list-unstyled space-y-3">
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-top border-border d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="small text-muted-foreground mb-0">
            © 2025 THEORIX. Modo speedrun activado.
          </p>

          <div className="d-flex align-items-center gap-2">
            <div className="custom-status-dot bg-primary animate-pulse"></div>
            <span className="custom-text-xs text-muted-foreground text-uppercase tracking-wider fw-medium">
              Sistema operativo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
