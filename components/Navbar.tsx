// "use client";
import Link from "next/link";
import useUserAuth from "@/hooks/useUserAuth";
import { LogoutButton } from "./logout-button";

export default async function Header() {
  const { user } = await useUserAuth();
  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Clases", href: "/clases" },
    { name: "Blog", href: "/blog" },
  ];
  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg bg-body-dark ">
          <div className="container">
            <a className="navbar-brand grandstander fw-bold text-white" href="/">
              THEORIX
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto d-flex">

                <span className="navbar-text me-3 text-lima" >{user ? `Hola ${user.email}`: ""}</span>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} className="nav-link">
                    {item.name}
                  </Link>
                ))}

                {user ? (
                  <>
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link href={"/auth/login"} className=" nav-link">
                      Ingresar
                    </Link>
                    <Link href={"/auth/sign-up"} className="nav-link">
                      Registrarse
                      
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
