import { createClienteStripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(request: Request) {
  const body: /* CheckoutBody */ any = await request.json();
  console.log(body);
  const { userId, stripeId, planId, nombre, precio } = body;
  const stripe = createClienteStripe();

  console.log(userId, stripeId, planId);
  const sesion = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    metadata: { userId: userId, planId: planId, plan: body.plan },
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: nombre,
            images: [
              "https://definicion.de/wp-content/uploads/2012/01/imagen-vectorial.png",
            ],
          },
          unit_amount: precio * 100,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: `${url}/success`,
    cancel_url: url,
  });
  return NextResponse.json({ url: sesion.url });
}
