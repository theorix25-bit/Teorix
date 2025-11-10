"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
          emailRedirectTo: `${window.location.origin}/clases`,
        },
      });
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
      <div className="d-flex justify-content-center aling-item-center ">
        <div className="sign-up border-lima p-2 p-md-5 rounded-4 border">
          <h2 className="fs-2 fw-bold text-lima mb-2">Registro</h2>
          <p className="mb-2 small">Crea una cuenta nueva</p>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-3">
              {/* nombre */}
              <div className="mb-2">
                <label htmlFor="inputName"
                className="form-label fw-bold text-lima">
                  Nombre
                </label>
                <input type="text"
                className="form-control"
                id="inputName"
                placeholder="Tu nombre"
                onChange={(e)=>{setName(e.target.value)}} />
              </div>

              {/* Email */}
              <div className="mb-2">
                <label htmlFor="inputCorreo"
                className="form-label fw-bold text-lima">
                  Correo
                </label>
                <input type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="Theo@gmail.com"
                onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              {/* Contraseña */}
              <div className="mb-2">
                <label htmlFor="password"
                className="form-label fw-bold text-lima">
                  Contraseña
                </label>
                <input type="password"
                className="form-control"
                id="password"
                placeholder="*******" 
                onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="mb-3">
                <label htmlFor="repeat-password"
                className="form-label fw-bold text-lima">
                  Repetir contraseña
                </label>
                <input type="email"
                className="form-control"
                id="repeat-password"
                placeholder="*******"
                onChange={(e)=> setRepeatPassword(e.target.value)} />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repetir contraseña</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="********"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div> */}

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="btn btn-theorix w-100 btn-lg" disabled={isLoading}>
                {isLoading ? "Creando una cuenta..." : "Registrase"}
              </Button>
            </div>
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
