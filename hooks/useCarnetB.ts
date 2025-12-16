import { getContent2, getProgress2 } from "@/lib/supabase";
import { create } from "zustand";
import { useUserStore } from "./useUseStore";

type TipoContenido = "clase" | "tema" | "subtema";

export interface Base {
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

export interface BaseConProgreso extends Base {
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

export interface Tema extends BaseConProgreso {
  subtemas: Subtema[];
}
export interface Clase extends BaseConProgreso {
  temas: Tema[];
}

interface CarnetB {
  loading: boolean;
  loadingContent: boolean;
  loadingProgreso: boolean;
  contenidoCarnetB: Base[] | null;
  progresoUsuario: Clase[] | null;
  progreso: ProgresoEstado[] | null;
  // objeto: Record<number, Progreso>;

  fetchContenido: () => Promise<void>;
  fetchProgreso: (usuario_id: number) => Promise<void>;
  fetchDataContent: () => Promise<void>;
}

export const useCarnetB = create<CarnetB>((set, get) => ({
  loading: true,
  loadingContent: true,
  loadingProgreso: true,
  contenidoCarnetB: null,
  progreso: null,
  progresoUsuario: null,
  // objeto: {},

  fetchContenido: async () => {
    const res = await getContent2();
    set({ contenidoCarnetB: res, loadingContent: false });
  },
  fetchProgreso: async (usuario_id) => {
    const res = await getProgress2(usuario_id);
    set({ progreso: res, loadingProgreso: false });
  },
  fetchDataContent: async () => {
    set({ loading: true });
    const { fetchContenido, fetchProgreso } = get();

    if (!get().contenidoCarnetB) await fetchContenido();

    if (!get().progreso) {
      const id = useUserStore.getState().user?.[0].id;
      id == undefined
        ? console.error("Error al obtener el id")
        : await fetchProgreso(id);
    }

    const progresoMap: Record<number, ProgresoEstado> = {};
    get().progreso?.forEach((p) => {
      progresoMap[p.contenido_id] = p;
    });

    const contenidoPlano = get().contenidoCarnetB ?? [];

    const clases = contenidoPlano?.filter((c) => c.tipo === "clase");

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
      progresoUsuario: clasesFinales,
      // objeto: progresoMap,
      loading: false,
    });
  },
}));
