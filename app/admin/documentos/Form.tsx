"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { FileText, Save, Trash2, Edit3, PlusCircle, Link as LinkIcon, Layers, Loader2 } from "lucide-react";

interface PageProps {
  planes?: any[] | null;
  documentos?: any[] | null;
  tipo?: "crear" | "editar" | "eliminar";
}

function Form({ planes, documentos, tipo = "crear" }: PageProps) {
  const supabase = createClient();

  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectFase, setSelectFase] = useState<string>("");
  const [id, setId] = useState<number>(0);

  // Estilos dinámicos según el tipo de acción
  const isDelete = tipo === "eliminar";
  const accentColor = isDelete ? "border-[#E6392D] text-[#E6392D]" : "border-[#C6FF5B] text-[#C6FF5B]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const slug = generarSlug(titulo);
    const toastId = toast.loading(isDelete ? "Eliminando..." : "Procesando...");

    try {
      if (tipo === "crear") {
        await supabase.from("gramma").insert([
          { titulo, descripcion, slug, url, fase: selectFase }
        ]);
        toast.success("Documento creado con éxito", { id: toastId });
      } 
      
      else if (tipo === "editar") {
        await supabase.from("gramma").update(
          { titulo, descripcion, slug, url, fase: selectFase }
        ).eq("id", id);
        toast.success("Cambios guardados", { id: toastId });
      } 
      
      else if (tipo === "eliminar") {
        await supabase.from('gramma').delete().eq('id', id);
        toast.success("Documento removido", { id: toastId });
      }

      limpiarInputs();
    } catch (error) {
      toast.error("Hubo un error en la operación", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const selectInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setId(selectedId);
    const doc = documentos?.find(d => d.id === selectedId);

    if (doc) {
      setTitulo(doc.titulo);
      setDescripcion(doc.descripcion || "");
      setUrl(doc.url);
      setSelectFase(doc.fase);
    }
  };

  function limpiarInputs() {
    setTitulo("");
    setDescripcion("");
    setUrl("");
    setSelectFase("");
    setId(0);
  }

  function generarSlug(texto: string) {
    return texto.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#111111] text-[#F8F9FB]">
      {/* NAVEGACIÓN TIPO TABS */}
      <nav className="flex p-1 bg-[#0E2633] rounded-xl mb-8 border border-white/5">
        {[
          { id: "crear", label: "Crear", icon: PlusCircle },
          { id: "editar", label: "Editar", icon: Edit3 },
          { id: "eliminar", label: "Eliminar", icon: Trash2 },
        ].map((btn) => (
          <Link
            key={btn.id}
            href={`/admin/documentos/${btn.id}`}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tipo === btn.id 
              ? "bg-[#C6FF5B] text-[#111111] shadow-lg" 
              : "text-white/40 hover:text-white"
            }`}
          >
            <btn.icon size={16} />
            {btn.label}
          </Link>
        ))}
      </nav>

      {/* SELECCIÓN DE DOCUMENTO (Para Editar/Eliminar) */}
      {(tipo === "editar" || tipo === "eliminar") && (
        <div className="mb-8 space-y-2 animate-in fade-in slide-in-from-top-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#C6FF5B]">Seleccionar Documento</label>
          <select 
            className="w-full bg-[#0E2633] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#C6FF5B]"
            onChange={selectInput}
            value={id}
          >
            <option value={0}>-- Elija un documento para {tipo} --</option>
            {documentos?.map(d => <option key={d.id} value={d.id}>{d.titulo}</option>)}
          </select>
        </div>
      )}

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {tipo !== "eliminar" && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Titulo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                <FileText size={14} /> Título del Documento
              </label>
              <input
                required
                type="text"
                placeholder="Ej: Guía de Gramática A1"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-[#0E2633] border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#C6FF5B]/20 focus:border-[#C6FF5B]"
              />
            </div>

            {/* Descripcion */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Descripción breve</label>
              <textarea
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full bg-[#0E2633] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#C6FF5B] h-24 resize-none"
              />
            </div>

            {/* URL y Fase en Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <LinkIcon size={14} /> URL del Archivo
                </label>
                <input
                  required
                  type="text"
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-[#0E2633] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#C6FF5B]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Layers size={14} /> Fase del Plan
                </label>
                <select
                  required
                  value={selectFase}
                  onChange={(e) => setSelectFase(e.target.value)}
                  className="w-full bg-[#0E2633] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#C6FF5B]"
                >
                  <option value="">-- Fase --</option>
                  {planes?.map((p) => (
                    <option key={p.id} value={p.id - 1}>{p.fase}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* BOTÓN DE ACCIÓN */}
        <button
          type="submit"
          disabled={loading || (tipo !== "crear" && id === 0)}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:opacity-30 ${
            isDelete 
            ? "bg-[#E6392D] text-white hover:bg-[#b02a22]" 
            : "bg-[#C6FF5B] text-[#111111] hover:bg-[#a3d34a]"
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : isDelete ? (
            <><Trash2 size={20} /> Eliminar Documento</>
          ) : tipo === "crear" ? (
            <><PlusCircle size={20} /> Publicar Documento</>
          ) : (
            <><Save size={20} /> Guardar Cambios</>
          )}
        </button>
      </form>

      {/* PREVISUALIZACIÓN DISCRETA */}
      {!isDelete && titulo && (
        <div className="mt-8 p-4 border border-white/5 bg-white/5 rounded-xl border-l-[#C6FF5B] border-l-4">
          <p className="text-[10px] text-white/30 uppercase font-black mb-1">Vista Previa del Slug</p>
          <code className="text-[#C6FF5B] text-xs">/documentos/{generarSlug(titulo)}</code>
        </div>
      )}
    </div>
  );
}

export default Form;