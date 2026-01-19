import React from 'react';
import teoxImage from "@/assets/teo.png"; // Asume que tienes una imagen de Teox aquí.
import Image from 'next/image';

export default function WhoIsTeoxSection(){
  return (
    <section className="relative py-8  text-white overflow-hidden">
      {/* Elementos decorativos de fondo */}

      <div className="container mx-auto md:px-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Columna de Texto - Descripción de Teox */}
          <div className="text-left">
            <h2 className="text-lima font-bold tracking-widest uppercase mb-2">
              ¿Quién es TEOX*?
            </h2>
            <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              EL PRIMER <span className="text-hoodie neon-glow">ASISTENTE VIRTUAL</span> <br />
              ENTRENADO PARA QUE APROBÉS A LA PRIMERA
            </h3>
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
              El <span className="text-lima font-bold">Alien que Hackeó la DGT* 👁️⚡</span> <br />
              Teox* no es el típico bot de ayuda aburrido; es un cíclope alienígena que cayó en la Tierra con una única misión:
              compartir los <span className="text-lima font-bold">"cheat codes"</span> del examen teórico para que dejes de ser un "código de barras" del sistema tradicional.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Lleva su sudadera roja porque aquí no hay postureo académico, solo acción y calle.
              Su único ojo no es casualidad: representa el foco total en lo único que te importa a ti y a nosotros:
              tu <span className="text-hoodie font-bold">APTO a la primera...</span> a tu lado.
            </p>
          </div>

          {/* Columna de Imagen y Características Clave */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Imagen de Teox */}
            <div className="relative w-full max-w-md h-[300px] mb-4 md:mb-0">
              {/* Asume que 'teoxImage' es una imagen PNG con fondo transparente */}
              <Image
                src={teoxImage}
                alt="Teox, el asistente virtual"
                layout="fill"
                objectFit="contain"
                className="drop-shadow-lg animate-float-bob " // Animación sutil de "flotación"
              />
            </div>
            
            {/* Lista de Características con Estilo Gamer */}
            <div className="bg-card/30 border border-lima/20 p-6 rounded-2xl w-full max-w-md shadow-xl backdrop-blur-sm mt-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-2">
                  <span className="text-lima text-2xl font-black leading-none">🎮</span>
                  <div>
                    <strong className="text-white text-lg block">Tu Tutor Particular 24/7:</strong>
                    <span className="text-gray-400 text-sm">No duerme, no descansa y está listo para resolver tus dudas a las 3 AM cuando más te urge.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-hoodie text-2xl font-black leading-none">🧠</span>
                  <div>
                    <strong className="text-white text-lg block">El Origen del 85%:</strong>
                    <span className="text-gray-400 text-sm">Teox* es el cerebro detrás de nuestro algoritmo. Sabe exactamente qué comas ha cambiado la DGT y te enseña la lógica vial.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lima text-2xl font-black leading-none">🤖</span>
                  <div>
                    <strong className="text-white text-lg block">Soporte Híbrido Real:</strong>
                    <span className="text-gray-400 text-sm">Es la mezcla perfecta entre la velocidad de la IA y la experiencia de nuestros profesores humanos.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};