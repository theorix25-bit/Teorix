import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClienteStripe } from "@/lib/stripe/client";
import { updatePlanUser } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const stripe = createClienteStripe();

  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Error verificando webhook", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan_id = Number(session.metadata?.planId);

      // obtener todos datos del usuario
      const { data: user} = await supabase
        .from("Usuarios")
        .select("*")
        .eq("auth_id", userId)
        .maybeSingle();

      // cambiar el plan del usuario
      const { data: plan, error: errorPlan } = await supabase
        .from("Planes_usuarios")
        .update({ plan_id: plan_id })
        .eq("usuario_id", user?.id)
        .select();

      if (errorPlan) {
        console.log("Error updating user plan:", errorPlan);
      } else {
        console.log("User plan updated successfully:", plan);
      }
      break;

    default:
      console.log(`Evento desconocido ${event.type}`);
  }

  return NextResponse.json(null, { status: 200 });
}
