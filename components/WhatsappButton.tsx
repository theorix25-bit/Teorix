// components/WhatsappButton.tsx
"use client"; // Es necesario para interacciones como el hover

import Link from 'next/link';
import { useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";

export function WhatsappButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Reemplaza este número con el de tu negocio (incluyendo el código de país sin '+')
  const whatsappNumber = "+34614807662"; // Ejemplo: España
  const whatsappMessage = "¡Hola! Estoy interesado en Teorix y me gustaría saber más.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed right-4 bottom-4 z-[2000] group" // z-index alto para que esté encima de todo
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-[#25D366] text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out hover:bg-[#1DA851] transform group-hover:scale-105" >
        <IoLogoWhatsapp size={32} />
        <span
          className={` whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? 'w-auto max-w-[200px] opacity-100 px-2' : 'w-0 max-w-0 opacity-0'}`} >
          PÍLLALO POR WHATSAPP
        </span>
      </Link>
    </div>
  );
}