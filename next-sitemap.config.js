/** @type {import('next-sitemap').IConfig} */
const { createClient } = require("@supabase/supabase-js");

// Crear cliente supabase en tiempo de build (asegúrate de tener las variables de entorno)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = SUPABASE_URL && SERVICE_ROLE_KEY ? createClient(SUPABASE_URL, SERVICE_ROLE_KEY) : null;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://theorix.vercel.app",

  generateRobotsTxt: false, // usamos app/robots.ts

  exclude: ["/api/*", "/robots.txt"],

  changefreq: "weekly",
  priority: 0.7,

  // MUY IMPORTANTE para App Router
  transform: async (config, path) => {
    // Excluir rutas internas que no son páginas
    if (
      !path ||
      path.startsWith("/api") ||
      path.startsWith("/_next") ||
      path.includes("robots.txt")
    ) {
      return null;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Agregar rutas dinámicas basadas en contenido de la base de datos
  additionalPaths: async (config) => {
    const staticPaths = ["/", "/blog", "/formulas"];

    if (!supabase) {
      return staticPaths.map((p) => ({ loc: p }));
    }

    try {
      const { data } = await supabase.from("contenido_2").select("*");
      if (!data) return staticPaths.map((p) => ({ loc: p }));

      const byId = new Map();
      data.forEach((d) => byId.set(d.id, d));

      const subtemas = data.filter((d) => d.tipo === "subtema");

      const dynamicPaths = subtemas.map((s) => {
        const tema = byId.get(s.padre_id);
        const clase = tema ? byId.get(tema.padre_id) : null;
        const parts = ["/formulas"];
        if (clase && clase.slug) parts.push(clase.slug);
        if (tema && tema.slug) parts.push(tema.slug);
        if (s.slug) parts.push(s.slug);
        return { loc: parts.join("/") };
      });

      return [...staticPaths.map((p) => ({ loc: p })), ...dynamicPaths];
    } catch (e) {
      console.error("next-sitemap: error obteniendo rutas dinámicas:", e);
      return staticPaths.map((p) => ({ loc: p }));
    }
  },
};
