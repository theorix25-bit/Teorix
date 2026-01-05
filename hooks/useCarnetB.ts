import { create } from "zustand";
import { useUserStore } from "./useUseStore";
import { createClient } from "@/lib/supabase/client";

type TipoContenido = "clase" | "tema" | "subtema";

export interface Base {
  id: number;
  tipo: TipoContenido;
  titulo: string;
  descripcion: string;
  video: null | number;
  orden: number;
  imagen: string;
  padre_id: null | number;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface BaseConProgreso extends Base {
  progreso: Progreso;
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
  contenidoCarnetB: BaseConProgreso[] | null;
  progresoUsuario: Clase[] | null;
  progreso: ProgresoEstado[] | null;
  // objeto: Record<number, Progreso>;

  fetchContenido: () => Promise<void>;
  fetchProgreso: (usuario_id: number) => Promise<void>;
  fetchDataContent: () => Promise<void>;
}

const supabase = createClient();

export const useCarnetB = create<CarnetB>((set, get) => ({
  loading: true,
  loadingContent: true,
  loadingProgreso: true,
  contenidoCarnetB: null,
  progreso: null,
  progresoUsuario: null,
  // objeto: {},

  fetchContenido: async () => {
    // const res = await getContent2();
    const { data: res } = await supabase.from("contenido_2").select("*").order("orden", { ascending: true });
    set({ contenidoCarnetB: res, loadingContent: false });
  },
  fetchProgreso: async (usuario_id) => {
    const { data:res } = await supabase.from("progresos_2").select("*").eq("usuario_id", usuario_id);
    set({ progreso: res, loadingProgreso: false });
  },
  fetchDataContent: async () => {
    set({ loading: true });

    const { fetchContenido, fetchProgreso } = get();

    if (!get().contenidoCarnetB) {
      await fetchContenido();
    }

    if (!get().progreso) {
      const userId = useUserStore.getState().user?.[0]?.id;
      if (!userId) {
        console.log("Usuario sin ID");
        set({ loading: false });
        return;
      }
      await fetchProgreso(userId);
    }

    const contenidoPlano = get().contenidoCarnetB ?? [];
    const progresoUsuario = get().progreso ?? [];
    const usuarioNuevo = progresoUsuario.length === 0;

    // Mapa de progreso
    const progresoMap: Record<number, ProgresoEstado> = {};
    progresoUsuario.forEach((p) => {
      progresoMap[p.contenido_id] = p;
    });

    const subtemaCompletado = (id: number) =>
      progresoMap[id]?.completado === true;

    const clasesPlano = contenidoPlano
      .filter((c) => c.tipo === "clase")
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

    let claseAnteriorCompletada = true;

    const clasesFinales = clasesPlano.map((clase, claseIndex) => {
      const temasPlano = contenidoPlano
        .filter((t) => t.tipo === "tema" && t.padre_id === clase.id)
        .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

      let temaAnteriorCompletado = true;

      const temas = temasPlano.map((tema, temaIndex) => {
        const subtemasPlano = contenidoPlano
          .filter((s) => s.tipo === "subtema" && s.padre_id === tema.id)
          .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

        let subtemaAnteriorCompletado = true;

        const subtemas = subtemasPlano.map((subtema, subIndex) => {
          const completado = subtemaCompletado(subtema.id);

          const bloqueado = usuarioNuevo
            ? !(claseIndex === 0 && temaIndex === 0 && subIndex === 0)
            : !subtemaAnteriorCompletado;

          subtemaAnteriorCompletado = completado;

          return {
            ...subtema,
            progreso: { completado, bloqueado },
          };
        });

        const temaCompletado =
          subtemas.length > 0
            ? subtemas.every((s) => s.progreso.completado)
            : false;

        const temaBloqueado = usuarioNuevo
          ? !(claseIndex === 0 && temaIndex === 0)
          : !temaAnteriorCompletado;

        temaAnteriorCompletado = temaCompletado;

        return {
          ...tema,
          subtemas,
          progreso: {
            completado: temaCompletado,
            bloqueado: temaBloqueado,
          },
        };
      });

      const claseCompletada =
        temas.length > 0 ? temas.every((t) => t.progreso.completado) : false;

      const claseBloqueada = usuarioNuevo
        ? claseIndex !== 0
        : !claseAnteriorCompletada;

      claseAnteriorCompletada = claseCompletada;

      return {
        ...clase,
        temas,
        progreso: {
          completado: claseCompletada,
          bloqueado: claseBloqueada,
        },
      };
    });

    set({
      progresoUsuario: clasesFinales,
      loading: false,
    });
  },
}));
