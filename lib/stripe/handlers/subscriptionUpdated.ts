import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function subscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription & {
    current_period_start: number;
    current_period_end: number;
  };
  const supabase = await createClient();

  if (subscription.status === "active" || subscription.status === "past_due") {
    await supabase
      .from("Planes_usuarios")
      .update({
        estado: true,
        inicio_periodo: new Date(subscription.current_period_start * 1000),
        fin_periodo: new Date(subscription.current_period_end * 1000),
        actualizado_en: new Date(),
      })
      .eq("pago_stripe", subscription.id);
    console.log(
      "subscriptionUpdated handled for subscription active:",
      subscription.id
    );
  }

  if (subscription.status === "unpaid" || subscription.status === "canceled") {
    await supabase
      .from("Planes_usuarios")
      .update({
        estado: false,
        actualizado_en: new Date(),
      })
      .eq("pago_stripe", subscription.id);
    console.log(
      "subscriptionUpdated handled for subscription canceled:",
      subscription.id
    );
  }
}
