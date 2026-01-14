"use client";

import { useEffect, useState } from "react";

export type CookieConsent = "accepted" | "rejected" | null;

const STORAGE_KEY = "cookie_consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CookieConsent;
    setConsent(stored);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setConsent(e.newValue as CookieConsent);
      }
    };

    const handleCustom = () => {
      const s = localStorage.getItem(STORAGE_KEY) as CookieConsent;
      setConsent(s);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("cookie_consent_changed", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cookie_consent_changed", handleCustom);
    };
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    window.dispatchEvent(new Event("cookie_consent_changed"));
  };

  const rejectCookies = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
    window.dispatchEvent(new Event("cookie_consent_changed"));
  };

  return { consent, acceptCookies, rejectCookies };
}
