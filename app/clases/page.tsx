"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Bike, Truck, Bus } from "lucide-react";
import { useRouter } from "next/navigation";

const licenseTypes = [
  {
    id: "b",
    name: "Carnet B",
    description: "Automóviles y furgonetas hasta 3.500 kg",
    icon: Car,
    color: "from-primary to-accent",
  },
  {
    id: "a",
    name: "Carnet A",
    description: "Motocicletas sin limitaciones",
    icon: Bike,
    color: "from-secondary to-red-600",
  },
  {
    id: "a2",
    name: "Carnet A2",
    description: "Motocicletas hasta 35 kW",
    icon: Bike,
    color: "from-accent to-primary",
  },
  {
    id: "c",
    name: "Carnet C",
    description: "Camiones de más de 3.500 kg",
    icon: Truck,
    color: "from-muted to-card",
  },
  {
    id: "d",
    name: "Carnet D",
    description: "Autobuses y transporte de pasajeros",
    icon: Bus,
    color: "from-card to-muted",
  },
];

const PageClases = () => {
  const router = useRouter();

  return (
    <>
      
    <div className="min-vh-100 ">
      <main className="container py-5">
        {/* Título principal */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3">
            ELIGE TU CARNET
          </h2>
          <p className=" fs-5 mx-auto" style={{ maxWidth: "600px" }}>
            Selecciona el tipo de carnet que deseas obtener y accede a las
            lecciones exclusivas de Theo.
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="row g-4 justify-content-center">
          {licenseTypes.map((license) => {
            const Icon = license.icon;
            return (
              <div
                key={license.id}
                className="col-12 col-md-6 col-lg-4"
                onClick={() => router.push(`/clases/${license.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card h-100 border-lima rounded-4">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className={`d-flex align-items-center justify-content-center ${license.color} bg-opacity-25 rounded p-3 me-3`}
                      >
                        <Icon size={60} className=" text-lima" />
                      </div>
                      <h5 className="card-title mb-0 fw-semibold">
                        {license.name}
                      </h5>
                    </div>
                    <p className="card-text text-white">
                      {license.description}
                    </p>
                    <button className="btn btn-theorix w-100 mt-3">
                      Ver lecciones
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner informativo */}
        <div className="mt-5 border border-primary-subtle rounded p-4 ">
          <div className="d-flex align-items-start gap-3">
            {/* <img
              src="/src/assets/theo-eye.png"
              alt="Theo"
              className="rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                animation: "pulse 2s infinite",
              }}
            /> */}
            <div>
              <h4 className="fw-bold text-lima mb-2">
                ¡PREPARACIÓN COMPLETA CON THEO!
              </h4>
              <p className="text-white mb-0">
                Cada tipo de carnet incluye lecciones teóricas en video, tests
                prácticos interactivos y el apoyo personalizado de Theo, tu
                tutor virtual.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Animación suave para la imagen */}
      
    </div>
    </>
  );
};

export default PageClases;
