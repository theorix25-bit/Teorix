"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const blogs = [
  {
    id: 1,
    title: "Cómo preparar tu examen teórico sin estrés",
    description: "Consejos prácticos para estudiar y aprobar a la primera.",
    image: "/images/blog1.jpg",
  },
  {
    id: 2,
    title: "Errores comunes en la conducción y cómo evitarlos",
    description: "Aprende los fallos más típicos que cometen los principiantes.",
    image: "/images/blog2.jpg",
  },
  {
    id: 3,
    title: "La importancia de conocer las señales de tráfico",
    description: "Domina las señales más importantes antes del examen.",
    image: "/images/blog3.jpg",
  },
  {
    id: 4,
    title: "Consejos para conducir con mal clima",
    description: "Cómo mantener la seguridad al conducir bajo lluvia o niebla.",
    image: "/images/blog4.jpg",
  },
  {
    id: 5,
    title: "¿Qué hacer el día del examen práctico?",
    description: "Pasos y recomendaciones para mantener la calma ese día.",
    image: "/images/blog5.jpg",
  },
  {
    id: 6,
    title: "El papel del instructor en tu aprendizaje",
    description: "Por qué un buen instructor puede marcar la diferencia.",
    image: "/images/blog6.jpg",
  },
];

const Blogs = () => {
  const router = useRouter();

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-lima">BLOGS EDUCATIVOS</h2>
        <p className="text-white fs-5">
          Descubre los mejores consejos y artículos sobre conducción y seguridad vial.
        </p>
      </div>

      {/* Grid de Blogs */}
      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-12 col-md-6 col-lg-4">
            <div
              className="card h-100 border-lima blog-card"
              onClick={() => router.push(`/blog/${blog.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={250}
                className="card-img-top"
                style={{ objectFit: "cover", height: "220px" }}
              />
              <div className="card-body">
                <h5 className="card-title text-lima fw-semibold">{blog.title}</h5>
                <p className="card-text text-white">{blog.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-outline-theorix w-100">
                  Leer más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
