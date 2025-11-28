"use client";
import { ArrowLeft, ChevronRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TemaPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-lima">
        <button onClick={() => router.back()}>
          <ArrowLeft size={22} />
        </button>
        <p className="font-semibold text-xl lg:text-3xl ">Temas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="w-full h-40 lg:h-72 bg-gray-300 flex items-center justify-center rounded-xl">
          <ImageIcon size={60} />
        </div>

        {/* Descripción + Progreso */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <h1 className="font-semibold text-xl lg:text-3xl mb-2">Tema 1</h1>
            <p className="text-sm lg:text-base text-gray-50 leading-snug">
              Descripción completa Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et,  consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            </p>
          </div>

          <div>
            <p className="text-xs lg:text-lg font-semibold mb-1">Progreso</p>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className="h-2 bg-lima rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Temas */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-sm lg:text-lg">Temas</p>
        <select className="border rounded text-black px-2 text-xs lg:text-sm">
          <option>Filtro</option>
        </select>
      </div>

      {/* Listas Responsivas */}
      <div className="space-y-10">
        {[1, 2].map((sub) => (
          <div key={sub} className="space-y-3">
            <p className="text-center text-xs lg:text-base font-semibold">
              Sub tema {sub}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Link
                  href={"/clases/tema/subtema"}
                  key={i}
                  className="flex items-center gap-3 text-lima  border rounded p-2 hover:bg-gray-50/10 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded">
                    {/* <ImageIcon size={20} /> */}
                  </div>
                  <p className="text-sm lg:text-base font-medium">
                    Título Tema
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Siguiente */}
      <div className="flex justify-end items-center text-sm lg:text-base font-semibold">
        <Link href={"/clases/tema"} className="flex items-center gap-1">
          Siguiente <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
