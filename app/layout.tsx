import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize Inter font for clean, modern typography
const inter = Inter({ subsets: ["latin"] });

// Global SEO metadata configuration for Next.js App Router.
// This object is parsed server-side to generate <head> tags natively.
export const metadata: Metadata = {
  title: "Eric Lopez Rosales | Software Engineer",
  description: "Portafolio profesional de Eric Lopez Rosales (Frenek). Desarrollador backend y cloud con experiencia en Go y AWS.",
  keywords: ["Software Engineer", "Go", "Golang", "AWS", "Backend", "Serverless", "Developer"],
  authors: [{ name: "Eric Lopez Rosales" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'scroll-smooth' enables native smooth scrolling for anchor links (e.g., #contacto)
    <html lang="es" className="scroll-smooth">
      <body 
        className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased selection:bg-blue-500/30`}
      >
        {children}
      </body>
    </html>
  );
}