import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quem decide: Câmara e Assembleia",
  description: "Quem faz parte da Câmara e da Assembleia Municipal da Trofa no mandato 2025–2029, quantos lugares tem cada bancada e o que cada órgão faz.",
};

const FONTE_ASSEMBLEIA = "https://mun-trofa.pt/menu/129/constituicao";
const FONTE_CAMARA =
  "https://mun-trofa.pt/upload_files/1/1/Munic%C3%ADpio/C%C3%A2mara%20Municipal/Reuni%C3%B5es%20de%20C%C3%A2mara/deliberacoes/2025/Deliberacoes_Ata_25_2025_29_outubro.pdf";

type Bancada = { nome: string; cor: string; n: number; nota?: string };

// Assembleia: os lugares por bancada são os que a própria Assembleia conta nas suas votações desde dezembro de 2025
// (PSD 12 + CDS-PP 2 + PS 6 + TDT 5 + Chega 2 = 27). Dos 21 eleitos, 8 são da lista PSD/CDS-PP; os 6 presidentes de junta
// completam as 14 desta bancada (os outros grupos têm tantos lugares quanto eleitos).
const assembleia: Bancada[] = [
  { nome: "PSD", cor: "#e8812e", n: 12 },
  { nome: "CDS-PP", cor: "#2b7bbf", n: 2 },
  { nome: "PS", cor: "#d6457a", n: 6 },
  { nome: "TDT", cor: "#2f9e6b", n: 5 },
  { nome: "Chega", cor: "#26306b", n: 2 },
];
const juntas = [
  ["Alvarelhos", "Sónia Vanessa Vieira Maia"],
  ["União das freguesias de Bougado (São Martinho e Santiago)", "Jorge Rodrigues Campos"],
  ["União das freguesias do Coronado (São Romão e São Mamede)", "Ricardo Augusto Oliveira dos Santos"],
  ["Covelas", "Alexandra Filipa Campos Ferreira"],
  ["Guidões", "Joaquim Fernando Maia Ferreira"],
  ["Muro", "José Fernando da Costa Martins"],
];
// Câmara: 7 lugares (presidente + 6 vereadores), como a própria Câmara descreve a votação de 29 de outubro de 2025.
const camara: Bancada[] = [
  { nome: "Unidos pela Trofa (PSD/CDS-PP)", cor: "#e8812e", n: 3 },
  { nome: "Trofa em Primeiro (PS/PAN/L)", cor: "#d6457a", n: 2 },
  { nome: "TDT (A Trofa é de Todos)", cor: "#2f9e6b", n: 2 },
];

function Pontos({ bancadas, titulo }: { bancadas: Bancada[]; titulo: string }) {
  return (
    <div role="img" aria-label={titulo} className="flex flex-wrap gap-x-4 gap-y-3">
      {bancadas.map((b) => (
        <span key={b.nome} className="inline-flex gap-1.5">
          {Array.from({ length: b.n }).map((_, i) => (
            <span key={i} className="h-5 w-5 rounded-full" style={{ backgroundColor: b.cor }} />
          ))}
        </span>
      ))}
    </div>
  );
}

