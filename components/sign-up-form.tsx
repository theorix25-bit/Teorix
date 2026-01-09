"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const emailRedirectTo = `https://teorix.es/clases`;
  const [repeatPassword, setRepeatPassword] = useState("");
  const [terminos, setTerminos] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }
    const datosIngreso = {
      email,
      options: { data: { name }, emailRedirectTo },
      password,
      makeAdmin: false,
    };
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify(datosIngreso),
      });
      const data = await res.json();

      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Se produjo un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center text-white mt-4">
        <div className="p-5 p-md-5 border rounded-xl border-lima ">
          <h2 className="text-3xl font-extrabold capitalize fw-bold text-lima mb-3">
            Registro
          </h2>
          <p className="mb-4 text-white">Crea una cuenta nueva</p>
          <form onSubmit={handleSignUp}>
            <div className="mb-2">
              <label htmlFor="inputName" className="text-xl text-lima">
                Nombre
              </label>
              <input
                type="text"
                className="w-full text-white placeholder:text-gray-400 px-2 py-1 mt-1 bg-transparent border rounded-md"
                id="inputName"
                placeholder="Tu nombre"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="inputCorreo" className="text-xl text-lima">
                Correo
              </label>
              <input
                type="email"
                className="w-full text-white placeholder:text-gray-400 px-2 py-1 mt-1 bg-transparent border rounded-md"
                id="inputCorreo"
                placeholder="Theo@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="text-xl text-lima">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full text-white placeholder:text-gray-400 px-2 py-1 mt-1 bg-transparent border rounded-md"
                id="password"
                placeholder="*******"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeat-password" className="text-xl text-lima">
                Repetir contraseña
              </label>
              <input
                type="password"
                className="w-full text-white placeholder:text-gray-400 px-2 py-1 mt-1 bg-transparent border rounded-md"
                id="repeat-password"
                placeholder="*******"
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="terminos" className="mr-1  hover:text-lima">
                <Link href={"/politicas-de-cookies"}>
                  Términos y condiciones
                </Link>
              </label>
              <input type="checkbox" checked={terminos} onChange={(e)=> setTerminos(e.target.checked)}  name="" id="" required />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="px-2 py-3 w-full bg-lima text-carbon"
              disabled={isLoading}
            >
              {isLoading ? "Creando una cuenta..." : "Registrase"}
            </Button>

            <div className="mt-2 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
