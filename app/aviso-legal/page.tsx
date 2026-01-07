import { Footer } from "@/components/Footer";
import React from "react";

function page() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6">Aviso Legal</h1>
        <p className="mb-4">
          Conformidad con lo dispuesto en la Ley Orgánica 15/1999, de Protección
          de Datos, Teorix, responsable los datos, informa que los datos
          personales facilitados a través de los formularios de esta web o
          mediante mensajes de correo electrónico, serán incorporados en un
          fichero de clientes y serán tratados de manera automatizada con la
          finalidad de recogida y tratamiento de datos personales.
        </p>
        <p className="mb-4">
          Mediante el envío de los formularios existentes en esta web o
          suscripción a la lista de mailing o de e-news, el remitente da su
          consentimiento expreso para ser incluido en el mencionado fichero e
          igualmente presta su consentimiento para que dichos datos puedan ser
          cedidos a empresas del Grupo u otras relacionadas comercialmente con
          este. El objeto de suministrarle la información comercial solicitada
          en los formularios o suscripciones.
        </p>
        <p className="mb-4">
          La finalidad del fichero es servir como soporte de información a la
          gestión fiscal, administrativa comercial y contable de la empresa.
        </p>
        <p className="mb-4">
          Si lo desea, puede dirigirse a Teorix, domiciliada en Av. movera, 290. Zaragoza o enviando un mail con la palabra “BAJA” a la
          dirección marketing@teorix.es, con el fin de ejercer los derechos
          de acceso, rectificación, limitación, cancelación y oposición.
        </p>
      </main>
      <Footer />
    </>

  );
}

export default page;
