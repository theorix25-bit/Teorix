"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "@/hooks/useUseStore";

export function UseProviders({ children }: { children: ReactNode }) {
  const fetchUser = useUserStore((s) => s.fetchUser);
  const fetchPlan = useUserStore((s) => s.fetchPlan);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      await fetchPlan();
      setReady(true);
    };

    init();
  }, [fetchUser, fetchPlan]);

  if (!ready) {
    return null; // o <LoadingGlobal />
  }

  return <>{children}</>;
}
