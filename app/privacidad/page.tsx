import { Footer } from "@/components/Footer";
import React from "react";

function page() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        <h2 className="mb-2 text-xl">INTRODUCCIÓN</h2>
        <p className="mb-4">
          En Teorix , estamos muy pendientes de las necesidades de
          nuestros usuarios de Internet y somos conscientes de la importancia de
          la rigurosa privacidad de la información personal que nos confiáis.
          Por eso, hemos creado esta declaración de privacidad, para que sepas
          cómo tratamos los datos personales que obtenemos de nuestros
          visitantes y alumnos.
        </p>
        <p className="mb-4">
          Como usuario, aceptas estas condiciones por el simple hecho de leer,
          visualizar o navegar en nuestra web. Si no las aceptas, por favor,
          abandona el sitio sin hacer uso de él ni de su contenido, y sin
          acceder a las páginas enlazadas.
        </p>
        <h2 className="mb-2 text-xl">RESPONSABLE DEL TRATAMIENTO DE DATOS</h2>
        <p className="mb-4">
          El titular del sitio y responsable del tratamiento de datos es
          Teorix.es , para contactar puedes utilizar la dirección de
          correo electrónico info@Teorix.com, el teléfono _________ o
          el correo postal a ___________ , código postal _______________.
        </p>
        <h2 className="mb-2 text-xl">FINALIDAD DEL TRATAMIENTO DE DATOS</h2>
        <p className="mb-4">
          En nuestra web, hay apartados específicos donde puedes dejar tus datos
          para recibir información sobre nuestras novedades, cursos o programas.
          Te aseguramos que la información que nos facilita se gestionará de
          forma totalmente confidencial.
        </p>
        
        <p className="mb-4">
          Los datos se almacenarán mientras exista una previsión de su uso para
          el fin por el que fueron recogidos. No realizamos tomas de decisiones
          automatizadas con tus datos.
        </p>
        <p className="mb-4">
          La web puede utilizar cookies, puedes consultarlo en nuestra política
          de cookies.
        </p>
        <h2 className="mb-2 text-xl">LEGITIMACIÓN DEL TRATAMIENTO DE DATOS</h2>
        <p className="mb-4">
          El uso de tus datos personales se basa en el consentimiento que nos
          das al rellenar los formularios para un uso específico. Tus datos son
          necesarios para los usos concretos por los que se te solicitan; si no
          nos los facilita, no podremos ofrecerte esos servicios. El uso de la
          analítica web se basa en nuestro interés legítimo para mejorar la
          calidad de nuestros servicios en línea.
        </p>
        <h2 className="mb-2 text-xl">TRANSFERENCIAS Y CESIONES DE DATOS</h2>
        <p className="mb-4">
          Nos comprometemos firmemente a que los datos que proporcionan a
          Teorix  no serán vendidos ni cedidos a terceras personas bajo
          ningún concepto o circunstancia, salvo consentimiento expreso u
          obligación legal.
        </p>
        <p className="mb-4">
          Nuestro sitio web contiene enlaces a sitios web de terceros.
          Teorix  no se hace responsable de las políticas y prácticas de
          privacidad de estos otros sitios.
        </p>
        <h2 className="mb-2 text-xl">DERECHOS DE LOS INTERESADOS</h2>
        <p className="mb-4">
          Tienes derecho a acceder a la información sobre ti que está en
          nuestras bases de datos, rectificarla si hubiera algún error,
          suprimirla, limitar su tratamiento, oponerte a él y retirar tu
          consentimiento si así lo deseas. Para ejercer estos derechos,
          simplemente escríbenos un correo a info@Teorix.com, y con gusto
          te atenderemos cualquier consulta, comentario o aclaración.
        </p>

        <p className="mb-4">
          Para más información, puedes consultar el sitio de referencia en
          España, la Agencia de Protección de Datos, donde tienes derecho a
          reclamar.
        </p>
      </main>
      <Footer />
    </>
  );
}

export default page;
