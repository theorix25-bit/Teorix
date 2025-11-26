import { Eye } from "lucide-react";
// import heroBg from "@/assets/hero-bg.jpg";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        // style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background"></div>
      </div>

      <div className=" text-lima absolute top-20 left-10 text-6xl text-primary animate-spin-slow opacity-20">
        *
      </div>
      <div className=" text-white absolute top-40 right-20 text-8xl text-secondary animate-spin-slow opacity-20">
        *
      </div>
      <div className=" text-lima absolute bottom-32 left-1/4 text-5xl text-primary animate-pulse-glow opacity-30">
        X
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative top-6">
            <Eye
              className="w-24 h-24 text-lima animate-blink drop-shadow-[0_0_20px_hsl(var(--neon-glow))]"
              strokeWidth={2}
            />
            <div className="absolute -inset-4 bg-lima/20 rounded-full blur-xl animate-pulse-glow"></div>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          <span className="block text-foreground text-white">
            Estudia menos.
          </span>
          <span className="block text-lima neon-glow">Aprueba más.</span>
        </h1>

        <p className="text-xl md:text-2xl text-white text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
          El teórico en modo{" "}
          <span className="text-secondary font-bold">speedrun</span>. Tutor
          real, método probado y cero drama.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={"/clases"} className="border border-lima rounded-xl px-2 py-3 text-white">
            Ver lecciones disponibles
            <span className="ml-2 group-hover:animate-pulse">🔥</span>
          </Link>
          <Link
            href={"/clases"}
            className=" bg-lima px-2 py-3 rounded-xl text-black"
          >
            Quiero mi cheatcode
            
            <span className="ml-2 group-hover:animate-bounce">🚗</span>
          </Link>
        </div>

        {/* Social proof badge */}
        <div className="mt-16 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"
              ></div>
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            +12.847 aprobados este año
          </span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
