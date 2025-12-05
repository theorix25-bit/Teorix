"use client";
import { getAllUser } from "@/lib/supabase";
import { useEffect, useState } from "react";

function usuarios() {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(true);

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
          <CardUser user={u} key={i} />
        ))}
      </ul>
    </>
  );
}

export default usuarios;

const CardUser = ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex border items-center px-2 justify-between rounded-md">
        <p>
          {user.nombre} {user.apellido}{" "}
        </p>
        <button className="px-4 py-2" onClick={x => x}> 
          Editar
        </button>
      </div>
    </>
  );
};
