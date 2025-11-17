"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { setErrorLog } from "@/hooks/useSupabase";

export function RegistroCompletoUsuario({ userId }: UserAuthId) {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.rpc("crear_usuario_y_relaciones", {
        p_auth_id: userId,
        p_nombre: name,
        p_apellido: lastName,
        p_codigo_postal: zipcode,
        p_rol: "alumno",
      });
      if (error) {
        await setErrorLog({
          authId: userId,
          details: JSON.stringify({ name, lastName, zipcode }),
          mensaje: error.message,
          origin: "Registro completo del usuario",
        });
      }
      window.location.reload();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Se produjo un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="p-4 rounded-4">
          <div className="text-center">
            <h2 className="fw-bold text-lima mb-3">Completa tu registro</h2>
            <p className="mb-4">
              Para acceder a las lecciones, por favor completa tu registro.
            </p>
          </div>
          <div className="container my-5 d-flex justify-content-center">
            <div className="sign-up border-lima p-2 p-md-5 rounded-4 border">
              <p className="mb-2 fs-4">Datos del usuario</p>

              <form onSubmit={handleSignUp} className="w-100">
                <div className="mb-2">
                  <label
                    htmlFor="inputName"
                    className="form-label fw-bold text-lima"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Tu nombre"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="lastName"
                    className="form-label fw-bold text-lima"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Tu apellido"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="zipcode"
                    className="form-label fw-bold text-lima"
                  >
                    código postal
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    placeholder="Tu código postal"
                    onChange={(e) => {
                      setZipcode(e.target.value);
                    }}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                  type="submit"
                  className="btn btn-theorix w-100 btn-lg mt-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Completando registro..." : "Completar Registro"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
