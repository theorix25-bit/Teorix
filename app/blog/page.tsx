"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => router.back()} className="p-1 rounded-full border px-3 py-1">
          <ArrowLeft size={18} className="inline-block" /> <span>Volver</span>
        </button>
      </div>

      {/* Título */}
      <h1 className="font-bold text-2xl lg:text-4xl">Blog</h1>

      {/* Descripción */}
      <p className="text-sm lg:text-lg max-w-3xl text-gray-700">
        A cat named Mittens has made national headlines after she managed to find her way back home, des
      </p>

      {/* Grid de Artículos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <BlogCard key={i} />
        ))}
      </div>
    </div>
  );
}

function BlogCard() {
  return (
    <Link href={"/blog/post"} className="flex flex-col gap-2">
      {/* Imagen */}
      <div className="w-full h-24 sm:h-28 lg:h-40 bg-gray-300 rounded-xl"></div>

      <div className="flex flex-col text-xs lg:text-sm">
        <span className="text-gray-500 font-semibold">NEWS</span>
        <p className="font-bold leading-tight">All pets from shelter were adopted!</p>
        <span className="text-gray-500 mt-1">13 June 2023</span>
      </div>
    </Link>
  );
}
