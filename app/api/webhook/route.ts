import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClienteStripe } from "@/lib/stripe/client";
import { updatePlanUser } from "@/hooks/useSupabase";

export async function POST(req: Request) {
  const stripe = createClienteStripe();

  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    console.log(endpointSecret);
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Error verificando webhook", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const subscription_id = session.metadata?.planId;
      updatePlanUser(userId, subscription_id);
      break;

    default:
      console.log(`Evento desconocido ${event.type}`);
  }

  return NextResponse.json(null, { status: 200 });
}
