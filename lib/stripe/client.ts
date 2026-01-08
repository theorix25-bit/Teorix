import Stripe from "stripe";

export function createClienteStripe() {
  const STRIPE_API_SECRETE = process.env.STRIPE_API_SECRETE;
  
  if (!STRIPE_API_SECRETE) throw new Error("Missing STRIPE_API_SECRETE");

  const stripe = new Stripe(STRIPE_API_SECRETE);
  return stripe;
}
