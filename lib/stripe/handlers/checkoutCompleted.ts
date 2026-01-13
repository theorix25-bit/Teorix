import { supabaseAdmin } from "@/lib/supabase/admin";
import Stripe from "stripe";

export async function checkoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (session.mode !== "subscription") return;

  const { data: usuario } = await supabaseAdmin
    .from("Usuarios")
    .select("id")
    .eq("auth_id", session.metadata?.userId)
    .maybeSingle();

  if (!usuario) throw new Error("Usuario no encontrado");

  // // 🔒 VERIFICAR SI YA EXISTE
  // const { data: existing } = await supabase
  //   .from("Planes_usuarios")
  //   .select("id")
  //   .eq("pago_stripe", session.subscription as string)
  //   .maybeSingle();

  // if (existing) {
  //   console.log(
  //     "checkoutCompleted: subscription ya existe:",
  //     session.subscription
  //   );
  //   return;
  // }

  // ✅ UPDATE SOLO SI NO EXISTE
  await supabaseAdmin
    .from("Planes_usuarios")
    .update({
      usuario_id: usuario.id,
      plan_id: Number(session.metadata?.planId),
      estado: true,
      pago_stripe: session.subscription as string,
      inicio_periodo: new Date(),
    })
    .eq("usuario_id", usuario.id);
  console.log(session.customer, "Customer ID");
  const { data: result } = await supabaseAdmin
    .from("Usuarios")
    .update({
      stripe_customer_id: session.customer as string,
    })
    .eq("auth_id", session.metadata?.userId);
  console.log("customer_id", result);
  console.log("checkoutCompleted handled for user:", usuario.id);
}
