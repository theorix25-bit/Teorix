"use client";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <button className="nav-link" onClick={logout}>
      Cerrar Sesión
    </button>
  );
}
