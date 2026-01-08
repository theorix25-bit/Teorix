import { createClienteStripe } from "@/lib/stripe/client";
const stripe = createClienteStripe();

export async function getAllPlans() {
  const planes = await stripe.prices.list();

  const sortedPlanes = planes.data.sort(
    (a, b) => a.unit_amount! - b.unit_amount!
  );
  return sortedPlanes;
}

export async function getPlanById(id: string)  {
  const plan = await stripe.prices.retrieve(id);
  return plan;
}

export async function getLinkCheckOut(plan: PlanDB, userId: string) {
  
  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({
      nombre: plan.nombre,
      precio: plan.precio,
      userId: userId,
      planId: plan.id,
      stripeId: plan.id_producto_stripe,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const { url } = await res.json();

  window.location.href = url;
}

export async function updateProduct(priceId: string) {
  return stripe.prices.update(priceId, {
    active: false,
  }); 
}
export async function updatePrice(
  productId: string,
  name: string,
  price: number
) {
  
  const newPrice = await stripe.prices.create({
    product: productId,
    unit_amount: price,
    currency: "eur",
    nickname: name,
    recurring: { interval: "month" },
  });

  return newPrice;
}
