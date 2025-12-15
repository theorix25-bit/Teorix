import { getContent2, getProgress2 } from "@/lib/supabase";
import { create } from "zustand";
import { useUserStore } from "./useUseStore";

type TipoContenido = "clase" | "tema" | "subtema";

interface Base {
  id: number;
  tipo: TipoContenido;
  titulo: string;
  descripcion: string;
  video: null | string;
  imagen: string;
  padre_id: null | number;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface BaseConProgreso extends Base {
  progreso: ProgresoEstado;
}

interface ProgresoEstado extends Progreso {
  id: number;
  usuario_id: number;
  contenido_id: number;
  created_at: string;
  updated_at: string;
}
interface Progreso {
  completado: boolean;
  bloqueado: boolean;
}
interface Subtema extends BaseConProgreso {}

interface Tema extends BaseConProgreso {
  subtemas: Subtema[];
}
interface Clase extends BaseConProgreso {
  temas: Tema[];
}

interface CarnetB {
  loading: boolean;
  contenido: Base[] | null;
  progreso: ProgresoEstado[] | null;
  objeto: Record<number, Progreso>;

  fetchContenido: () => Promise<void>;
  fetchProgreso: (usuario_id: number) => Promise<void>;
  fetchDataContent: () => Promise<void>;
}

export const useCarnetB = create<CarnetB>((set, get) => ({
  loading: true,
  contenido: null,
  progreso: null,
  clase: null,
  clases: null,
  objeto: {},

  fetchContenido: async () => {
    const res = await getContent2();
    set({ contenido: res });
  },
  fetchProgreso: async (usuario_id) => {
    const res = await getProgress2(usuario_id);
    set({ progreso: res });
  },
  fetchDataContent: async () => {
    const { fetchContenido, fetchProgreso } = get();

    if (!get().contenido) await fetchContenido();

    if (!get().progreso) {
      const id = useUserStore.getState().user?.[0].id;
      if (id) await fetchProgreso(id);
    }

    const progresoMap: Record<number, ProgresoEstado> = {};
    get().progreso?.forEach((p) => {
      progresoMap[p.contenido_id] = p;
    });

    const contenidoPlano = get().contenido ?? [];

    const clases = contenidoPlano?.filter((c) => c.tipo === "clase");

    const clasesConTemas = clases.map((clase) => {
      const temas = contenidoPlano.filter(
        (t) => t.tipo === "tema" && t.padre_id === clase.id
      );

      return {
        ...clase,
        temas,
      };
    });

    
    const withProgreso = (id: number): Progreso => {
      return progresoMap[id]
        ? {
            completado: progresoMap[id].completado,
            bloqueado: progresoMap[id].bloqueado,
          }
        : {
            completado: false,
            bloqueado: true,
          };
    };
    const clasesFinales = clases.map((clase) => {
      const temas = contenidoPlano
        .filter((t) => t.tipo === "tema" && t.padre_id === clase.id)
        .map((tema) => {
          const subtemas = contenidoPlano
            .filter((s) => s.tipo === "subtema" && s.padre_id === tema.id)
            .map((subtema) => ({
              ...subtema,
              progreso: withProgreso(subtema.id),
            }));

          return {
            ...tema,
            progreso: withProgreso(tema.id),
            subtemas,
          };
        });

      return {
        ...clase,
        progreso: withProgreso(clase.id),
        temas,
      };
    });
    set({
      contenido: clasesFinales,
      objeto: progresoMap,
      loading: false,
    });
  },
}));
