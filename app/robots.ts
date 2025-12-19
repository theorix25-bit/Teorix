// app/robots.ts
import type { MetadataRoute } from "next";
const defaultUrl = process.env.VERCEL_URL
  ? `${process.env.VERCEL_URL}`
  : "localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/login",
          "/register",
          "/dashboard/",
          "/admin/",
          '/clases',
        ],
      },
    ],
    sitemap:`${defaultUrl}sitemap.xml`,
  };
}
