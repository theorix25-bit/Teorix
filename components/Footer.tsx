import Link from "next/link";
const menu1 = [
  { label: "FAQs", url: "#faqs" },
  { label: "Contacto", url: "#contacto" },
  { label: "Aviso legal", url: "/aviso-legal" },
  { label: "Politicas de Cookies", url: "/politicas-de-cookies" },
  { label: "Privacidad", url: "/privacidad" },
  { label: "Devoluciones", url: "/devoluciones" },
];
// const menu2

export const Footer = () => {
  return (
    <footer className=" text-white border-t border-gray-700/60">
      <div className="">
        <div className=" flex flex-row justify-between items-top gap-4 md:px-9 px-2 md:py-7 py-2">
          <div className="col">
            <h3 className="text-3xl font-bold mb-3">
              THEORIX<span className="text-lima"> *</span>
            </h3>
            <p className=" mb-4">No enseñamos más. Enseñamos mejor.</p>

            <div className="d-flex gap-3">
              <Link href="#" className="">
                <i className="bi bi-instagram fs-5 text-lima"></i>
              </Link>

              <Link href="#" className="">
                <i className="bi bi-youtube fs-5"></i>
              </Link>
            </div>
          </div>
          <div className="col hidden md:block">
            <h4 className="text-foreground text-xl fw-bold mb-3 text-uppercase tracking-wider small">
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
          <div className="col hidden md:block">
            <h4 className="text-foreground fw-bold text-xl mb-3 text-uppercase tracking-wider small">
              Soporte
            </h4>
            <ul className="list-unstyled space-y-3">
              {menu1.map((m) => (
                <li key={m.label}>
                  <Link
                    href={m.url}
                    className="text-muted-foreground custom-link-hover"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col md:hidden">
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
        <div className="col md:hidden ">
          <h4 className="text-foreground fw-bold mb-3 text-uppercase tracking-wider small">
            Soporte
          </h4>
          <ul className="list-unstyled space-y-3">
            {menu1.map((m) => (
              <li key={m.label}>
                <Link
                  href={m.url}
                  className="text-muted-foreground custom-link-hover"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between items-center gap-3">
          <p className="text-xs p-1">© 2025 THEORIX. Modo speedrun activado.</p>
        </div>
      </div>
    </footer>
  );
};
