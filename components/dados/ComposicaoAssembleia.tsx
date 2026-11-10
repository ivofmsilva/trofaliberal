import Link from "next/link";
import { Legenda, Pontos, type Bancada } from "@/components/dados/Bancadas";

const FONTE_ASSEMBLEIA = "https://mun-trofa.pt/menu/129/constituicao";

// Os lugares por bancada são os que a própria Assembleia conta nas suas votações desde dezembro de 2025
// (PSD 12 + CDS-PP 2 + PS 6 + TDT 5 + Chega 2 = 27). Dos 21 eleitos, 8 são da lista PSD/CDS-PP; os 6 presidentes de junta
// completam as 14 desta bancada (os outros grupos têm tantos lugares quanto eleitos).
const assembleia: Bancada[] = [
  { nome: "PSD/CDS-PP (Unidos pela Trofa)", cor: "#e8812e", n: 14, nota: "12 do PSD e 2 do CDS-PP" },
  { nome: "PS", cor: "#d6457a", n: 6 },
  { nome: "TDT", cor: "#2f9e6b", n: 5 },
  { nome: "Chega", cor: "#26306b", n: 2 },
];
const juntas = [
  ["Alvarelhos", "Sónia Maia"],
  ["União das freguesias de Bougado (São Martinho e Santiago)", "Jorge Campos"],
  ["União das freguesias do Coronado (São Romão e São Mamede)", "Ricardo Santos"],
  ["Covelas", "Alexandra Ferreira"],
  ["Guidões", "Joaquim Ferreira"],
  ["Muro", "José Martins"],
];

export default function ComposicaoAssembleia() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="max-w-xl text-texto">
          É o órgão deliberativo e de fiscalização: onde se votam as decisões mais importantes e se acompanha o que a Câmara faz.
          Tem 27 membros (mandato 2025–2029): 21 eleitos diretamente pelos eleitores do concelho e, por inerência de funções, os
          6 presidentes das juntas de freguesia.
        </p>
        <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-apagado">O que faz</h3>
        <ul className="mt-3 max-w-xl list-disc space-y-1.5 pl-5 text-texto marker:text-apagado">
          <li>Aprova o orçamento e as grandes opções do plano do município.</li>
          <li>
            Fixa os impostos locais, como o IMI, a participação no IRS e a derrama (veja as{" "}
            <Link href="/dados/financas#taxas" className="underline underline-offset-2 hover:text-tinta">
              taxas
            </Link>
            ).
          </li>
          <li>Aprova regulamentos municipais e autoriza empréstimos.</li>
          <li>Acompanha e fiscaliza a atividade da Câmara, que lhe presta contas em cada sessão.</li>
        </ul>
        <p className="mt-4 max-w-xl text-sm text-apagado">
          Tem cinco sessões ordinárias por ano (fevereiro, abril, junho, setembro e novembro ou dezembro), abertas ao público.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold text-tinta">Quantos lugares tem cada bancada</h3>
        <div className="mt-4">
          <Pontos bancadas={assembleia} titulo="27 lugares na Assembleia: 14 PSD/CDS-PP, 6 PS, 5 TDT, 2 Chega" />
        </div>
        <Legenda bancadas={assembleia} />
        <p className="mt-3 text-sm text-texto">
          O PSD e o CDS-PP concorreram juntos (coligação Unidos pela Trofa) e somam 14 lugares: 12 do PSD e 2 do CDS-PP. Entre os
          14 estão os 8 eleitos da lista e os 6 presidentes de junta. O PAN e o Livre integram a coligação Trofa em Primeiro,
          mas não elegeram ninguém: a bancada conta-se só como PS. Para a maioria dos 27 lugares são precisos 14.
        </p>
        <p className="mt-3 text-sm text-texto">
          A mesa é presidida por <strong className="font-semibold text-tinta">António Pontes</strong> (Unidos pela Trofa), com
          Carlos Martins e Sónia Nunes como secretários.
        </p>

        <h3 className="mt-8 text-lg font-bold text-tinta">Os 6 presidentes de junta</h3>
        <ul className="mt-3 divide-y divide-linha overflow-hidden rounded-xl border border-linha text-sm">
          {juntas.map(([freg, nome]) => (
            <li key={freg} className="flex flex-wrap items-baseline justify-between gap-x-4 px-4 py-2.5">
              <span className="text-texto">{freg}</span>
              <span className="font-medium text-tinta">{nome}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-apagado">
          Fonte:{" "}
          <a href={FONTE_ASSEMBLEIA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            Constituição da Assembleia Municipal, mandato 2025–2029 ↗
          </a>{" "}
          (21 eleitos por lista e os 6 membros por inerência). Os lugares por bancada vêm das votações da Assembleia desde
          dezembro de 2025, onde cada bancada é contada com os seus membros.
        </p>
      </div>
    </div>
  );
}
