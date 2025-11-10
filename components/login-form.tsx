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
      {/* <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription>
              Introduce tu correo electrónico a continuación para iniciar sesión
              en tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Ingresar"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Regístrate
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div> */}
      <div className="d-flex justify-content-center align-items-center min-vh-100 ">
        <div
          className="login p-4 p-md-5 rounded-4 border border-lima "
        >
          <h2 className="fs-2 fw-bold text-lima mb-3">Iniciar sesión</h2>
          <p className="mb-4 small">
            Introduce tu correo electrónico a continuación para iniciar sesión
            en tu cuenta.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label
                htmlFor="inputCorreo"
                className="form-label fw-bold text-lima"
              >
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="inputCorreo"
                placeholder="Theo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label
                  htmlFor="inputPassword"
                  className="form-label fw-bold text-lima mb-0"
                >
                  Contraseña
                </label>
                <Link
                  href={"/auth/forgot-password"}
                  className="small text-white"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                type="password"
                className="form-control custom-form-control text-foreground"
                id="inputPassword"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="">{error}</p>}
            <Button
              type="submit"
              className="btn btn-theorix btn-lg w-100 fw-bold "
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Ingresar"}
            </Button>
            <p className="text-center small text-muted-foreground mt-3">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/sign-up"
                className="text-white fw-semibold custom-link-hover"
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
