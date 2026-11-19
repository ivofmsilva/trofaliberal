import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { DadosNucleo } from "@/components/DadosEstruturados";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/url";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL(siteUrl),
  title: "Iniciativa Liberal Trofa — Trofa Para Cima",
  openGraph: {
    title: "Iniciativa Liberal Trofa — Trofa Para Cima",
    description: "Uma Trofa com mais liberdade começa aqui!",
    images: ["/images/geral/comunidade-destrave-trofa.jpeg"],
    locale: "pt_PT",
    type: "website",
  },
  description:
    "Iniciativa Liberal Trofa: uma Trofa com mais liberdade começa aqui! Somos a energia que a Trofa precisa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <DadosNucleo />
      </body>
    </html>
  );
}
