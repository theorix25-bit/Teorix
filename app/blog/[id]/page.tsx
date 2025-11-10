"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// 📚 Datos simulados de los blogs (podés reemplazarlos con una base de datos después)
const blogs = [
  {
    id: "1",
    title: "Cómo preparar tu examen teórico sin estrés",
    author: "Theo Instructor",
    date: "10 de noviembre, 2025",
    image: "/images/blog1.jpg",
    content: `
      Preparar el examen teórico puede parecer abrumador, pero con la estrategia adecuada es totalmente posible aprobar a la primera.
      <br/><br/>
      1. Organiza tu tiempo:** Dedica al menos 30 minutos diarios a repasar el temario oficial y las señales de tráfico.
      <br/>
      2. Practica con tests:** Realizar simulacros de examen te ayudará a familiarizarte con el formato y las preguntas.
      <br/>
      3. Descansa bien:** Dormir lo suficiente antes del examen mejora la concentración y reduce el estrés.
      <br/><br/>
      ¡Recuerda! La constancia vale más que estudiar todo a último momento. 
    `,
  },
  {
    id: "2",
    title: "Errores comunes en la conducción y cómo evitarlos",
    author: "Theo Instructor",
    date: "3 de noviembre, 2025",
    image: "/images/blog2.jpg",
    content: `
      Todos los conductores, incluso los experimentados, cometen errores al volante. 
      Lo importante es reconocerlos y aprender de ellos.
      <br/><br/>
      🚗 **1. No usar los espejos correctamente:** Revisá los espejos antes de cambiar de carril o girar.
      <br/>
      ⚠️ **2. No mantener distancia de seguridad:** Siempre dejá al menos 2 segundos de espacio con el vehículo de adelante.
      <br/>
      📵 **3. Distraerte con el celular:** Es una de las principales causas de accidentes. Evitalo a toda costa.
      <br/><br/>
      Con práctica y atención, cada viaje puede ser más seguro y tranquilo.
    `,
  },
];

export default function EntradaBlog() {
  const { id } = useParams();
  const router = useRouter();

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-lima">Blog no encontrado</h2>
        <button className="btn btn-outline-theorix mt-3" onClick={() => router.push("/blog")}>
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Botón de volver */}
      <button
        className="btn btn-outline-theorix mb-4"
        onClick={() => router.push("/blog")}
      >
        ← Volver al listado
      </button>

      {/* Encabezado */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-lima mb-3">{blog.title}</h1>
        <p className="text-white">
          <small>
            Publicado el {blog.date} · Por {blog.author}
          </small>
        </p>
      </div>

      {/* Imagen destacada */}
      <div className="text-center mb-4">
        <Image
          src={blog.image}
          alt={blog.title}
          width={900}
          height={500}
          className="img-fluid rounded shadow-sm"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Contenido */}
      <div
        className="mx-auto"
        style={{ maxWidth: "800px", lineHeight: "1.8", fontSize: "1.1rem" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
}
