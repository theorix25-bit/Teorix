"use client";
import { useEffect, useState } from "react";

import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import ClasesB from "@/components/ClasesB";
import SkeletonClases from "@/components/skeleton/skeletonClases";
import { useUserStore } from "@/hooks/useUseStore";

const PageClases = () => {
  const { user, loading } = useUserStore();
  const authId = user?.[0]?.auth_id;
  useEffect(() => {}, []);

  if (loading) return <SkeletonClases />;

  return user ? <ClasesB /> : <RegistroCompletoUsuario userId={authId} />;
};

export default PageClases;
