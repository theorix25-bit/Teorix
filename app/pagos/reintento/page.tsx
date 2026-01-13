import Link from "next/link";
import { XCircle } from "lucide-react";
import { createClienteStripe } from "@/lib/stripe/client";


export default async function BillingRequiredPage() {

  const stripe = createClienteStripe()

  const session = await stripe.billingPortal.sessions.create({
    customer: "cus_Tmd53RE4YutTG0",
    return_url:"http://localhost:3000/pagos/reintento"

  })
  session.url
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="border border-lima shadow-lg rounded-xl p-8 max-w-md w-full">
        <XCircle className="w-16 h-16 text-hoodie mx-auto mb-4" />

        <h1 className="text-2xl font-semibold mb-2 text-white">
          No pudimos procesar tu pago
        </h1>

        <p className="text-white mb-6">
          Tu suscripción está suspendida temporalmente.  
          Para continuar usando la plataforma, por favor actualiza tu método de pago y realiza el pago pendiente.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/billing/update-payment"
            className="w-full py-3 rounded-lg bg-lima text-black font-medium hover:bg-lima/70 transition"
          >
            Actualizar método de pago
          </Link>

          <Link
            href="/"
            className="w-full py-3 rounded-lg border border-white text-white font-medium hover:bg-white/10 transition"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Si crees que es un error, por favor contacta con soporte.
        </p>
      </div>
    </main>
  );
}
