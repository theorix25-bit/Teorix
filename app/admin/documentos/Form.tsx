"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
interface PageProps {
  planes: any[] | null;
}
function Form({ planes }: PageProps) {
  const supabase = createClient();
  const [titulo, setTitulo] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectFase, setSelectFase] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    let slug = generarSlug(titulo);
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("gramma")
      .insert([
        {
          titulo: titulo,
          slug: slug,
          url: url,
          fase: selectFase,
        },
      ])
      .select("*");
    if (error) console.log(error);
    limpiarInputs();
    alert(`Documento agregado con éxito
    Titulo: ${titulo}
    Slug: ${slug}
    Url: ${url}
    Fase: ${selectFase}

      `);
  };
  function limpiarInputs() {
    setTitulo("");
    setUrl("");
    setSelectFase("");
  }
  function generarSlug(texto: string) {
    return texto
      .toLowerCase()
      .trim()
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // elimina acentos
      .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres no válidos
      .replace(/\s+/g, "-") // espacios -> guiones
      .replace(/-+/g, "-"); // evita guiones duplicados
  }
  console.log(planes);
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="border w-80 mx-auto p-4 rounded-xl"
    >
      {/* Titulo */}
      <div className="mb-3">
        <label htmlFor="Titulo" className="block">
          Titulo
        </label>
        <input
          id="titulo"
          required
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full rounded-md text-black px-1"
        />
      </div>
      {/* Archivo */}
      <div className="mb-3">
        <label htmlFor="url" className="block">
          URL
        </label>
        <input
          id="url"
          type="text"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-md text-black px-1"
        />
      </div>
      <div className="mb-3 ">
        <label htmlFor="url" className="block">
          Fase del plan
        </label>
        <select
          name="fase"
          required
          className="text-black text-center"
          onChange={(e) => setSelectFase(e.target.value)}
          value={selectFase}
          id=""
        >
          <option value="">-- Elija una fase --</option>
          {planes?.map((p) => (
            <option key={p.id} value={p.id - 1}>
              {p.fase}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-3 py-2 border border-lima rounded-md w-full"
      >
        {loading ? "Enviando" : "Enviar"}
      </button>
    </form>
  );
}

export default Form;
