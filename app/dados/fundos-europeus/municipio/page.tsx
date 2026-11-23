import type { Metadata } from "next";
import Link from "next/link";
import FonteFundos from "@/components/dados/FonteFundos";
import TabelaFundos from "@/components/dados/TabelaFundos";
import { fundosMunicipio } from "@/lib/dados/transparencia";

export const metadata: Metadata = {
  title: "Fundos europeus: projetos do Município",
  description: "Os projetos da Câmara Municipal da Trofa com fundos europeus: valores, estado e fonte de cada projeto.",
};

export default function Municipio() {
  return (
    <>
      <section className="topo-escuro">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <Link href="/dados/fundos-europeus" className="text-sm text-apagado hover:text-tinta hover:underline">
            ← Fundos europeus
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Projetos do Município</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Projetos financiados por fundos europeus em que a Câmara Municipal é a própria beneficiária. Clica num projeto
            para ver os detalhes.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <TabelaFundos ficheiro="fundos-municipio" mostrarBeneficiario={false} />
      <FonteFundos lista={fundosMunicipio} />
      </div>
    </>
  );
}