function Legenda({ bancadas }: { bancadas: Bancada[] }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-linha">
      <table className="w-full text-sm">
        <tbody>
          {bancadas.map((b) => (
            <tr key={b.nome} className="border-t border-linha first:border-t-0">
              <th scope="row" className="px-4 py-3 text-left font-medium text-tinta">
                <span className="mr-3 inline-block h-3.5 w-3.5 rounded-full align-[-2px]" style={{ backgroundColor: b.cor }} />
                {b.nome}
              </th>
              <td className="px-4 py-3 text-right text-lg font-bold tabular-nums text-tinta">{b.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Orgaos() {
  return (
    <>
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Autarquia</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Quem decide</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Duas casas tomam as decisões do município. A Câmara Municipal governa o dia a dia; a Assembleia Municipal aprova
            o essencial e fiscaliza a Câmara. Esta é a composição de cada uma no mandato 2025–2029, eleito a 12 de outubro de
            2025.
          </p>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-8">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Câmara Municipal</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">7</dd>
              <dd className="text-sm text-apagado">membros: o presidente e 6 vereadores</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Assembleia Municipal</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">27</dd>
              <dd className="text-sm text-apagado">membros: 21 eleitos e 6 presidentes de junta</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6">
        <section aria-label="Câmara Municipal" className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-tinta">Câmara Municipal</h2>
            <p className="mt-2 max-w-xl text-texto">
              É o órgão executivo: põe em prática as decisões e gere o município. Tem 7 membros, eleitos de quatro em quatro
              anos. O cabeça de lista da lista mais votada é o presidente, e os restantes eleitos são os vereadores.
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-apagado">O que faz</h3>
            <ul className="mt-3 max-w-xl list-disc space-y-1.5 pl-5 text-texto marker:text-apagado">
              <li>Prepara o orçamento e o plano do município e propõe-nos à Assembleia.</li>
              <li>Executa o que a Assembleia aprova.</li>
              <li>Decide obras, urbanismo e licenciamentos, ação social, educação, cultura e desporto.</li>
              <li>
                Faz as compras e contratos públicos do município (veja os{" "}
                <Link href="/dados/contratos" className="underline underline-offset-2 hover:text-tinta">
                  contratos
                </Link>
                ).
              </li>
              <li>O presidente pode entregar áreas (pelouros) a vereadores, mas todos os 7 votam nas reuniões.</li>
            </ul>
            <p className="mt-4 max-w-xl text-sm text-apagado">
              Reúne de quinze em quinze dias, em reunião pública, e as deliberações ficam publicadas.{" "}
              <Link href="/dados/camara" className="underline underline-offset-2 hover:text-tinta">
                Ver deliberações da Câmara
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-tinta">Quantos lugares tem cada lista</h3>
            <div className="mt-4">
              <Pontos bancadas={camara} titulo="7 lugares na Câmara: 3 Unidos pela Trofa, 2 Trofa em Primeiro, 2 TDT" />
            </div>
            <Legenda bancadas={camara} />
            <p className="mt-3 text-sm text-texto">
              Presidente: <strong className="font-semibold text-tinta">Sérgio Araújo</strong>, da lista Unidos pela Trofa.
              Nenhuma lista tem sozinha a maioria dos 7 votos (são precisos 4).
            </p>
            <p className="mt-2 text-sm text-apagado">
              Fonte:{" "}
              <a href={FONTE_CAMARA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                deliberações da primeira reunião do mandato (29 de outubro de 2025) ↗
              </a>
              , que descreve os votos de cada lista. Os nomes dos vereadores estão em{" "}
              <a href="https://mun-trofa.pt/menu/80/vereacao" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                mun-trofa.pt ↗
              </a>
              .
            </p>
          </div>
        </section>

        <section aria-label="Assembleia Municipal" className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-tinta">Assembleia Municipal</h2>
            <p className="mt-2 max-w-xl text-texto">
              É o órgão deliberativo e de fiscalização: onde se votam as decisões mais importantes e se acompanha o que a
              Câmara faz. É composta por membros eleitos diretamente pelos eleitores do concelho e, por inerência de funções,
              pelos presidentes das juntas de freguesia. Os eleitos têm de ser sempre mais do que os presidentes de junta.
            </p>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-apagado">O que faz</h3>
            <ul className="mt-3 max-w-xl list-disc space-y-1.5 pl-5 text-texto marker:text-apagado">
              <li>Aprova o orçamento e as grandes opções do plano do município.</li>
              <li>
                Fixa os impostos locais, como o IMI, a participação no IRS e a derrama (veja as{" "}
                <Link href="/dados/taxas" className="underline underline-offset-2 hover:text-tinta">
                  taxas
                </Link>
                ).
              </li>
              <li>Aprova regulamentos municipais e autoriza empréstimos.</li>
              <li>Acompanha e fiscaliza a atividade da Câmara, que lhe presta contas em cada sessão.</li>
            </ul>
            <p className="mt-4 max-w-xl text-sm text-apagado">
              Tem cinco sessões ordinárias por ano (fevereiro, abril, junho, setembro e novembro ou dezembro), abertas ao
              público.{" "}
              <Link href="/dados/assembleia" className="underline underline-offset-2 hover:text-tinta">
                Ver deliberações da Assembleia
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-tinta">Quantos lugares tem cada bancada</h3>
            <div className="mt-4">
              <Pontos bancadas={assembleia} titulo="27 lugares na Assembleia: 12 PSD, 2 CDS-PP, 6 PS, 5 TDT, 2 Chega" />
            </div>
            <Legenda bancadas={assembleia} />
            <p className="mt-3 text-sm text-texto">
              O PSD e o CDS-PP concorreram juntos (coligação Unidos pela Trofa) e votam como uma só bancada: 14 lugares. São
              os 8 eleitos da lista mais os 6 presidentes de junta. O PAN e o Livre integram a coligação Trofa em Primeiro,
              mas não elegeram ninguém: a bancada conta-se só como PS. Para a maioria dos 27 lugares são precisos 14.
            </p>
            <p className="mt-3 text-sm text-texto">
              A mesa é presidida por <strong className="font-semibold text-tinta">António Rodrigues da Costa Pontes</strong>{" "}
              (Unidos pela Trofa), com Carlos Alberto de Sá Martins e Sónia Cristina Sousa Nunes como secretários.
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
              dezembro de 2025, onde cada bancada é contada com os seus membros.{" "}
              <Link href="/dados/assembleia" className="underline underline-offset-2 hover:text-tinta">
                Ver as deliberações ↗
              </Link>
            </p>
          </div>
        </section>

        <p className="max-w-3xl text-sm text-apagado">
          Para ver como cada lista votou, abra{" "}
          <Link href="/dados/votos" className="underline underline-offset-2 hover:text-tinta">
            Como votam
          </Link>
          . Os números são os da instalação dos órgãos, em outubro e novembro de 2025.
        </p>
      </div>
    </>
  );
}
