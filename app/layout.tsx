import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ChatAssistant from "@/components/ChatAssistant";
import { searchSusUser } from "@/lib/supabase";
import { fontvars } from "./fonts";
("./fonts");
// Url
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// Meta datos
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "THEORIX",
  description: "Vamos con Theo !!",
  keywords: ["curso", "carnet B", "clases", "THEORIX"],
  authors: [{ name: "Yvo", url: "https://theorix.vercel.app" }],
  creator: "THEORIX Team",
  publisher: "THEORIX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
    }
  },
  openGraph: {
  title: "THEORIX",
  description: "Vamos con Theo!!",
  url: "https://tu-dominio.com",
  siteName: "THEORIX",
  images: [
    { url: "/og-image.png", width: 1200, height: 630 }
  ],
  locale: "es_AR",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "THEORIX",
  description: "Vamos con Theo!!",
  images: ["/og-image.png"],
  creator: "@tucuenta",
},
  icons: {
    icon: [{ url: "/teo.png", type: "image/png", sizes: "32x32" }],
  },
};
// tipografia
// Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        // className={`${geistSans.className} antialiased bg-carbon `}
        className={`$ ${fontvars} antialiased bg-carbon `}
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
