import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

export async function invoicePaymentSucceeded(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice & {
    subscription: string;
  };
  const supabase = await createClient();

  await supabase
    .from("Planes_usuarios")
    .update({
      estado: true,
      inicio_periodo: new Date(invoice.period_start * 1000),
      fin_periodo: new Date(invoice.period_end * 1000),
      actualizado_en: new Date(),
    })
    .eq("pago_stripe", invoice.subscription as string);

    console.log( "invoicePaymentSucceeded handled for subscription:", invoice.subscription );
}
