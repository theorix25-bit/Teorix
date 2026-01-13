import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function invoicePaymentFailed(
  event: Stripe.Event
) {
  const invoice = event.data.object as Stripe.Invoice & {
  subscription: string;
};
  const supabase = await createClient();

  // seguimos activos mientras Stripe reintenta
  await supabase
    .from("Planes_usuarios")
    .update({
      estado: true,
      actualizado_en: new Date(),
    })
    .eq("pago_stripe", invoice.subscription as string);
    console.log( "invoicePaymentFailed handled for subscription:", invoice.subscription );

}
