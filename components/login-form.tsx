"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      // router.push("/clases");
      window.location.href = "/clases";
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center text-white mt-4">
        <div className="p-5 p-md-5 border rounded-xl border-lima ">
          <h2 className="text-3xl font-extrabold capitalize fw-bold text-lima mb-3">
            Iniciar sesión
          </h2>
          <p className="mb-4 text-white">
            Introduce tu correo electrónico para iniciar sesión.
          </p>

          <form onSubmit={handleLogin} className="">
            <div className="mb-3">
              <label htmlFor="inputCorreo" className="text-xl text-lima">
                Correo
              </label>
              <input
                type="email"
                className="w-full text-white placeholder:text-gray-400 px-2 py-1 mt-1 bg-transparent border rounded-md"
                id="inputCorreo"
                placeholder="Theo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="inputPassword"
                  className="text-xl text-lima"
                >
                  Contraseña
                </label>
                <Link
                  href={"/auth/forgot-password"}
                  className="text-sm underline text-white"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                type="password"
                className="w-full text-white placeholder:text-gray-400 px-2 py-1 mt-1 bg-transparent border rounded-md"
                id="inputPassword"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="">{error}</p>}
            <Button
              type="submit"
              className=" mt-2 px-3 py-2 text-center bg-lima w-full capitalize text-carbon text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Ingresar"}
            </Button>
            <p className="text-center text-sm mt-3">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/sign-up"
                className="text-white font-bold underline"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
