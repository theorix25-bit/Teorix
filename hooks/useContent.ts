import usuarios from "@/components/admin/views/usuarios";
import { getContentClases } from "@/lib/supabase";
import { create } from "zustand";

interface ContentState {
  clases: Clases_b[];
  temas: [];
  subTemas: [];

  // setClases: (data: Clases_b[]) => void;
  // setTemas: (data: Temas[]) => void;
  // setUsuario: () => void;
  // setProgreso: (id:number) => void;
  // setInit: ()=> void;

  setClases: () => void;
}
export const useContent = create<ContentState>((set) => ({
  clases: [],
  temas: [],
  subTemas: [],

  setClases: async () => {
    const res = await getContentClases();
    set({ clases: res });
  },
}));
