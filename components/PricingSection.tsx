import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Stripe from "stripe";
import ButtonCheckout from "./ButtonCheckout";
import Link from "next/link";
import { getPlansDB } from "@/hooks/useSupabase";
import { getAllPlans } from "@/hooks/useStripe";

// HOLA MIGUEL PARA EL LUNES DEBES CONTINUAR CON LO SIGUIENTE:
/*
  MUY IMPORTANTE ESTA PENDIENTE QUE AL REALIZAR EL PAGO PODAMOS SABER QUE USUARIO REALIZO EL PAGO PARA HACER LOS CAMBIOS EN LA BASE DE DATOS 
  HASTA AHORA TENGO PENSADO USAR EL HOOK DE STRIPE, LA WEB LO ESCUCHE Y ACTUALICE LOS DATOS DEL USUARIO 
*/
// const pl =  await getAllPlans();
// console.log(pl);
export const PricingSection = async () => {
  const plans = await getPlansDB();
  {
    if (plans === undefined) return null;
  }
  return (
    <section className=" container-fluid " id="planes">
      {/* Background glow */}

      <div className="mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <h2 className="display-2 mb-4">
            Elige tu <span className="text-lima">modo</span>
          </h2>
          <p className="mx-auto">
            Todos los planes incluyen el método THEORIX. Sin permanencia.
          </p>
        </div>

        {/* Pricing cards */}

        <div className="row g-3 px-5 ">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className={`col-12 col-md-4 p-3 border rounded-4 ${
                plan.highlight ? "border-hoodie " : "border-lima"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="p-2">{plan.badge}</div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className=" mb-2">{plan.nombre}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {plan.descripcion}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="display-4 font-black text-foreground">
                    {plan.precio}
                  </span>
                  {plan.precio !== "0€" && (
                    <span className="text-muted-foreground">/mes</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 list-unstyled px-3">
                {plan.caracteristicas.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 ${
                        plan.highlight ? "text-lima" : "text-lima"
                      }`}
                      strokeWidth={3}
                    />
                    <span className="text-foreground/90 text-sm leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link className="text-black" href={`plan/${plan.link}`}>
                <Button className="btn w-100 btn-theorix ">{plan.cta}</Button>
              </Link>

              {/* Decoration */}
              {plan.highlight && (
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 text-secondary">
                  {/* ⚡ */}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-4">
          <p className="small">
            Garantía de devolución 14 días • Cancela cuando quieras • Pago
            seguro 🔒
          </p>
        </div>
      </div>
    </section>
  );
};
