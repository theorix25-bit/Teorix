"use client"
import { useUserStore } from "@/hooks/useUseStore";
import { ReactNode, useEffect } from "react";

export function UseProviders({ children }: { children: ReactNode }) {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const fetchPlan = useUserStore((state) => state.fetchPlan);
  
  useEffect(() => {
    fetchUser();
    fetchPlan();
  }, [fetchUser]);
  return <>{children}</>;
}
