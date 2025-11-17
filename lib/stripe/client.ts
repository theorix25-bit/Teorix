import Stripe from "stripe";

export function createClienteStripe() {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_SECRETE || "");
  return stripe;
}
