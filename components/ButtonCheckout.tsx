"use client";

import { getLinkCheckOut } from "@/lib/stripe";


function ButtonCheckout({
  userId,
  plan,
  children,
}: {
  userId?: string;
  children: React.ReactNode;
  plan: PlanDB;
}) {
  if (userId == undefined) return null;

  return (
    <>
      <button
        onClick={() => getLinkCheckOut(plan, userId)}
        className="btn btn-theorix  btn-lg fw-bold px-5 py-3"
      >
        {children}
      </button>
    </>
  );
}

export default ButtonCheckout;
