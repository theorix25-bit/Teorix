import { Check } from "lucide-react";
import Link from "next/link";
import { getPlansDB } from "@/lib/supabase";
export const PricingSection = async () => {
  const plans = await getPlansDB();
  {
    if (plans === undefined) return null;
  }

  return (
    <>
      <section className="py-10 px-6 relative overflow-hidden mt-3" id="modo">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lima/5 rounded-full blur-3xl"></div>

        <div className="mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black  mb-4">
              Elige tu <span className="text-lima">modo</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Todos los planes incluyen el método{" "}
              <span className="text-hoodie"> THEORIX</span>. Sin permanencia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans
              .filter((p) => p.id !== 4)
              .map((plan, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col justify-between rounded-3xl p-8 border-2 transition-all duration-300 ${
                    plan.resaltar
                      ? "border-hoodie bg-card shadow-[0_0_40px_hsl(var(--neon-red)/0.3)] md:-translate-y-4 md:scale-105"
                      : "border bg-card/50 border-lima/50 hover:border-lima"
                  }`}
                >
                  {plan.insignia && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-hoodie to-lima text-lima-foreground text-sm font-black uppercase tracking-wider shadow-lg">
                        {plan.insignia}
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-black mb-2">{plan.nombre}</h3>
                    <p className="text-sm mb-4">{plan.descripción}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black ">
                        {plan.precio}
                      </span>
                      {plan.precio !== "0€" && (
                        <span className="text-muted-foreground">/mes</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.caracteristicas.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 ${
                            plan.resaltar ? "text-hoodie" : "text-lima"
                          }`}
                          strokeWidth={3}
                        />
                        <span className="text-foreground/90 text-sm leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={
                      plan.slug == "gratuito" ? "/clases" : `/plan/${plan.slug}`
                    }
                    // variant={plan.highlight ? "speedrun" : plan.name === "Pro" ? "hero" : "outline"}
                    className={`w-full  px-3 rounded-md mx-auto block text-center py-2 ${
                      plan.resaltar
                        ? "bg-hoodie text-white"
                        : "bg-lima text-black "
                    } font-extrabold `}
                  >
                    {plan.cta} →
                  </Link>

                  {plan.resaltar && (
                    <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 text-hoodie">
                      ⚡
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Garantía de devolución 14 días • Cancela cuando quieras • Pago
              seguro 🔒
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
