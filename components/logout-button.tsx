"use client";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      <button
        className="nav-link btn-outline-theorix rounded "
        onClick={logout}
      >
        Cerrar Sesión
      </button>
      <div className="w-10 h-10 bg-lima rounded-full flex justify-center items-center">
        M
      </div>
    </>
  );
}
