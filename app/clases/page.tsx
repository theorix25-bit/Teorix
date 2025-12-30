"use client";
import { useEffect } from "react";
import { useUserStore } from "@/hooks/useUseStore";
import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import ClaseSkeleton from "@/components/skeleton/ClaseSkeleton";
import Clases from "@/components/Clases";

const PageClases = () => {
  const { user, authId, loading } = useUserStore();
  console.log(user);
  if (loading) {
    return <ClaseSkeleton />;
  }

  const isLogged = user?.length == 0;

  if (!isLogged) {
    return <Clases />;
  }

  return <RegistroCompletoUsuario userId={authId} />;
};

export default PageClases;
