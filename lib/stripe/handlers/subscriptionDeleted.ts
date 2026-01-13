import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function subscriptionDeleted(
  event: Stripe.Event
) {
  const subscription = event.data.object as Stripe.Subscription;
  const supabase = await createClient();

  await supabase
    .from("Planes_usuarios")
    .update({
      estado: false,
      actualizado_en: new Date(),
    })
    .eq("pago_stripe", subscription.id);

    console.log( "subscriptionDeleted handled for subscription:", subscription.id );
}
