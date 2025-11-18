import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClienteStripe } from "@/lib/stripe/client";
import { updatePlanUser } from "@/hooks/useSupabase";

export async function POST(req: Request) {
  const stripe = createClienteStripe();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;
  console.log("webhook recibido");

  // let event: Stripe.Event;

  // try {
  //   event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  // } catch (err: any) {
  //   console.error("❌ Error verificando webhook", err.message);
  //   return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  // }

  // // 👇 Evento principal: pago confirmado del Checkout
  // if (event.type === "checkout.session.completed") {
  //   const session = event.data.object as Stripe.Checkout.Session;

  //   const userId = session.metadata?.userId;
  //   const subscription_id = session.metadata?.planId;
  //   const subscriptionId = session.subscription;
  //   console.log(subscriptionId);
  //   console.log("Pago confirmado de:", userId);
  //   console.log("Subscription ID:", subscriptionId);

  //   updatePlanUser(userId, subscription_id);
  // }

  // return NextResponse.json({ received: true });
  return NextResponse.json("recibido");
}
