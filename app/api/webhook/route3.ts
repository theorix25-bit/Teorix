import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClienteStripe } from "@/lib/stripe/client";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs"; 

const stripe = createClienteStripe();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Error verificando webhook", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const planId = session.metadata?.planId;
    const subscriptionId = session.subscription;

    console.log("🟢 Pago confirmado", { userId, planId, subscriptionId });

    // UPDATE EN BASE DE DATOS USANDO SUPABASE ADMIN
    await supabaseAdmin
      .from("users")
      .update({
        plan: planId,
        subscription_id: subscriptionId,
      })
      .eq("id", userId);
  }

  return NextResponse.json({ received: true });
}
