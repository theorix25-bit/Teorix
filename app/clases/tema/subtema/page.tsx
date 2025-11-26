"use client";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  FileText,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubTemaPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 text-lima">
        <button onClick={() => router.back()} className="p-1 lg:px-3 lg:py-1">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold text-lg lg:text-2xl">Sub Temas </h1>
      </div>

      {/* Video */}
      <div className="w-full h-60 lg:h-auto bg-gray-300 rounded-xl aspect-video flex items-center justify-center">
        <ImageIcon size={60} />
      </div>

      {/* Texto corto */}
      <p className="text-sm text-gray-50 px-2 lg:text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
        nesciunt accusamus repudiandae, perferendis ipsum velit libero tempore
        molestiae? Molestias expedita repellendus sed cum ad itaque nulla,
        voluptatibus accusamus! Accusantium, provident.
      </p>

      {/* Documento */}
      <div className="border rounded-xl p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold text-sm lg:text-base">
          <FileText size={20} /> Documento
        </div>

        <div className="flex items-center gap-3 text-xs lg:text-sm">
          <button className="border rounded px-3 py-1 flex items-center gap-1">
            <Download size={14} /> Descargar
          </button>
          <button className="underline">Abrir</button>
        </div>
      </div>

      {/* Repaso Rápido */}
      <div className="space-y-4">
        <h2 className="font-semibold text-sm lg:text-lg">Repaso rápido</h2>

        {Array.from({ length: 3 }).map((_, i) => (
          <Pregunta key={i} />
        ))}
      </div>

      {/* Siguiente */}
      <div className="flex justify-end items-center text-sm lg:text-base font-semibold pt-4">
        <Link href={"/clases/tema/subtema"} className="flex items-center gap-1">
          Siguiente <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}

function Pregunta() {
  return (
    <div className="border rounded-xl p-3 space-y-2 ">
      <p className="text-sm lg:text-base font-medium">
        Pregunta 1: Lorem upsu medium
      </p>

      <div className="flex items-center gap-6 text-sm lg:text-base">
        <label className="flex items-center gap-1">
          <input type="checkbox" /> Sí
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" /> No
        </label>
      </div>
    </div>
  );
}
