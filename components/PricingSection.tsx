import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0€",
    description: "Para probar el método",
    color: "muted",
    features: [
      "10 preguntas gratis",
      "1 microlección",
      "Acceso al método",
      "Sin tarjeta de crédito",
    ],
    cta: "Empezar gratis",
    badge: "Inicial",
  },
  {
    name: "Speedrun",
    price: "29€",
    description: "El más popular",
    color: "secondary",
    features: [
      "Acceso completo ilimitado",
      "Tutor personal asignado",
      "Todas las microlecciones",
      "Tests adaptativos",
      "Garantía de aprobado",
      "Soporte prioritario",
    ],
    cta: "Modo speedrun ON",
    badge: "🔥 Popular",
    highlight: true,
  },
  {
    name: "Pro",
    price: "49€",
    description: "Máximo acompañamiento",
    color: "primary",
    features: [
      "Todo de Speedrun +",
      "Sesiones 1-a-1 con tutor",
      "Plan personalizado diario",
      "Simulacros certificados",
      "Acceso de por vida",
      "Grupo privado Discord",
    ],
    cta: "Quiero Pro",
    badge: "⚡ Máximo",
  },
];

export const PricingSection = () => {
  return (
    <section className=" container ">
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
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`col-12 col-md-4 p-3 border rounded-4 ${
                plan.highlight
                  ? "border-hoodie "
                  : "border-lima"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="p-2">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className=" mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="display-4 font-black text-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "0€" && (
                    <span className="text-muted-foreground">/mes</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 list-unstyled px-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 ${
                      plan.highlight ? "text-lima" : "text-lima"
                    }`} strokeWidth={3} />
                    <span className="text-foreground/90 text-sm leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                
                className="btn w-100 btn-theorix text-black"
              >
                {plan.cta} →
              </Button>

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
            Garantía de devolución 14 días • Cancela cuando quieras • Pago seguro 🔒
          </p>
        </div>
      </div>
    </section>
  );
};