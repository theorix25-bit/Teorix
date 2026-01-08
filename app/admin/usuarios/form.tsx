"use client";
import { createClient } from "@/lib/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PropPage {
  users: TypeUsers[];
}
function Form({ users }: PropPage) {
  const supabase = createClient();

  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState<User>();
  const [plan, setPlan] = useState("");
  const [nombrePlanes, setNombrePlanes] = useState<any[]>([]);
  const [emailEncontrado, setEmailEncontrado] = useState<string | undefined>(
    ""
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const authId = users.filter((e) => e.email == searchUser)[0];

    if (!authId) toast.error(`El Correo: ${searchUser} es incorrecto`);

    if (authId !== undefined) {
      const { data } = await supabase
        .from("Usuarios")
        .select("*")
        .eq("auth_id", authId.id)
        .maybeSingle();
      setUser(data);
      setEmailEncontrado(authId.email);
    }
  };
  async function fetchPlan() {
    if (user) {
      const { data: planUser } = await supabase
        .from("Planes_usuarios")
        .select("*")
        .eq("usuario_id", user.id)
        .maybeSingle();
      setPlan(planUser.plan_id);

      const { data: nombrePlan, error: errorNombrePlan } = await supabase
        .from("Planes")
        .select("*");
      if (errorNombrePlan) console.log(errorNombrePlan);
      else {
        setNombrePlanes(nombrePlan);
      }
    }
  }
  const actualizarPlan = async (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      const { data: nuevoPlan, error: nuevoPlanError } = await supabase
        .from("Planes_usuarios")
        .update({ plan_id: plan })
        .eq("usuario_id", user.id)
        .select("*")
        .maybeSingle();

      if (nuevoPlanError) {
        console.log(nuevoPlanError);
        toast.error("Error al Actualizar el plan, vuelva a intentar");
      } else {
        toast.success(`Plan Actualizado`);
      }
      console.log(nuevoPlan);
    }
  };
  useEffect(() => {
    fetchPlan();
  }, [user]);
  return (
    <div className=" max-w-lg rounded-lg mx-auto">
      <form
        action=""
        className="flex justify-center max-w-xl mx-auto px-4 py-6"
        onSubmit={handleSubmit}
      >
        <div className="">
          <input
            type="search"
            value={searchUser}
            className="rounded-md px-2 py-1 text-black mr-2"
            placeholder="Theo@gmail.com"
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
          />
          <button
            type="submit"
            // onClick={}
            className="px-2 py-1 border rounded-md "
          >
            Buscar
          </button>
        </div>
      </form>
      {user && (
        <div className="mx-auto flex flex-col items-center">
          <h2>Usuario: {emailEncontrado}</h2>
          <div>
            <p>Nombre: {user.nombre}</p>
            <p>Apellido: {user.apellido}</p>
            <p>Telefono: {user.telefono}</p>
            <p>Codigo postal: {user.codigo_postal}</p>
          </div>

          <form onSubmit={actualizarPlan} className="p-0">
            <label htmlFor="" className="block">
              Plan del Usuario
            </label>
            <select
              name=""
              id=""
              onChange={(e) => {
                setPlan(e.target.value);
              }}
              className="text-black"
              value={plan}
            >
              <option value="">-- Elegir plan --</option>
              {nombrePlanes.map((n, i) => (
                <option value={n.id} key={i}>
                  {n.nombre} / {n.fase}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="border px-2 py-1 block mt-2 mx-auto"
            >
              {" "}
              cambiar plan
            </button>
          </form>
        </div>
      )}

      {/* <blockquote>{JSON.stringify(user, null, 2)}</blockquote> */}
    </div>
  );
}

export default Form;
