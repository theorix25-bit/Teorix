import { createClienteStripe } from "@/lib/stripe/client";
const stripe = createClienteStripe();

export async function getAllPlans() {
  const planes = await stripe.prices.list();
  
  const sortedPlanes = planes.data.sort(
    (a, b) => a.unit_amount! - b.unit_amount!
  );
  return sortedPlanes;
}

export async function getPlanById(id: string) {
  const plan = await stripe.prices.retrieve(id);
  return plan;
}

export async function getLinkCheckOut(plan: PlanDB,userId:string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({
      userId,
      plan: plan.id
      
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const { url } = await res.json();

  window.location.href = url;
}
