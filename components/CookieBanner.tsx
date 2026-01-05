"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieBanner() {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-zinc-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between  gap-4">
        <p className="text-sm text-center md:text-start">
          Utilizamos cookies propias y de terceros para mejorar tu experiencia.
          Puedes aceptar o rechazar las cookies no esenciales.
          <a
            href="/politicas-de-cookies"
            className="underline text-lima ml-1"
          >
            Más información
          </a>
        </p>

        <div className="flex gap-3 mx-auto ">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-sm"
          >
            Rechazar
          </button>

          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded bg-lima text-black hover:bg-lima/80 text-sm font-medium"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
