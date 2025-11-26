import { Video, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Video,
    title: "Microlecciones + Vídeos reales",
    description: "Aprende con contenido directo y visual. Nada de teoría muerta. Solo lo que necesitas para aprobar.",
    badge: "Rápido",
  },
  {
    number: "02",
    icon: Target,
    title: "Seguimiento personalizado",
    description: "Tu tutor real te acompaña. Detecta tus errores, ajusta tu plan y acelera tu progreso.",
    badge: "Personal",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Aprobado garantizado",
    description: "Método probado que funciona. Miles de aprobados que empezaron igual que tú.",
    badge: "APTO ✓",
  },
];

export const MethodSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Método THEORIX</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tres pasos simples para tu <span className="text-primary font-bold">APTO</span>
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Step number */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl font-black text-primary-foreground shadow-lg">
                {step.number}
              </div>

              {/* Badge */}
              <div className="flex justify-end mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  {step.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-6 w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <step.icon className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Hover effect decoration */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="group">
            Ver cómo funciona en detalle
            <span className="ml-2 group-hover:translate-x-1 transition-transform">🔍</span>
          </Button>
        </div>
      </div>
    </section>
  );
};