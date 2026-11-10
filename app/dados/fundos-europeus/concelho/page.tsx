import type { Metadata } from "next";
import Link from "next/link";
import TabelaFundos from "@/components/dados/TabelaFundos";

export const metadata: Metadata = { title: "Fundos europeus: projetos no concelho" };

export default function Concelho() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <Link href="/dados/fundos-europeus" className="text-sm text-apagado hover:text-tinta hover:underline">
        ← Fundos europeus
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Projetos no concelho</h1>
      <p className="mt-4 mb-8 max-w-2xl text-lg text-texto">
        Todos os projetos financiados por fundos europeus com execução localizada na Trofa: câmara, empresas e
        associações. Para ver só o dinheiro gerido diretamente pelo Município, vê os{" "}
        <Link href="/dados/fundos-europeus/municipio" className="font-semibold text-tinta underline underline-offset-2">
          projetos do Município
        </Link>
        .
      </p>
      <TabelaFundos ficheiro="fundos-concelho" mostrarBeneficiario />
    </div>
  );
}
