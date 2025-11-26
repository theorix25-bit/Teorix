"use client";
import { useState } from "react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export default function MobileMenu({ navigation, user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden p-2 z-50 relative"
        onClick={() => setOpen(true)}
      >
        ≡
      </button>

      {open && (
        <div className="fixed inset-0 bg-carbon flex flex-col justify-between p-8 z-50">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">
              {user == undefined ? (
                <span>Hola extraño</span>
              ) : (
                <span>Hola @usuario</span>
              )}
            </div>
            <button className="text-3xl" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <ul className="flex flex-col items-center gap-6 text-2xl">
            {navigation.map((item) => (
              <li key={item.name} className="hover:text-lima">
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>


          {user !== undefined ? (
            <LogoutButton />
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href={"/auth/login"}
                onClick={() => setOpen(false)}
                className="border bg-lima text-carbon py-2 rounded text-center hover:bg-lime-400"
              >
                Ingresar
              </Link>
              <Link
                href={"/auth/sign-up"}
                onClick={() => setOpen(false)}
                className=" text-white py-2 border border-lima rounded text-center"

              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
