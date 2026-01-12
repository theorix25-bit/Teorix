"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
interface PageProps {
  planes?: any[] | null;
  documentos?: any[] | null
  tipo?: "crear" | "editar" | "eliminar"
}
function Form({ planes,documentos,tipo }: PageProps) {
  const supabase = createClient();

  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectFase, setSelectFase] = useState<string>("");
  const [id,setId] = useState<number>(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let slug = generarSlug(titulo);

    if(tipo == "crear"){
      const { data, error } = await supabase.from("gramma").insert([
        {
          titulo: titulo,
          descripcion:descripcion,
          slug: slug,
          url: url,
          fase: selectFase,
        },
      ]).select("*");

    if (error) console.log(error);
    toast.success(`Documento agregado con éxito`);

    } 
    if(tipo == "editar"){
      const { data, error } = await supabase.from("gramma").update(
        {
          titulo: titulo,
          descripcion:descripcion,
          slug: slug,
          url: url,
          fase: selectFase,
        },
      ).eq("id",id).select("*");
      if(error) console.log(error)
    console.log(data);
    toast.success(`Documento editado con éxito`);

    }
    if(tipo == "eliminar"){
      const { error } = await supabase
      .from('gramma')
      .delete()
      .eq('id', id)
      if(error) console.log(error) 
        toast.success("Documento eliminado")
    }
    

    limpiarInputs();

  };
  function limpiarInputs() {
    setTitulo("");
    setDescripcion("");
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
  function selectInput(e:ChangeEvent<HTMLSelectElement>){
    setId(Number(e.target.value))
    let num = Number(e.target.value)
    let datos = documentos?.filter((d => d.id == num))
    console.log(datos?.[0])

    setTitulo(datos?.[0].titulo);
    setDescripcion(datos?.[0].descripcion  || "");
    setUrl(datos?.[0].url);
    setSelectFase(datos?.[0].fase);
  }
  return (
    <>
      <nav className=" w-80 mx-auto flex gap-4 justify-center mt-5 ">
        <Link href={`/admin/documentos/crear`} className="border px-2 py-1 rounded-md">Crear</Link>
        <Link href={`/admin/documentos/editar`} className="border px-2 py-1 rounded-md">editar</Link>
        <Link href={`/admin/documentos/eliminar`} className="border px-2 py-1 rounded-md">Eliminar</Link>
      </nav>
      <div className="mb-6 w-80 mx-auto mt-2">
        {(tipo == "editar" ||  tipo == "eliminar")
        && 
        <div>
        <label htmlFor="" className="">Lista de documentos</label>
        <select name="" id="documentos" className="text-black w-full py-1 px-2" onChange={selectInput}>
        <option value="#">-- Elija documento --</option>
        {documentos?.map(d =>
          <option  key={d.id} value={d.id}>{d.titulo}</option> 
          )}
      </select>
        </div> }
        
      { tipo !== "eliminar" ? <form
      action=""
      onSubmit={handleSubmit}
      className=" w-80 mx-auto p-4 rounded-xl"
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
      <div className="mb-3">
        <label htmlFor="descripcion" className="block">
          Descripción
        </label>
        <input
          id="descripcion"
          required
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
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
        {loading ? "Guardando" : tipo == "crear" ? "Crear":"Editar"}
      </button>
    </form> : <form action="" onSubmit={handleSubmit} >
      <br />
       <button
        type="submit"
        className="px-3 py-2 border border-lima rounded-md w-full"
      >
        {loading ? "Eliminando":"Eliminar"}
      </button>
    </form> }
      
      </div>

    

    </>

  );
}

export default Form;
