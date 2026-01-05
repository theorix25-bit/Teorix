import Link from "next/link";
const menu1 = [
  {label:"FAQs",url:"/faqs"},
  {label:"Contacto",url:"/contacto"},
  {label:"Aviso legal",url:"/aviso-legal"},
  {label:"Politicas de Cookies",url:"/politicas-de-cookies"},
  {label:"Privacidad",url:"/privacidad"},
]
// const menu2

export const Footer = () => {
  return (
    <footer className=" text-white border-t border-gray-700/60">
      <div className="">
        <div className=" flex flex-row justify-between items-top gap-4 px-9 py-7">
          <div className="col">
            <h3 className="text-3xl font-bold mb-3">
              THEORIX<span className="text-lima"> *</span>
            </h3>
            <p className=" mb-4">
              No enseñamos más. Enseñamos mejor.
            </p>

            <div className="d-flex gap-3">
              <Link href="#" className="">
                <i className="bi bi-instagram fs-5 text-lima"></i>
              </Link>

              <Link href="#" className="">
                <i className="bi bi-youtube fs-5"></i>
              </Link>
            </div>
          </div>

          <div className="col">
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

          <div className="col">
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
                <Link href="/" className="text-muted-foreground custom-link-hover">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="text-muted-foreground custom-link-hover">
                  Aviso legal
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground custom-link-hover">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-3">
          <p className="text-xs p-1">
            © 2025 THEORIX. Modo speedrun activado.
          </p>
        </div>
      </div>
    </footer>
  );
};
