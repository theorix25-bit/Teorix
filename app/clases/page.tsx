"use client";
import { useEffect, useState } from "react";
import { getUserDBForId, getUserAuthId } from "@/lib/supabase";
import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import Clases from "@/components/Clases";
import ClasesB from "@/components/ClasesB";
import SkeletonClases from "@/components/skeleton/skeletonClases";

const PageClases = () => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [authId, setAuthId] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchUsuario = async () => {
      const authId = await getUserAuthId();
      const data = await getUserDBForId(authId);
      setUsuario(data ? data[0] : null);
      setAuthId(authId);
      setLoading(false);
    };
    fetchUsuario();
  }, []);
  if (loading) return <SkeletonClases />;
  {
    return !usuario ? <RegistroCompletoUsuario userId={authId} /> : <ClasesB />;
  }

};

export default PageClases;
