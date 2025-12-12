"use client";
import ButtonCheckout from "@/components/ButtonCheckout";
import { useUser } from "@/hooks/useUser";
import { getAllPlans, getPlanById } from "@/lib/stripe";
import { getUserAuthId, searchSusUser, updatePlanUser, upDateSusUser } from "@/lib/supabase";
import { get } from "http";
import { useEffect, useState } from "react";

function page() {
  const fetchData = async () => {
    const userId = await getUserAuthId();
    const sus = await searchSusUser(userId);
    const res = await upDateSusUser(sus[0].usuario_id, 1);
    console.log(res)
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="text-white flex justify-center items-center mt-20 ">
      <pre>hola devo</pre>
    </div>
  );
}

export default page;
