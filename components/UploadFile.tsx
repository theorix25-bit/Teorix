"use client";

import { updateTableDB, uploadFileStorage } from "@/lib/supabase";
export default function UploadFile() {
  async function onSubmit(e: any) {
    e.preventDefault();

    const file = e.target.file.files[0];
    const title = e.target.title.value;
    const isPublic = e.target.isPublic.checked;

    const folder = isPublic ? "public" : "private";
    const filePath = `${folder}/${Date.now()}-${file.name}`;

    // 1. Subir al Storage
    const { data, error } = await uploadFileStorage(filePath, file);
    if (error) {
      console.log("Error al subir archivo");
      console.log(error, error.message);
      return;
    }

    // 2. Guardar en la tabla
    const { error: errorDoc } = await updateTableDB(
      "documents",
      {
        title,
        file_path: filePath,
        is_public: isPublic,
      },
      /* Parametro a corregir */ 2
    );

    if (errorDoc) {
      console.log("Error al subir archivo");
      console.log(errorDoc, errorDoc.message);
      return;
    }
  }

  return (
    <form onSubmit={onSubmit} className="row gap-3 p-4">
      <input className="col" type="file" name="file" required />
      <input
        type="text"
        className="col"
        name="title"
        placeholder="Nombre del archivo"
        required
      />

      <label>
        ¿Es público?
        <input type="checkbox" name="isPublic" />
      </label>

      <button className="bg-blue-600 text-white p-2 rounded">
        Subir archivo
      </button>
    </form>
  );
}
