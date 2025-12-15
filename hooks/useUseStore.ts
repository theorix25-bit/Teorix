import { getPlanUser, getUserAuthId, getUserDBForId } from "@/lib/supabase";
import { create } from "zustand";
interface UserStore {
  authId: string | null;
  user: User[] | null;
  plan: Subscription[] | null;
  loading: boolean;
  fetchAuthId: () => Promise<void>;
  fetchUser: () => Promise<void>;
  fetchPlan: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  authId: null,
  user: null,
  loading: true,
  plan: null,

  fetchAuthId: async () => {
    const { authId } = get();
    if (authId) return;

    try {
      const auth = await getUserAuthId();
      if (!auth) {
        set({ authId: null });
        return;
      }
      set({ authId: auth });
    } catch (error) {
      console.error("Error fetching auth ID", error);
    }
  },

  fetchUser: async () => {
    set({ loading: true });
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
      const user = await getUserDBForId(id);
      set({ user: user ?? null, loading: false });
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

    const id = get().user?.[0].id;
    if (!id) return;

    try {
      const planResponse = await getPlanUser(id);

      if (!planResponse) return console.error("Plan no definido");
      set({ plan: planResponse });
    } catch (error) {
      console.error("Error en la búsqueda del plan", error);
    }
  },
}));
