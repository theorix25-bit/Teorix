import { createClienteStripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(request: Request) {
  const body: CheckoutBody = await request.json();
  const {
    plan: { id_producto_stripe },
    userId,
  } = body;
  const stripe = createClienteStripe();

  const sesion = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    metadata:{userId: userId},
    line_items: [{ price: id_producto_stripe, quantity: 1 }],
    success_url: `${url}/success`,
    cancel_url: url,
  });
  console.log(sesion)
  return NextResponse.json({ url: sesion.url });
}
