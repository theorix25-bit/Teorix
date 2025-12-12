import { createClienteStripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(request: Request) {
  const body: CheckoutBody = await request.json();
  const { userId, stripeId, planId } = body;
  const stripe = createClienteStripe();

  console.log(userId, stripeId, planId);
  const sesion = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    metadata: { userId: userId, planId: planId },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "T-shirt" },
          unit_amount: 2000,
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
