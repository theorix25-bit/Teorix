"use client";
import { useState } from "react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export default function MobileMenu({ navigation, user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden  px-3 rounded-lg text-lima z-50 text-4xl relative border-lima border"
        onClick={() => setOpen(true)}
      >
        ≡
      </button>

      {open && (
        <div className="fixed inset-0 bg-carbon flex flex-col justify-between px-4 py-4 z-[150]">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">
              {user == undefined ? (
                <span className="text-lima text-3xl">Hola extraño</span>
              ) : (
                <span className="text-lima text-3xl">Hola @usuario</span>
              )}
            </div>
            <button className="px-3 rounded-lg text-lima z-50 text-4xl border-lima border" onClick={() => setOpen(false)}>
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
            <div className="flex flex-col gap-3 px-4 py-4">
              <Link
                href={"/auth/login"}
                onClick={() => setOpen(false)}
                className="border bg-lima text-carbon py-2 text-center text-xl font-extrabold4  rounded-xl hover:bg-lime-400"
              >
                Ingresar
              </Link>
              <Link
                href={"/auth/sign-up"}
                onClick={() => setOpen(false)}
                className=" text-white py-2 border border-lima text-center text-xl font-extrabold4  rounded-xl"

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
