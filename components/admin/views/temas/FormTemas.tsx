"use client";
import { updateTableDB } from "@/lib/supabase";
import { error } from "console";
import { useState, useEffect } from "react";

export default function FormTemas({
  prop,
  onRefresh,
}: {
  prop: any;
  onRefresh: () => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [video, setVideo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [documentos, setDocumentos] = useState("");

  async function update(prop: any) {
    const type = ["clase_id", "tema_id"];
    const data = type.find((t) => prop[t] && prop[t]);
    let res;
    switch (data) {
      case "clase_id":
        res = await updateTableDB(
          "temas",
          {
            titulo,
            descripcion,
          },
          prop.id
        );
        if (res.error) {
          alert((res.error.message = `error al actualizar la tabla temas`));
        }
        alert("actualizado");
        break;
      case "tema_id":
        res = await updateTableDB("subtemas", { titulo, descripcion }, prop.id);
        if (res.error) {
          alert((res.error.message = `error al actualizar la tabla subtemas`));
        }
        alert("actualizado");

        break;
      default:
        res = await updateTableDB("clases", { titulo, descripcion }, prop.id);
        if (res.error) {
          alert((res.error.message = `error al actualizar la tabla clases`));
        }
        alert("actualizado");
        break;
    }
    onRefresh();
  }
  useEffect(() => {
    setTitulo(prop?.titulo ?? "");
    setVideo(prop?.video ?? "");
    setDescripcion(prop?.descripcion ?? "");
    setDocumentos(prop?.documentos ?? "");
  }, [prop]);

  return (
    <>
      {prop && (
        <div className="py-2">
          <h2 className="text-lg mb-4">{titulo}</h2>
          <form>
            <div>
              <label>Titulo</label>
              <input
                className="w-full mt-2 mb-2 text-black px-2 py-1 rounded-md text-sm"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            {prop?.video !== undefined && (
              <div>
                <label>Link video</label>
                <input
                  className="w-full mt-2 mb-2 text-black px-2 py-1 rounded-md text-sm"
                  type="text"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div>
            )}

            <div>
              <label>Descripción</label>
              <input
                className="w-full mt-2 mb-2 text-black px-2 py-1 rounded-md text-sm"
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {prop?.documentos !== undefined && (
              <div>
                <label>Documento</label>
                <input
                  className="w-full mt-2 mb-2 text-black px-2 py-1 rounded-md text-sm"
                  type="text"
                  value={documentos}
                  onChange={(e) => setDocumentos(e.target.value)}
                />
              </div>
            )}
          </form>
        </div>
      )}
      <div className="flex justify-between mt-4 px-3">
        <button className="bg-zinc-800 rounded-md px-3 py-2 ">Eliminar</button>
        <button
          className="bg-zinc-800 rounded-md px-3 py-2 "
          onClick={() => update(prop)}
        >
          Guardar
        </button>
      </div>
    </>
  );
}
