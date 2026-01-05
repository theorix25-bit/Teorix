import { createClient } from "@/lib/supabase/client";
import { create } from "zustand";
interface UserStore {
  authId: string | null | undefined;
  user: User[] | null;
  plan: Subscription[] | null;
  loading: boolean;
  fetchAuthId: () => Promise<void>;
  fetchUser: () => Promise<void>;
  fetchPlan: () => Promise<void>;
}

const supabase = createClient();

export const useUserStore = create<UserStore>((set, get) => ({
  authId: null,
  user: null,
  loading: true,
  plan: null,

  fetchAuthId: async () => {
    const { authId } = get();

    // Si ya fue resuelto (null o string), no volver a pedirlo
    if (authId !== null) return;

    try {
      const { data } = await supabase.auth.getClaims();
      const auth = data?.claims.sub;
      set({
        authId: auth,
      });
    } catch (error) {
      console.error("Error fetching auth ID", error);
      set({ authId: null });
    }
  },

  fetchUser: async () => {
    // set({ loading: true });
    const { authId, fetchAuthId } = get();
    if (!authId) {
      await fetchAuthId();
    }
    const id = get().authId;
    if (!id) {
      set({ user: null, loading: false });
      return;
    }

    try {
      let { data: user } = await supabase
        .from("Usuarios")
        .select("*")
        .eq("auth_id", id);
      set({ user: user, loading: false });
    } catch (error) {
      console.error("Error fetching user", error);
      set({ user: null, loading: false });
    }
  },

  fetchPlan: async () => {
    const { user, fetchUser } = get();
    if (!user) {
      await fetchUser();
    }
    if (user?.length == 0) {
      return set({ user: [], loading: false });
    }
    const id = get().user?.[0].id;
    if (!id) return;

    try {
      const { data: planResponse } = await supabase
        .from("Planes_usuarios")
        .select("*")
        .eq("usuario_id", id);
      if (!planResponse) return console.error("Plan no definido");
      set({ plan: planResponse });
    } catch (error) {
      console.error("Error en la búsqueda del plan", error);
    }
  },
}));
