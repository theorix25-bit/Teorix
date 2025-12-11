"use client";
import { getDBCarnetB, getDBTema, getDBSubTema } from "@/lib/supabase";
import { useEffect, useState } from "react";
import FormTemas from "./FormTemas";
import SelectBox from "./SeletcBox";
import SkeletonTemasAdmin from "./SkeletonTemaAdmin";
import { useRouter } from "next/navigation";

function Temas() {
  const [clases, setClases] = useState<Clases_b[]>([]);
  const [temas, setTemas] = useState<Temas[]>([]);
  const [subTemas, setSubTemas] = useState<SubTemas[]>([]);
  const [formInput, setFormInput] = useState<any>();

  const [loading, setLoading] = useState(true);
  const [loadingTema, setLoadingTema] = useState(false);
  const [loadingSubTema, setLoadingSubTema] = useState(false);

  const [selectClase, setSelectClase] = useState<number>(0);
  const [selectTema, setSelectTema] = useState<number>();
  const [selectSubTema, setSelectSubTema] = useState<number>();
  const [mode, setMode] = useState<"edit" | "create">("edit");

  const router = useRouter();

  // ----------------------------------------
  // CARGAR CLASES
  // ----------------------------------------
  const fetchClases = async () => {
    const res = await getDBCarnetB<Clases_b>();
    setClases(res);
    setLoading(false);
  };

  // ----------------------------------------
  // CARGAR TEMAS
  // ----------------------------------------
  const fetchTemas = async (id: number) => {
    setLoadingTema(true);
    const res = await getDBTema<Temas>(id);
    setTemas(res);
    setLoadingTema(false);
  };

  // ----------------------------------------
  // CARGAR SUBTEMAS
  // ----------------------------------------
  const fetchSubTemas = async (id: number) => {
    setLoadingSubTema(true);
    const res = await getDBSubTema<SubTemas>(id);
    setSubTemas(res);
    setLoadingSubTema(false);
    const subtema = subTemas.filter((s) => s.id === id);
  };

  const refreshAll = async () => {
    if (selectClase) {
      await fetchTemas(selectClase);
    }
    if (selectTema) {
      await fetchSubTemas(selectTema);
    }
    await fetchClases();
  };

  // ----------------------------------------
  // CUANDO CAMBIO CLASE
  // ----------------------------------------
  const handleClaseSelect = (id: number) => {
    console.log(id)
    setSelectClase(id);
    setSelectTema(undefined);
    setSelectSubTema(undefined);
    setTemas([]);
    setSubTemas([]);
    fetchTemas(id);
    const clase = clases.filter((c) => c.id === id)[0];
    setFormInput(clase);
  };

  // ----------------------------------------
  // CUANDO CAMBIO TEMA
  // ----------------------------------------
  const handleTemaSelect = (id: number) => {
    setSelectTema(id);
    setSelectSubTema(undefined);
    setSubTemas([]);
    fetchSubTemas(id);
    const tema = temas.filter((t) => t.id == id);
    setFormInput(tema[0]);
  };

  const handleSubTemaSelect = (id: number) => {
    setSelectSubTema(id);
    const subtema = subTemas.filter((s) => s.id === id);
    setFormInput(subtema[0]);
  };

  useEffect(() => {
    fetchClases();
  }, []);

  return loading ? (
    <SkeletonTemasAdmin />
  ) : (
    <div className="min-h-full w-full px-5">
      <h2 className="text-2xl text-center mt-3 uppercase">temas</h2>
      <button
        className="w-full h-10 mt-3 bg-zinc-700 rounded-md"
        onClick={() => router.push("admin/nuevo")}
      >
        Nuevo
      </button>
      <p className="text-sm text-center mt-2">
        utilice los menus desplegables para seleccionar
      </p>
      <div className="flex gap-3">
        {/* SELECT CLASE */}
        <SelectBox
          title="clases"
          value={selectClase}
          items={clases}
          loading={false}
          onChange={handleClaseSelect}
        />

        {/* SELECT TEMAS */}
        <SelectBox
          title="Temas"
          value={selectTema}
          items={temas}
          loading={loadingTema}
          onChange={handleTemaSelect}
        />

        {/* SELECT SUBTEMAS */}
        <SelectBox
          title="Sub Temas"
          value={selectSubTema}
          items={subTemas}
          loading={loadingSubTema}
          onChange={handleSubTemaSelect}
        />
      </div>
      <div className="flex flex-col mt-3 gap-3">
        <FormTemas prop={formInput} onRefresh={refreshAll} />
      </div>
    </div>
  );
}

export default Temas;
