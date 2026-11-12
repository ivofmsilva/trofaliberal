import type { Metadata } from "next";
import Link from "next/link";
import TabelaFundos from "@/components/dados/TabelaFundos";
import { dataCurta } from "@/lib/dados/formatar";
import { fundosMunicipio, type Projeto } from "@/lib/dados/transparencia";

const ultimaConclusao = (l: Projeto[]) => l.map((p) => p.data_efetiva_conclusao).filter((d): d is string => Boolean(d)).sort().pop() ?? null;

export const metadata: Metadata = { title: "Fundos europeus: projetos do Município" };

export default function Municipio() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <Link href="/dados/fundos-europeus" className="text-sm text-apagado hover:text-tinta hover:underline">
        ← Fundos europeus
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Projetos do Município</h1>
      <p className="mt-4 mb-8 max-w-2xl text-lg text-texto">
        Projetos financiados por fundos europeus em que a Câmara Municipal é a própria beneficiária. Clica num projeto
        para ver os detalhes.
      </p>
      <TabelaFundos ficheiro="fundos-municipio" mostrarBeneficiario={false} />
      <p className="mt-10 max-w-3xl text-sm text-apagado">
        Fonte: Portugal 2020 e PRR, através dos ficheiros de dados.gov.pt. O valor mostrado é o valor aprovado atribuível a este
        território (nos projetos que abrangem vários concelhos, só a parte que cabe à Trofa). O estado (“Em execução” ou
        “Concluído”) é o que a fonte regista, mesmo quando a data de conclusão já passou. Dados até: a conclusão mais recente
        registada nos ficheiros é de {dataCurta(ultimaConclusao(fundosMunicipio))}.
      </p>
    </div>
  );
}
