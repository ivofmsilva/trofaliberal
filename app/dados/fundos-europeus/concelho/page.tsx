import type { Metadata } from "next";
import Link from "next/link";
import TabelaFundos from "@/components/dados/TabelaFundos";
import { dataCurta } from "@/lib/dados/formatar";
import { fundosConcelho, type Projeto } from "@/lib/dados/transparencia";

const ultimaConclusao = (l: Projeto[]) => l.map((p) => p.data_efetiva_conclusao).filter((d): d is string => Boolean(d)).sort().pop() ?? null;

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
      <p className="mt-10 max-w-3xl text-sm text-apagado">
        Fonte: Portugal 2020 e PRR, através dos ficheiros de dados.gov.pt. O valor mostrado é o valor aprovado atribuível a este
        território (nos projetos que abrangem vários concelhos, só a parte que cabe à Trofa). O estado (“Em execução” ou
        “Concluído”) é o que a fonte regista, mesmo quando a data de conclusão já passou. Dados até: a conclusão mais recente
        registada nos ficheiros é de {dataCurta(ultimaConclusao(fundosConcelho))}.
      </p>
    </div>
  );
}
