import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function checkoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (session.mode !== "subscription") return;

  const supabase = await createClient()

  // 1️⃣ localizar usuario
  const { data: usuario } = await supabase
    .from("Usuarios")
    .select("id")
    .eq("auth_id", session.metadata?.userId)
    .maybeSingle();

  if (!usuario) throw new Error("Usuario no encontrado");

  // 2️⃣ crear suscripción
  await supabase.from("Planes_usuarios").insert({
    usuario_id: usuario.id,
    plan_id: Number(session.metadata?.planId),
    estado: true,
    pago_stripe: session.subscription as string, // stripe_subscription_id
    inicio_periodo: new Date(),
  });

  // 3️⃣ guardar customer de stripe en Usuarios
  await supabase
    .from("Usuarios")
    .update({
      stripe_customer_id: session.customer as string, // stripe_customer_id
    })
    .eq("auth_id", usuario.id);

    console.log("checkoutCompleted handled for user:", usuario.id);
}
