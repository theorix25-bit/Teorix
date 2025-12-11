import { getUserAuthId, getUserDBForId, getUserProgress } from "@/lib/supabase";
import { create } from "zustand";

interface typeProgress {
  progress: Progreso[];

  setProgreso: () => void;
}

export const useProgress = create<typeProgress>((set) => ({
  progress: [],

  setProgreso: async () => {
    const id = await getUserAuthId()
    const user = await getUserDBForId(id)
    const res = await getUserProgress(user[0].id)
    console.log(res)
    set({progress: res})
  }
}));
