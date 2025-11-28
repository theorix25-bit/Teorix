import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import ChatAssistant from "@/components/ChatAssistant";
import { searchSusUser } from "@/lib/supabase";
import { fontvars } from "./fonts"; "./fonts";
// Url
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const urlAsistente = process.env.NEXT_URL_ASISTENTE!;

// Meta datos
export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "THEORIX",
  description: "Vamos con Theo !!",
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
        <Footer />
        <ChatAssistant urlAsistente={urlAsistente} />
      </body>
    </html>
  );
}
