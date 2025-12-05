"use client";
import { getDBCarnetB, getDBTema, getDBSubTema } from "@/lib/supabase";
import { CaseLower } from "lucide-react";
import { useEffect, useState } from "react";

function Temas() {
  const [clases, setClases] = useState<Clases_b[]>([]);
  const [temas, setTemas] = useState<Temas[]>([]);
  const [subTemas, setSubTemas] = useState<SubTemas[]>([]);
  const form = [subTemas,temas,clases]

  const [loading, setLoading] = useState(true);
  const [loadingTema, setLoadingTema] = useState(false);
  const [loadingSubTema, setLoadingSubTema] = useState(false);

  const [selectClase, setSelectClase] = useState<number>(0);
  const [selectTema, setSelectTema] = useState<number>();
  const [selectSubTema, setSelectSubTema] = useState<number>();

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
  };

  // ----------------------------------------
  // CARGAR FORMULARIO
  // ----------------------------------------
  const setFormTema = (Tema:any) => {
    Tema.map((t:any, i:any) => console.log(i,t))
  };

  // ----------------------------------------
  // CUANDO CAMBIO CLASE
  // ----------------------------------------
  const handleClaseSelect = (id: number) => {
    setSelectClase(id);
    setSelectTema(undefined);
    setSelectSubTema(undefined);
    setTemas([]);
    setSubTemas([]);
    fetchTemas(id);
  };

  // ----------------------------------------
  // CUANDO CAMBIO TEMA
  // ----------------------------------------
  const handleTemaSelect = (id: number) => {
    setSelectTema(id);
    setSelectSubTema(undefined);
    setSubTemas([]);
    fetchSubTemas(id);
  };

  useEffect(() => {
    fetchClases();
  }, []);

  return loading ? (
    <SkeletonTemasAdmin />
  ) : (
    <div className="min-h-full w-full px-5">
      <button
        className="w-full h-10 mt-3 bg-zinc-700 rounded-md"
        onClick={() => alert("Nuevo Tema")}
      >
        Nuevo tema
      </button>
      <button
        className="w-full h-10 mt-3 bg-zinc-700 rounded-md"
        onClick={() => setFormTema(form)}
      >
        Editar
      </button>

      <div className="flex gap-3">
        {/* SELECT CLASE */}
        <SelectBox
          title="Clases"
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
          onChange={setSelectSubTema}
        />
      </div>

      <div className="flex flex-col mt-3 gap-3">
        {
          // temas[selectTema] &&
          //   temas.map((t, i) => (
          //     <>
          //       <FormTemas tema={t} />
          //     </>
          //   ))
          //   temas.map((t, i) => (
          //     <>
          //       <p key={i}>{t.titulo}</p>
          //     </>
          //   ))
        }

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="bg-zinc-800 w-1/3 h-6 rounded-md"></div>
            <div className="bg-zinc-800 w-2/3 h-6 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Temas;

//
// ----------------------------------------
// SELECT GENÉRICO
// ----------------------------------------
//
type GenericItem = {
  id: number;
  titulo: String; // <- CORREGIDO
};

type SelectBoxProps<T extends GenericItem> = {
  title: String;
  value?: number;
  items: T[];
  loading?: boolean;
  onChange: (value: number) => void;
};

function SelectBox<T extends GenericItem>({
  title,
  value,
  items,
  loading = false,
  onChange,
}: SelectBoxProps<T>) {
  return (
    <select
      className="w-full h-10 mt-3 bg-zinc-800 rounded-md text-sm text-white"
      disabled={loading}
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value="">{`-- ${title} --`}</option>

      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.titulo}
        </option>
      ))}
    </select>
  );
}

//
// ----------------------------------------
// SKELETON
// ----------------------------------------
function SkeletonTemasAdmin() {
  return (
    <div className="min-h-full w-full animate-pulse px-5">
      <div className="w-full h-10 mt-3 bg-zinc-800 rounded-md"></div>
      <div className="w-full h-10 mt-3 bg-zinc-800 rounded-md"></div>
      <div className="flex flex-col mt-3 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="bg-zinc-800 w-1/3 h-6 rounded-md"></div>
            <div className="bg-zinc-800 w-2/3 h-6 rounded-md"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 px-3">
        <div className="bg-zinc-800 rounded-md px-3 py-2 w-20 h-8"></div>
        <div className="bg-zinc-800 rounded-md px-3 py-2 w-20 h-8"></div>
      </div>
    </div>
  );
}

function FormTemas({ tema }: { tema: Temas }) {
  console.log(tema);
  return (
    <>
      <div>
        <h2>{tema.titulo}</h2>
        <form>
          <div>
            <label htmlFor="">link video</label>
            <input className="w-full" type="text" />
          </div>
          <div>
            <label htmlFor="">Descripcion</label>
            <input className="w-full" type="text" />
          </div>
          <div>
            <label htmlFor="">Documento</label>
            <input className="w-full" type="text" />
          </div>
        </form>
      </div>
    </>
  );
}
