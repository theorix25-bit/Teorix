"use client"
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
interface PageProps {
  plan : PlanDetails
}
export default function Pricing ({ plan }:PageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
        <div
        className={`relative flex flex-col justify-between rounded-3xl p-8 border-2 transition-all duration-300 ${
          plan.resaltar
            ? "border-hoodie bg-card shadow-[0_0_40px_hsl(var(--neon-red)/0.3)] scale-105 "
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
        {plan.resaltar && 
        <div className="flex items-baseline justify-center gap-1">
          <p className=' text-2xl'> <span className='text-hoodie line-through'> 15</span> </p> 
          <span className="text-muted-foreground">/mes</span>
        </div>}
          
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-black ">
            {plan.precio}€
          </span>
          {plan.precio !== "0€" && (
            <span className="text-muted-foreground">/mes</span>
          )}
        </div>
      </div>

      {/* Contenedor con altura máxima dinámica */}
      <div className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-52'}`}>
        <ul className="space-y-4 mb-8 ">
              {plan.caracteristicas.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check
                    className={`w-5 h-5 flex-shrink-0 mt-1 ${
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
         {/* Degradado para indicar que hay más contenido (solo si no está expandido) */}
        
      </div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-bold text-lima/90 hover:underline mb-4"
      >
        {isExpanded ? 'Ver menos' : 'Leer más'}
      </button>

      <Link
        href={
          plan.slug == "gratuito" ? "/formulas" : `/plan/${plan.slug}`
        }
        className={`w-full  px-3 rounded-md mx-auto block text-center py-2 capitalize ${
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
  );
};