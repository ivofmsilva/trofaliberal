import Link from "next/link";
import { Legenda, Pontos, type Bancada } from "@/components/dados/Bancadas";

const FONTE_ASSEMBLEIA = "https://mun-trofa.pt/menu/129/constituicao";
const FONTE_POSSE = "https://mun-trofa.pt/25279/sergio-araujo-tomou-posse-como-presidente-da-camara-municipal-da-trofa";

// 27 membros: 21 eleitos (8 Unidos pela Trofa, 6 Trofa em Primeiro, 5 TDT, 2 Chega) e 6 presidentes de junta, todos eleitos pela
// coligação Unidos pela Trofa. Nomes: página "Constituição da Assembleia Municipal".
// O PSD e o CDS-PP somam 14 lugares na bancada (12 e 2, como a Assembleia conta nas suas votações); não se sabe quais são de cada partido.
const assembleia: Bancada[] = [
  {
    nome: "Unidos pela Trofa",
    cor: "#e8812e",
    n: 14,
    nota: "PSD/CDS-PP: 12 do PSD e 2 do CDS-PP",
    membros: [
      { nome: "António Pontes", cargo: "presidente da Assembleia" },
      { nome: "Carlos Martins", cargo: "1.º secretário" },
      { nome: "Sónia Nunes", cargo: "2.ª secretária" },
      { nome: "Alberto Fonseca" },
      { nome: "Maria Cardoso" },
      { nome: "Adelino Maia" },
      { nome: "Hélder Reis" },
      { nome: "Alvarim Oliveira" },
      { nome: "Sónia Maia", cargo: "presidente da junta de Alvarelhos" },
      { nome: "Jorge Campos", cargo: "presidente da junta de Bougado" },
      { nome: "Ricardo Santos", cargo: "presidente da junta de Coronado" },
      { nome: "Alexandra Ferreira", cargo: "presidente da junta de Covelas" },
      { nome: "Joaquim Ferreira", cargo: "presidente da junta de Guidões" },
      { nome: "José Martins", cargo: "presidente da junta do Muro" },
    ],
  },
  {
    nome: "Trofa em Primeiro",
    cor: "#d6457a",
    n: 6,
    nota: "PS/PAN/Livre, os 6 do PS",
    membros: [{ nome: "Mário Mourão" }, { nome: "Marco Ferreira" }, { nome: "Gracinda Rocha" }, { nome: "Carlos Araújo" }, { nome: "Bruno Soares" }, { nome: "Joana Azevedo" }],
  },
  {
    nome: "TDT (A Trofa é de Todos)",
    cor: "#2f9e6b",
    n: 5,
    membros: [{ nome: "Rui Machado" }, { nome: "Telmo Garcia" }, { nome: "Débora Silva" }, { nome: "Paulino Macedo" }, { nome: "António Branco" }],
  },
  { nome: "Chega", cor: "#26306b", n: 2, membros: [{ nome: "Sérgio Gomes" }, { nome: "Mário Maia" }] },
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
        <h3 className="text-lg font-bold text-tinta">Quantos lugares tem cada bancada e quem são</h3>
        <div className="mt-4">
          <Pontos bancadas={assembleia} titulo="27 lugares na Assembleia: 14 Unidos pela Trofa, 6 Trofa em Primeiro, 5 TDT, 2 Chega" />
        </div>
        <Legenda bancadas={assembleia} />
        <p className="mt-3 text-sm text-texto">
          A coligação Unidos pela Trofa (PSD e CDS-PP) tem 14 lugares: os 8 eleitos da lista e os 6 presidentes de junta. O
          PAN e o Livre integram a coligação Trofa em Primeiro, mas não elegeram ninguém. Para a maioria dos 27 lugares
          são precisos 14. Os nomes aparecem pelo primeiro e último.
        </p>
        <p className="mt-2 text-sm text-apagado">
          Fontes:{" "}
          <a href={FONTE_ASSEMBLEIA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            Constituição da Assembleia Municipal, mandato 2025–2029 ↗
          </a>{" "}
          (eleitos por lista e membros por inerência) e a{" "}
          <a href={FONTE_POSSE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
            tomada de posse (24 de outubro de 2025) ↗
          </a>
          . A divisão de 12 do PSD e 2 do CDS-PP vem das votações da Assembleia; não está publicado quais dos 14 são de cada partido.
        </p>
      </div>
    </div>
  );
}
