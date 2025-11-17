"use client";
import { useEffect, useState } from "react";
import { getUserDBForId, getUserAuthId } from "@/hooks/useSupabase";
import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import Clases from "@/components/Clases";

const PageClases = () => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [authId, setAuthId] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchUsuario = async () => {
      const authId = await getUserAuthId();
      const data = await getUserDBForId(authId || "");
      setUsuario(data.usuarios ? data.usuarios[0] : null);
      setAuthId(authId);
      setLoading(false);
    };
    fetchUsuario();
  }, []);
  if (loading) return <div className="text-center py-5">Cargando...</div>;
  {
    !usuario ? (
      <RegistroCompletoUsuario userId={authId} />
    ) : (
      <Clases />
    );
  }
  return <Clases />;
};

export default PageClases;
