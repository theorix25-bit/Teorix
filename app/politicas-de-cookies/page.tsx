import { Footer } from "@/components/Footer";

function page() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12n text-white">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Política de Cookies</h1>
        </header>

        <section className="space-y-6">
          <p>
            Esta política de cookies se aplica a los ciudadanos y residentes
            legales permanentes del Espacio Económico Europeo (EEE) y Suiza.
          </p>

          <h2 className="text-xl font-semibold">1. Introducción</h2>
          <p>
            Nuestra web,
            <a href="https://teorix.es" className="text-lima underline">
              https://teorix.es
            </a>
            , utiliza cookies y tecnologías similares (en adelante, «cookies»).
            Algunas cookies son colocadas por terceros con los que colaboramos.
          </p>

          <h2 className="text-xl font-semibold">2. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos que se almacenan en tu dispositivo
            cuando visitas una web. Permiten recordar información sobre tu
            visita y mejorar la experiencia del usuario.
          </p>

          <h2 className="text-xl font-semibold">3. ¿Qué son los scripts?</h2>
          <p>
            Un script es un fragmento de código que permite que nuestra web
            funcione correctamente y de forma interactiva.
          </p>

          <h2 className="text-xl font-semibold">4. ¿Qué es una baliza web?</h2>
          <p>
            Una baliza web o píxel es un elemento invisible que permite analizar
            el tráfico y uso del sitio web.
          </p>

          <h2 className="text-xl font-semibold">5. Tipos de cookies</h2>

          <h3 className="font-semibold mt-4">
            5.1 Cookies técnicas o funcionales
          </h3>
          <p>
            Son necesarias para el correcto funcionamiento de la web y no
            requieren consentimiento.
          </p>

          <h3 className="font-semibold mt-4">5.2 Cookies de estadísticas</h3>
          <p>
            Nos ayudan a analizar el uso de la web para mejorarla. Estas cookies
            requieren consentimiento.
          </p>

          <h3 className="font-semibold mt-4">
            5.3 Cookies de marketing o seguimiento
          </h3>
          <p>
            Se utilizan para mostrar publicidad personalizada y hacer
            seguimiento del usuario.
          </p>

          <h3 className="font-semibold mt-4">5.4 Redes sociales</h3>
          <p>
            La web puede incluir contenido incrustado de redes sociales como
            Instagram o Facebook, que pueden instalar sus propias cookies.
          </p>

          <h2 className="text-xl font-semibold">6. Cookies utilizadas</h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Google Analytics</strong>: estadísticas de uso
            </li>

            <li>
              <strong>GDPR Cookie Consent</strong>: gestión del consentimiento
            </li>

            <li>
              <strong>Redes sociales</strong>: Facebook e Instagram
            </li>
          </ul>

          <h2 className="text-xl font-semibold">7. Consentimiento</h2>
          <p>
            Al visitar la web por primera vez, se mostrará un banner de cookies.
            Puedes aceptar, rechazar o configurar tus preferencias.
          </p>

          <h3 className="font-semibold mt-4">7.1 Gestión del consentimiento</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Cookies técnicas: siempre activas</li>
            <li>Cookies estadísticas: opcionales</li>
            <li>Cookies de marketing: opcionales</li>
          </ul>

          <h2 className="text-xl font-semibold">
            8. Activación, desactivación y eliminación
          </h2>
          <p>
            Puedes eliminar o bloquear cookies desde la configuración de tu
            navegador. Ten en cuenta que la web puede no funcionar correctamente
            si desactivas todas las cookies.
          </p>

          <h2 className="text-xl font-semibold">9. Derechos del usuario</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión,
            oposición, portabilidad y limitación del tratamiento de datos.
          </p>

          <h2 className="text-xl font-semibold">10. Datos de contacto</h2>
          <p>
            <strong>Autoescuela S1</strong>
            <br />
            Calle Marqués de la Cadena 11, Zaragoza, España
            <br />
            Web:{" "}
            <a href="https://Teorix.es" className="text-lima underline">
              https://Teorix.es
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:info@autoescuelas1.com"
              className="text-lima underline"
            >
              marketing@teorix.es
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default page;
