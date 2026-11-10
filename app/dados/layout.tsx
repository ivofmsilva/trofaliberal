import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

// Portal de dados: desenho neutro (cinzentos), à parte das cores do resto do site.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Dados da Trofa — Iniciativa Liberal Trofa", template: "%s · Dados da Trofa" },
  description: "Números oficiais sobre o concelho da Trofa, do INE e do Pordata, sem interpretação.",
};

const ligacoes = [
  { href: "/dados#temas", rotulo: "Indicadores" },
  { href: "/dados/contratos", rotulo: "Contratos" },
  { href: "/dados/fundos-europeus", rotulo: "Fundos europeus" },
  { href: "/dados/taxas", rotulo: "Taxas" },
  { href: "/dados/orgaos", rotulo: "Quem decide" },
  { href: "/dados/camara", rotulo: "Câmara" },
  { href: "/dados/assembleia", rotulo: "Assembleia" },
  { href: "/dados/votos", rotulo: "Como votam" },
  { href: "/dados/fontes", rotulo: "Fontes" },
];

export default function DadosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} bg-fundo text-texto`} style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <div className="border-b border-linha bg-fundo">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link href="/dados" className="shrink-0 py-3 text-base font-bold tracking-tight text-tinta">
            Dados da Trofa
          </Link>
          <nav aria-label="Dados da Trofa" className="flex min-w-0 flex-1 justify-end gap-1 overflow-x-auto py-2 text-sm font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ligacoes.map((l) => (
              <Link key={l.href} href={l.href} className="shrink-0 rounded-full px-3 py-2 text-texto hover:bg-suave hover:text-tinta">
                {l.rotulo}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
