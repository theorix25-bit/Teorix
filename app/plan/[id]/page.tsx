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
  console.log(authId);
  const fetchData = async () => {
    let { data: plan } = await supabase.from("suscripciones").select("*").eq("link", id);
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
                  {/* Botón Volver */}
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

                      {/* Tagline */}
                      <p className="lead text-white mb-4">{p.descripción}</p>

                      {/* Precio */}
                      <div className="flex items-baseline justify-center gap-2 mb-4">
                        <span className="text-5xl font-black text-lima">
                          {p.precio} $
                        </span>
                        {/* {plan.period && (
                        <span className="h4 text-secondary">{plan.period}</span>
                      )} */}
                      </div>

                      {/* CTA Principal */}
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

              {/* <section className="py-5 px-3 ">
                <div className="container max-w-lg text-center">
                  <p className="fs-5 text-white ">{p.descripción}</p>
                </div>
              </section> */}

              {/* <section className="py-5 py-md-5 px-3">
                <div className="">
                  <h2 className="text-3xl font-bold text-center mb-5 text-white">
                    Todo lo que <span className="text-lima">incluye</span>
                  </h2>

                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="border  shadow-sm  p-4 p-md-5">
                        <ul className="list-unstyled mb-0 space-y-3">
                          {p.caracteristicas.map((feature, idx) => (
                            <li
                              key={idx}
                              className="d-flex align-items-start gap-3"
                            >
                              <Check
                                className="text-success mt-1 flex-shrink-0"
                                size={20}
                              />
                              <span className="fs-5 text-white">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}

              {/* <section className="py-5 py-md-5 px-3 border-top">
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <h2 className="display-6 fw-bold mb-3 text-white">
                        ¿Listo para <span className="text-lima">aprobar</span>?
                      </h2>
                      <p className="lead text-secondary mb-4 text-white">
                        Únete a miles de estudiantes que ya aprobaron con
                        THEORIX
                      </p>
                      <button
                      className={`btn btn-primary btn-lg fw-bold px-5 py-3 shadow-lg`}
                      onClick={() => console.log("Checkout Final:", p.nombre)}
                    >
                      {p.cta}
                    </button>
                      <ButtonCheckout userId={userId} plan={p}>
                        {" "}
                        Comprar
                      </ButtonCheckout>
                      <p className="small text-secondary mt-3 text-white">
                        Garantía de satisfacción 100% • Sin permanencia
                      </p>
                    </div>
                  </div>
                </div>
              </section> */}
            </div>
          ))}
        </ul>
      </div>
      ;
    </>
  );
}

export default page;

{
  /* Sección Hero: Detalles del Plan */
}

{
  /* Descripción */
}
{
  /* <section className="py-5 px-3 bg-white border-top border-bottom">
  <div className="container max-w-lg text-center">
    <p className="fs-5 text-dark">{plan.description}</p>
  </div>
</section>; */
}

{
  /* Features (Lista de Inclusiones) */
}
{
  /* <section className="py-5 py-md-5 px-3">
  <div className="container">
    <h2 className="display-6 fw-bold text-center mb-5">
      Todo lo que <span className="text-primary">incluye</span>
    </h2>

    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
          <ul className="list-unstyled mb-0 space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="d-flex align-items-start gap-3">
                <Check className="text-success mt-1 flex-shrink-0" size={20} />
                <span className="fs-5 text-dark">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>; */
}

{
  /* <section className="py-5 py-md-5 px-3 bg-black border-top">
  <div className="container">
    <h2 className="display-6 fw-bold text-center mb-5">
      ¿Por qué elegir <span className="text-primary">{plan.name}</span>?
    </h2>

    <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
      {plan.benefits.map((benefit, idx) => (
        <div key={idx} className="col">
          <div className="card h-100 border-0 rounded-4 p-4 shadow-sm">
            <div className="p-3 bg-primary bg-opacity-10 rounded-3 d-inline-flex align-items-center justify-content-center mb-3">
              <Icon className="text-primary" size={24} iconNode={[]} />
            </div>
            <h3 className="h5 fw-bold mt-2 mb-2">{benefit.title}</h3>
            <p className="text-secondary mb-0">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>; */
}

{
  /* <section className="py-5 py-md-5 px-3">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-4 p-4 p-md-5 text-center shadow-lg">
          <div className="d-flex justify-content-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-warning fill-warning" />
            ))}
          </div>

          <blockquote className="blockquote fs-4 fw-bold text-dark mb-4 fst-italic">
            "{plan.testimonial.text}"
          </blockquote>

          <div className="d-flex flex-column align-items-center">
            <p className="fw-bold mb-0">{plan.testimonial.author}</p>
            <p className="text-primary fw-semibold mb-0">
              {plan.testimonial.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>; */
}

{
  /* <section className="py-5 py-md-5 px-3 bg-white border-top">
  <div className="container text-center">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h2 className="display-6 fw-bold mb-3">
          ¿Listo para <span className="text-primary">aprobar</span>?
        </h2>
        <p className="lead text-secondary mb-4">
          Únete a miles de estudiantes que ya aprobaron con THEORIX
        </p>
        <button
          className={`btn ${ctaClass} btn-lg fw-bold px-5 py-3 shadow-lg`}
          onClick={() => console.log("Checkout Final:", plan.name)}
        >
          {plan.cta}
        </button>
        <p className="small text-secondary mt-3">
          Garantía de satisfacción 100% • Sin permanencia
        </p>
      </div>
    </div>
  </div>
</section>; */
}
