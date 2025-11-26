// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";
// import Stripe from "stripe";
// import ButtonCheckout from "./ButtonCheckout";
// import Link from "next/link";
// import { getPlansDB } from "@/lib/supabase";
// export const PricingSection = async () => {
//   const plans = await getPlansDB();
//   {
//     if (plans === undefined) return null;
//   }
//   return (
//     <section className=" container-fluid " id="planes">

//       <div className="mx-auto relative z-10">
//         <div className="text-center mb-2">
//           <h2 className="display-2 mb-4">
//             Elige tu <span className="text-lima">modo</span>
//           </h2>
//           <p className="mx-auto">
//             Todos los planes incluyen el método THEORIX. Sin permanencia.
//           </p>
//         </div>


//         <div className="row g-3 px-5 ">
//           {plans?.map((plan, index) => (
//             <div
//               key={index}
//               className={`col-12 col-md-4 p-3 border rounded-4 ${
//                 plan.highlight ? "border-hoodie " : "border-lima"
//               }`}
//             >
//               {plan.badge && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2">
//                   <div className="p-2">{plan.badge}</div>
//                 </div>
//               )}

//               <div className="text-center mb-8">
//                 <h3 className=" mb-2">{plan.nombre}</h3>
//                 <p className="text-sm text-muted-foreground mb-2">
//                   {plan.descripcion}
//                 </p>
//                 <div className="flex items-baseline justify-center gap-1">
//                   <span className="display-4 font-black text-foreground">
//                     {plan.precio}
//                   </span>
//                   {plan.precio !== "0€" && (
//                     <span className="text-muted-foreground">/mes</span>
//                   )}
//                 </div>
//               </div>

//               <ul className="space-y-4 mb-8 list-unstyled px-3">
//                 {plan.caracteristicas.map((feature: string, idx: number) => (
//                   <li key={idx} className="flex items-start gap-3">
//                     <Check
//                       className={`w-5 h-5 mt-0.5 ${
//                         plan.highlight ? "text-lima" : "text-lima"
//                       }`}
//                       strokeWidth={3}
//                     />
//                     <span className="text-foreground/90 text-sm leading-tight">
//                       {feature}
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               <Link className="text-black" href={`plan/${plan.link}`}>
//                 <Button className="btn w-100 btn-theorix ">{plan.cta}</Button>
//               </Link>

//               {plan.highlight && (
//                 <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 text-secondary">
//                   {/* ⚡ */}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-4">
//           <p className="small">
//             Garantía de devolución 14 días • Cancela cuando quieras • Pago
//             seguro 🔒
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "free",
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
    id: "speedrun",
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
    id: "pro",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            Elige tu <span className="text-primary">modo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Todos los planes incluyen el método THEORIX. Sin permanencia.
          </p>
        </div>

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
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-primary text-primary-foreground text-sm font-black uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}

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

              <Link
              href={"/"}
                // variant={plan.highlight ? "speedrun" : plan.name === "Pro" ? "hero" : "outline"}
                className="w-full border px-3 rounded-md mx-auto block text-center py-2"
              >
                {plan.cta} →
              </Link>

              {plan.highlight && (
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 text-secondary">
                  ⚡
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Garantía de devolución 14 días • Cancela cuando quieras • Pago seguro 🔒
          </p>
        </div>
      </div>
    </section>
  );
};