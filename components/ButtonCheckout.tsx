"use client";

import { getLinkCheckOut } from "@/lib/stripe";


function ButtonCheckout({
  userId,
  plan,
  children,
}: {
  userId?: string;
  plan: PlanDB;
  children: React.ReactNode;
}) {
  if (userId == undefined) return null;

  return (
    <>
      <button
        onClick={() => getLinkCheckOut(plan, userId)}
        className=" text-md border rounded-md px-5 py-3 text-lima border-lima"
      >
        {children}
      </button>
    </>
  );
}

export default ButtonCheckout;
