"use client";

import { useEffect, useState } from "react";

export type CookieConsent = "accepted" | "rejected" | null;

const STORAGE_KEY = "cookie_consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CookieConsent;
    setConsent(stored);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const rejectCookies = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  };

  return { consent, acceptCookies, rejectCookies };
}
