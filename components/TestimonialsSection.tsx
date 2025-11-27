"use client"
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Laura M.",
    age: 19,
    result: "APTO ✅",
    text: "Aprobé a la primera sin estudiar mil páginas. El método es brutal.",
    streak: "Racha x5",
  },
  {
    name: "Carlos R.",
    age: 21,
    result: "APTO ✅",
    text: "Mi tutor me salvó. Llevaba 3 suspensos y con THEORIX aprobé directo.",
    streak: "Boss final ✓",
  },
  {
    name: "Ana S.",
    age: 18,
    result: "APTO ✅",
    text: "Estudiar con vídeos es otro nivel. Nada que ver con leer PDFs aburridos.",
    streak: "Speedrun mode",
  },
];

export const TestimonialsSection = () => {
  const [approvalRate, setApprovalRate] = useState(0);

  useEffect(() => {
    // Counter animation
    const target = 85;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setApprovalRate(target);
        clearInterval(timer);
      } else {
        setApprovalRate(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-card/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 md:left-52 text-9xl text-lima">*</div>
        <div className="absolute bottom-3 md:bottom-24 right-10 text-7xl text-hoodie">X</div>
      </div>

      <div className="mx-auto relative z-10">
        {/* Stats hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-baseline gap-3 mb-6">
            <span className="text-8xl md:text-9xl font-extrabold text-lima neon-glow">
              +{approvalRate}%
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            de alumnos aprueban a la primera
          </h2>
          <p className="text-xl text-muted-foreground">
            Y tú serás el siguiente. Sin drama. <span className="text-lima">✓</span>
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl p-8 border-2 border-lima/20 hover:border-hoodie/30 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon-glow)/0.2)] hover:-translate-y-1 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{testimonial.age} años</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-lima text-carbon text-sm font-black">
                  {testimonial.result}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 leading-relaxed mb-4 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Badge */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-xs font-bold text-hoodie uppercase tracking-wider">
                  {testimonial.streak}
                </span>
              </div>

              {/* Hover decoration */}
              <div className="absolute top-4 right-4 text-6xl opacity-0 group-hover:opacity-10 transition-opacity text-lima">
                ✓
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted/50 border border-border">
            <span className="text-4xl">🎯</span>
            <div className="text-left">
              <p className="text-sm font-bold text-lima uppercase tracking-wider">Achievement Unlocked</p>
              <p className="text-foreground font-semibold">Tu APTO está más cerca de lo que piensas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};