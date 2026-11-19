import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import NavDados from "@/components/dados/NavDados";

// Portal de dados: desenho próprio, à parte das cores do resto do site (a Trofa a violeta, as comparações a cinzento;
// cores em app/globals.css: --trofa, --cmp, --papel, --noite).
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Dados da Trofa — Iniciativa Liberal Trofa", template: "%s · Dados da Trofa" },
  description:
    "Portal de dados abertos sobre o concelho da Trofa: indicadores, contas, contratos e decisões, com os números das fontes oficiais e sem leitura política.",
  // Nas partilhas, cada página aparece com o seu título ("Renda mediana… · Dados da Trofa"); a imagem vem do modelo geral.
};

export default function DadosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} bg-fundo text-texto`} style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <div className="border-b border-linha bg-fundo">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <Link href="/dados" className="shrink-0 text-base font-bold tracking-tight text-tinta">
            Dados da Trofa
          </Link>
          <NavDados base="/dados" />
        </div>
      </div>
      {children}
    </div>
  );
}
