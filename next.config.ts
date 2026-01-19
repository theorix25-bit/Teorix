import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        /* Tengo que trabajar con el storage de supabase para agregar las lineas de abajo  */
        // protocol: "https",
        // hostname: "kerfsugxzncbjyhvoctq.supabase.co",
        // pathname: "/storage/v1/object/**",
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
