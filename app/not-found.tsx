import teo from "@/assets/image-removebg-preview.png"
import Link from "next/link";

export default function NotFound() {
  
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <img src={teo.src} alt="" className=" w-24 mt-10" />
      <h1 className="text-6xl font-bold text-lima">404</h1>
      <p className="text-3xl mt-2 text-white">Página no encontrada</p>
      <Link className="text-xl text-white mt-2 border px-2 py-1 rounded-md" href={"/"}> volver al inicio </Link>
    </div>
  );
}
