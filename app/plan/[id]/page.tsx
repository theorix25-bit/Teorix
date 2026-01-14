"use client";

import ButtonCheckout from "@/components/ButtonCheckout";
import { useUserStore } from "@/hooks/useUseStore";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Check,
  Shield,
  Zap,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const supabase = createClient();

function Page() {
  const { id } = useParams();
  const { authId } = useUserStore();
  const [plan, setPlan] = useState<PlanDB[]>([]);
  const [userId, setUserId] = useState<string>();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("Planes")
      .select("*")
      .eq("slug", id);

    if (error) console.log(error);
    authId && setUserId(authId);
    data && setPlan(data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="min-h-[300px] bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-14">
        {plan.map((p, i) => (
          <div key={i} className="max-w-xl mx-auto">

            {/* Volver */}
            <Link
              href="/#planes"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a planes
            </Link>

            {/* Card principal */}
            <Card className=" relative rounded-3xl border border-lima/40 bg-zinc-950 shadow-[0_0_40px_-10px_rgba(163,230,53,0.35)] overflow-hidden">
              <CardHeader className="ext-center space-y-0 bg-gradient-to-b from-lima/20 via-lima/10 to-transparent pb-0">
              <Badge className="mx-auto bg-lima text-black font-semibold">  Plan recomendado </Badge>

            <h1 className="text-3xl font-bold text-white">
              <span className="text-lima">{p.nombre}</span>
            </h1>

            <p className="text-zinc-400">
              {p.descripción}
            </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-3">

                {/* Precio */}
                <div className="text-center">
                  <span className="text-6xl font-black text-lima">
                        ${p.precio}
                  </span>
                <p className="text-sm text-zinc-400 mt-2">Pago mensual • Acceso inmediato</p>
                </div>

                {/* Beneficios */}
                <ul className="space-y-3 text-zinc-200 w-[280px] mx-auto">
                  {[
                    "Acceso completo al curso",
                    "Videos y material actualizado",
                    "Aprendé a tu ritmo",
                    "Soporte incluido",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 ">
                      <Check className="h-5 w-5 text-lima" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex justify-center">
                <ButtonCheckout userId={userId} plan={p}>
                  <div className="">
                    {p.cta}
                  </div>
                </ButtonCheckout>
                </div>

                {/* Confianza */}
                <div className="space-y-2 text-center text-sm text-zinc-400">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-lima" />
                    Garantía de satisfacción 100%
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4 text-lima" />
                    Sin permanencia • Cancela cuando quieras
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-4 w-4 text-lima" />
                    Diseñado para aprobar a la primera
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Page;
