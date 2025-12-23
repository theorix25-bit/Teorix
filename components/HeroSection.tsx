import { Eye } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Link from "next/link";
import Image from "next/image";
import teo from "@/assets/image-removebg-preview.png"

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-20 left-10 text-6xl text-lima animate-spin-slow opacity-20">
        *
      </div>
      <div className="absolute top-40 right-2 md:right-20 text-8xl text-hoodie animate-spin-slow opacity-20">
        *
      </div>
      <div className="absolute bottom-32 left-5 text-8xl md:bottom-24 md:left-1/4 md:text-9xl text-lima animate-pulse-glow opacity-30">
        *
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center mb-0">
          <div className="relative top-0">
            <img src={teo.src} alt="" className="w-24 md:w-24" />
            <div className="absolute -inset-4 rounded-full blur-xl "></div>
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
          <span className="text-hoodie font-bold">speedrun</span>. Tutor real,
          método probado y cero drama.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={"/clases"}
            className="border bg-lima border-lima rounded-xl px-2 py-3 text-black font-bold"
          >
            Ver lecciones disponibles
          </Link>
          <Link
            href={"/#modo"}
            className=" bg-hoodie/80 px-2 py-3 rounded-xl text-white font-bold"
          >
            selecciona tu modo
          </Link>
        </div>

        {/* Social proof badge */}
        <div className="mt-16 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-lima/50">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-lima to-hoodie border-2 border-black"
              ></div>
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            +12.847 aprobados este año <span className="text-lima text-xl ml-2">✓</span>
          </span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
