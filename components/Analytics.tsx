"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function Analytics() {
  const { consent } = useCookieConsent();

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
