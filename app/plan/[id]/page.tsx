"use client";
import ButtonCheckout from "@/components/ButtonCheckout";
import { useUserStore } from "@/hooks/useUseStore";
import { getPlanDBForId } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Check,
  Clock,
  Icon,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClient();

function page() {
  const { id } = useParams();
  const { authId } = useUserStore();
  const [plan, setPlan] = useState<PlanDB[]>([]);
  const [userId, setUserId] = useState<string>();

  const fetchData = async () => {
    let { data: plan, error } = await supabase
      .from("Planes")
      .select("*")
      .eq("slug", id);
    if (error) console.log(error);
    authId && setUserId(authId);
    plan && setPlan(plan);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div className="">
        <ul className="">
          {plan.map((p, i) => (
            <div className="" key={i}>
              <section className="position-relative py-5 py-md-5 overflow-hidden flex-grow-1 text-white">
                <div className="container position-relative z-1">
                  <Link
                    href="/#planes"
                    className="mt-4 text-white flex items-center mb-4"
                  >
                    <ArrowLeft size={16} className="me-2" />
                    <p>Volver a planes</p>
                  </Link>

                  <div className="flex justify-center w-fit h-fit mx-auto">
                    <div className=" text-center border rounded-lg p-6 border-lima ">
                      <h1 className="text-3xl font-bold mb-3 text-white">
                        Plan <span className="text-lima">{p.nombre}</span>
                      </h1>

                      <p className="lead text-white mb-4">{p.descripción}</p>

                      <div className="flex items-baseline justify-center gap-2 mb-4">
                        <span className="text-5xl font-black text-lima">
                          {p.precio} $
                        </span>
                      </div>

                      <ButtonCheckout userId={userId} plan={p}>
                        {" "}
                        {p.cta}
                      </ButtonCheckout>
                      <h2 className="display-6 fw-bold mb-3 mt-3 text-white">
                        ¿Listo para <span className="text-lima">aprobar</span>?
                      </h2>
                      <p className="text-sm text-white mt-3">
                        Sin permanencia • Cancela cuando quieras
                      </p>
                      <p className="small text-secondary mt-3 text-white">
                        Garantía de satisfacción 100% • Sin permanencia
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </ul>
      </div>
      
    </>
  );
}

export default page;
