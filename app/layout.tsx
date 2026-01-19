import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ChatAssistant from "@/components/ChatAssistant";
import { searchSusUser } from "@/lib/supabase";
import { fontvars } from "./fonts";
import { UseProviders } from "@/providers/UserProvider";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { ToasterProvider } from "@/providers/ToasterProvider";
import Clarity from "@/components/Clarity";
("./fonts");
// Url
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Meta datos
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "El primer asistente virtual teórico con acompañamiento humano real",
  description:
    "Aprueba el examen teórico con vídeos, test DGT y tutores reales. Estudia desde el móvil, a tu ritmo y sin aburrirte.",
  keywords: [
    "curso online para sacarse el carnet de coche",
    "aprobar el examen teórico DGT",
    "test DGT online",
    "cómo estudiar el teórico desde casa",
  ],
  authors: [{ name: "Yvo", url: "https://theorix.vercel.app" }],
  creator: "THEORIX Team",
  publisher: "THEORIX",
  icons: {
    icon: [{ url: "favicon.png", type: "image/png", sizes: "32x32" }],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "El primer asistente virtual teórico con acompañamiento humano real",
    description:
      "Aprueba el examen teórico con vídeos, test DGT y tutores reales. Estudia desde el móvil, a tu ritmo y sin aburrirte.",
    url: "https://tu-dominio.com",
    siteName: "THEORIX",
    images: [{ url: "Logo_Theorix.png", width: 1200, height: 630 }],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El primer asistente virtual teórico con acompañamiento humano real",
    description:
      "Aprueba el examen teórico con vídeos, test DGT y tutores reales. Estudia desde el móvil, a tu ritmo y sin aburrirte.",
    images: ["Logo_Theorix.png"],
    // creator: "@tucuenta",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`$ ${fontvars} antialiased `} suppressHydrationWarning>
        <UseProviders>
          <Header />
          <CookieBanner />
          <Analytics />
          <Clarity />
          <ToasterProvider />
          {children}
        </UseProviders>
      </body>
    </html>
  );
}
