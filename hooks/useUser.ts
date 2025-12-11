import { getUserAuthId, getUserDBForId } from "@/lib/supabase";
import { create } from "zustand";

interface typeUser {
  user: User[];
  authId: string

  setUser: () => void
}
export const useUser = create<typeUser>((set) => ({
  user: [],
  authId: "",

  setUser: async () => {
    const id = await getUserAuthId()
    set(({authId:id}))
    const user = await getUserDBForId(id)
    set(({user:user}))
  },
}));
