"use client";
import { getAllUser, updateTableDB } from "@/lib/supabase";
import { useEffect, useState } from "react";

function usuarios() {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(true);

  const saveChanges = () => {
    alert("cambios");
  };
  const fetchUsers = async () => {
    const user = await getAllUser();
    setUsers(user);
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return loading! ? (
    <>
      <div className="flex flex-col gap-3 animate-pulse px-4 mt-4">
        {Array.from({ length: 5 }).map((t, i) => (
          <div key={i} className="w-full h-10 rounded-md bg-zinc-800"></div>
        ))}
      </div>
    </>
  ) : (
    <>
      <ul className="px-4 mt-4 flex flex-col gap-3">
        {users?.map((u, i) => (
          <CardUser user={u} key={i} callback={saveChanges} />
        ))}
      </ul>
    </>
  );
}

export default usuarios;

const CardUser = ({ user, callback }: { user: User; callback: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    // const res = await getUserDBForId("16");
    // console.log(res);
  };

  // evento de abrir
  // evento de buscar
  //
  useEffect(() => {
    // fetchUsers();
  }, []);

  return (
    <>
      <div>
        <div className="flex border items-center px-2 justify-between rounded-md">
          <p>
            {user.nombre} {user.apellido}{" "}
          </p>
          <button className="px-4 py-2" onClick={() => setOpen(!open)}>
            {open ? "cerrar" : "editar"}
          </button>
        </div>
        {open &&
          (loading ? (
            "skeleton"
          ) : (
            <div className={` h-64 w-full border`}>
              <form action="">
                <div>
                  <label htmlFor="">Plan actual: {} </label>
                  <select name="" className="text-black" id="">
                    <option value="">plan 1</option>
                    <option value="">plan 2</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Rol</label>
                  <select name="" className="text-black" id="">
                    <option value="">admin</option>
                    <option value="">alumono</option>
                  </select>
                </div>
              </form>
              <button>Guardar</button>
            </div>
          ))}
      </div>
    </>
  );
};
