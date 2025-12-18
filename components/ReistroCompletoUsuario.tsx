"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { setErrorLog } from "@/lib/supabase";

export function RegistroCompletoUsuario({ userId }: UserAuthId) {
  const supabase = createClient();
  console.log(userId)
  
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
    <div className=" flex justify-center items-top bg-carbon px-4">
      <div className="w-86 max-w-md bg-carbon p-6 rounded-2xl shadow-xl border border-lima">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-lima">Completa tu registro</h2>
          <p className="text-white mt-2">
            Para acceder a las lecciones, por favor completa tu registro.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label
              htmlFor="inputName"
              className="block text-sm font-semibold text-lima mb-1"
            >
              Nombre
            </label>
            <input
              id="inputName"
              type="text"
              placeholder="Tu nombre"
              className=" text-black w-full rounded-lg border border-marino/20 p-2 focus:outline-none focus:ring-2 focus:ring-lima"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-lima mb-1"
            >
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              className="text-black w-full rounded-lg border border-marino/20 p-2 focus:outline-none focus:ring-2 focus:ring-lima"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-semibold text-lima mb-1"
            >
              Código postal
            </label>
            <input
              id="zipcode"
              type="text"
              placeholder="Tu código postal"
              className=" text-black w-full rounded-lg border border-marino/20 p-2 focus:outline-none focus:ring-2 focus:ring-lima"
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-lima text-carbon font-semibold py-3 rounded-lg hover:bg-lima-50 transition"
            disabled={isLoading}
          >
            {isLoading ? "Completando registro..." : "Completar Registro"}
          </Button>
        </form>
      </div>
    </div>
  );
}
