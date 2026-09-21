import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Iniciativa Liberal Trofa — Trofa Para Cima",
  openGraph: {
    title: "Iniciativa Liberal Trofa — Trofa Para Cima",
    description: "Uma Trofa com mais liberdade começa aqui!",
    images: ["/images/geral/comunidade-destrave.jpeg"],
    locale: "pt_PT",
    type: "website",
  },
  description:
    "Página oficial do núcleo territorial da Iniciativa Liberal da Trofa. Uma Trofa com mais liberdade começa aqui!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
