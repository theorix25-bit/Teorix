"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { setErrorLog } from "@/lib/supabase";
import { useUserStore } from "@/hooks/useUseStore";

export function RegistroCompletoUsuario() {
  const { authId: userId } = useUserStore();
  const supabase = createClient();
  if(!userId || userId == undefined) return null

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: registroUsuario, error } = await supabase
        .from("Usuarios")
        .insert([
          {
            auth_id: userId,
            nombre: name,
            apellido: lastName,
            telefono: phone,
            fecha_de_nacimiento: birthdate,
            codigo_postal: zipcode,
          },
        ])
        .select()
        .maybeSingle();
      console.log(registroUsuario);
      console.log(error);

      await supabase
        .from("Planes_usuarios")
        .insert([
          {
            usuario_id: registroUsuario.id,
            plan_id: 1,
            estado: true,
          },
        ])
        .select()
        .maybeSingle();

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
              htmlFor="phone"
              className="block text-sm font-semibold text-lima mb-1"
            >
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="000000000"
              pattern="^(\+34 ?)?[6789]\d{8}$"
              className="text-black w-full rounded-lg border border-marino/20 p-2 focus:outline-none focus:ring-2 focus:ring-lima"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9+]/g, "");
                setPhone(value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-semibold text-lima mb-1"
            >
              Fecha de nacimiento
            </label>
            <input
              id="birthdate"
              type="date"
              placeholder="00/00/0000"
              className="text-black w-full rounded-lg border border-marino/20 p-2 focus:outline-none focus:ring-2 focus:ring-lima"
              onChange={(e) => setBirthdate(e.target.value)}
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
