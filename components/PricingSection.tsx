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
    badge: null,
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
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            Elige tu <span className="text-primary">modo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todos los planes incluyen el método THEORIX. Sin permanencia.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${
                plan.highlight
                  ? "border-secondary bg-card shadow-[0_0_40px_hsl(var(--neon-red)/0.3)] md:-translate-y-4 md:scale-105"
                  : "border-border bg-card/50 hover:border-primary/30"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-primary text-primary-foreground text-sm font-black uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "0€" && (
                    <span className="text-muted-foreground">/mes</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 ${
                      plan.highlight ? "text-secondary" : "text-primary"
                    }`} strokeWidth={3} />
                    <span className="text-foreground/90 text-sm leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlight ? "speedrun" : plan.name === "Pro" ? "hero" : "outline"}
                size="lg"
                className="w-full"
              >
                {plan.cta} →
              </Button>

              {/* Decoration */}
              {plan.highlight && (
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 text-secondary">
                  ⚡
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Garantía de devolución 14 días • Cancela cuando quieras • Pago seguro 🔒
          </p>
        </div>
      </div>
    </section>
  );
};