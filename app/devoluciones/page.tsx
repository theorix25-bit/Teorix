import { Footer } from "@/components/Footer";
import React from "react";

function page() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12 text-white">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Política de devoluciones y reembolsos
          </h1>
        </header>

        <section className="space-y-6">
          <p>
            En <strong>Teorix </strong> queremos que tu experiencia de compra
            sea segura y satisfactoria. A continuación, detallamos nuestra
            política de devoluciones y reembolso aplicable a nuestros planes
            disponibles.
          </p>

          <h2 className="text-xl font-semibold">1. Derecho de desistimiento</h2>
          <p>
            De acuerdo con la normativa vigente de consumidores en España y la
            Unión Europea, dispones de un plazo de{" "}
            <strong>14 días naturales</strong> desde la compra para ejercer tu
            derecho de desistimiento sin necesidad de justificación.
          </p>

          <h2 className="text-xl font-semibold">
            2. Procedimiento de devolución
          </h2>
          <p>
            Para solicitar un reembolso, deberás seguir los siguientes pasos:
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              Contactar con nosotros por correo electrónico indicando el su
              correo de registro y motivo
            </li>
            <li>
              Te confirmaremos el procedimiento y los pasos a seguir para la
              devolución.
            </li>
            <li>
              Una vez recibido y verificado, se procederá al reembolso en un
              plazo máximo de <strong>14 días naturales</strong>.
            </li>
          </ul>
          <h2 className="text-xl font-semibold">3. Contacto</h2>
          <p>
            Si tienes dudas sobre esta política o deseas iniciar un proceso de
            devolución, puedes ponerte en contacto con nosotros:
          </p>

          <p>
            📧
            <a href="mailto:info@teorix.es" className="text-blue-600 underline">
              info@Teorix.es
            </a>
            <br />
            🌐
            <a href="https://teorix.es" className="text-blue-600 underline">
              Teorix.es
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default page;
