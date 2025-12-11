"use client";
import { useEffect, useState } from "react";
import {
  getUserDBForId,
  getUserAuthId,
  getUserProgress,
  getContentClases,
} from "@/lib/supabase";
import { RegistroCompletoUsuario } from "@/components/ReistroCompletoUsuario";
import ClasesB from "@/components/ClasesB";
import SkeletonClases from "@/components/skeleton/skeletonClases";
import { useUser } from "@/hooks/useUser";
import { useProgress } from "@/hooks/useProgress";

const PageClases = () => {
  const { setUser, user, authId } = useUser();
  const {setProgreso} = useProgress()
  const [loading, setLoading] = useState(true);

  // fetch data
  const fetchUsuario = async () => {
    setUser();
    setLoading(false);
    // setProgreso
  };
  useEffect(() => {
    fetchUsuario();
  }, []);

  console.log("User in page clases:", user);
  if (loading) return <SkeletonClases />;
  {
    return user.length == 0 ? <RegistroCompletoUsuario userId={authId} /> : <ClasesB />;
  }
};

export default PageClases;
