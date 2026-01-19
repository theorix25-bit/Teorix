"use client";

import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Plan {
  id: number;
  nombre: string;
  orden: number;
  caracteristicas?: string[];
  slug:string
}

interface PlanesComparacionProps {
  planActual: Plan | null | undefined;
  planSuperior: Plan | null | undefined;
}

export const PlanesComparacion: FC<PlanesComparacionProps> = ({
  planActual,
  planSuperior,
}) => {
  if (!planActual || !planSuperior) return <div className="mt-10">
    <h2 className="text-3xl font-semibold mb-6 text-foreground">
        Tu plan actual
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PLAN ACTUAL */}
        <Card className="border-l-4 border-primary/60">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{planActual?.nombre}</span>
              <Badge variant="outline">Plan actual</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Este es el plan que estás usando en este momento.
            </p>

            <Separator />

            <ul className="space-y-2">
              {planActual?.caracteristicas?.map((b: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />{b}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
  </div>;

  const beneficiosActual = planActual.caracteristicas ?? [];
  const beneficiosSuperior = planSuperior.caracteristicas ?? [];

  return  (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-foreground">
        Tu plan y cómo mejorar tu aprendizaje
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PLAN ACTUAL */}
        <Card className="border-l-4 border-primary/60">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{planActual.nombre}</span>
              <Badge variant="outline">Plan actual</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Este es el plan que estás usando en este momento.
            </p>

            <Separator />

            <ul className="space-y-2">
              {beneficiosActual.map((b: string, index: number) => (
                <li key={index} className="flex items-start gap-2"> 
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" /> 
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* PLAN SUPERIOR */}
        <Card className="border-l-4 border-lima">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{planSuperior.nombre}</span>
              <Badge className="bg-lima text-black">Recomendado</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Sube al siguiente nivel y desbloquea más contenido exclusivo.
            </p>

            <Separator />

            <ul className="space-y-2">
              {beneficiosActual.map((b: string, index: number) => (
                <li key={index} className="flex items-start gap-2"> 
                  <Check className="w-4 h-4 text-lima flex-shrink-0 mt-1" /> 
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            
              <Link href={`/plan/${planSuperior.slug}`} className="w-full bg-lima text-black hover:bg-lima/90 flex items-center justify-center gap-2 px-2 py-1 rounded-lg" >
              Subir de plan
              <ArrowUpRight className="w-5 h-5" />
              </Link>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
};
