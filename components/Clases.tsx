"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CourseView() {
  const [filter, setFilter] = useState("");

  const topics = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: "Título Tema",
    img: "/placeholder.png",
  }));

  return (
    <div className="max-w-5xl mx-auto p-4 ">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 bg-gray-300 h-48 lg:h-64 rounded-lg flex items-center justify-center">
          {/* <Image src="" width={120} height={120} alt="imagen" /> */}
          {/* <img src="" alt="" /> */}
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-2xl text-lima font-bold mb-2">Carnet B</h2>
          <p className="text-sm text-white">
            Descripción completa Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          </p>
        </div>
      </div>

      {/* Filtro */}
      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold">Temas</p>

        <select
          className="border text-black rounded px-2 py-1 text-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filtro</option>
          <option value="a">Tema 1</option>
          <option value="z">Tema 2</option>
        </select>
      </div>

      {/* GRID responsive */}
      <div
        className="
          mt-3 grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-3
        "
      >
        {topics.map((topic) => (
          <Link
            href={"/clases/tema"}
            key={topic.id}
            className="flex items-center gap-3 border rounded-lg p-2"
          >
            <div className="w-10 h-10 bg-gray-400 rounded flex items-center justify-center">
              {/* <Image
                src="/placeholder.png"
                alt="tema"
                width={20}
                height={20}
              /> */}
              {/* <img src="#" alt="" /> */}
            </div>
            <p className="font-semibold text-sm text-lima ">{topic.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
