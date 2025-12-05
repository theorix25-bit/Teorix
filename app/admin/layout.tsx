import Link from "next/link";
import React, { ReactNode } from "react";
const menuAdmin = [
  { nombre: "Temas" },
  { nombre: "Usuarios" },
  { nombre: "Planes" },
  { nombre: "Videos" },
  { nombre: "Archivos" },
  { nombre: "Blogs" },
];

function layoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="text-white">
        {children}
      </div>
      
    </>
    
  );
}

export default layoutAdmin;
