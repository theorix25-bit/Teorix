"use client";
import ButtonCheckout from "@/components/ButtonCheckout";
import { getAllPlans, getPlanById } from "@/lib/stripe";
import { getUserAuthId, getPlanDBForId } from "@/lib/supabase";
import { useEffect, useState } from "react";

function page() {
  const [plan, setPlan] = useState<any>([]);
  const [userId, setUserId] = useState<string>();

  const fetchData = async () => {
    const plans = await getAllPlans();
    setPlan(plans[1]);
    const Auth = await getUserAuthId();
    console.log(plans);
    Auth && setUserId(Auth);
  };

  useEffect(() => {
    fetchData();
    console.log(userId);
  }, []);
  return (
    <div className="text-white flex justify-center items-center mt-20 ">
   <ButtonCheckout plan={plan} userId={userId}> Ir a pagar</ButtonCheckout>
    </div>
  );
}

export default page;
