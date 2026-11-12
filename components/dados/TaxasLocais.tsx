import Link from "next/link";
import Grafico from "@/components/dados/Grafico";
import { dataCurta, derrama, imi, irs, pc, textoVoto } from "@/lib/dados/taxas";

const ultimo = <T,>(l: T[], ok: (x: T) => boolean) => [...l].reverse().find(ok);

export default function TaxasLocais() {
  const imiAtual = ultimo(imi, (x) => x.urbanos !== null)!;
  const irsAtual = ultimo(irs, (x) => x.percentagem !== null && !x.retificacao)!;
  const derramaAtual = ultimo(derrama, (x) => x.normal !== null)!;

  // Os três gráficos têm no eixo o ano em que a Assembleia decidiu (o IMI vale para o ano seguinte: coluna "Para o ano").
  const imiComTaxa = imi.filter((x) => x.urbanos !== null);
  const imiAnos = imiComTaxa.map((x) => x.sessao.slice(0, 4));
  const ultimaSessao = [...imi, ...irs, ...derrama].map((x) => x.sessao).sort().pop()!;
  // IRS: a deliberação de 2020 diz 0,48% (uma gralha, retificada em janeiro de 2021): fica fora do gráfico.
  const irsAnoOk = irs.filter((x) => x.percentagem !== null && !x.retificacao && x.percentagem >= 1);
  const irsAnos = [...new Set(irs.filter((x) => !x.retificacao && x.percentagem !== null).map((x) => x.sessao.slice(0, 4)))];
  const derramaComTaxa = derrama.filter((x) => x.normal !== null);
  const derramaAnos = derramaComTaxa.map((x) => x.sessao.slice(0, 4));

  return (
    <>
      <div>
        <h2 id="taxas" className="scroll-mt-24 text-2xl font-bold tracking-tight text-tinta">
          Taxas e impostos locais
        </h2>
        <p className="mt-2 max-w-2xl text-texto">
          Todos os anos, no fim do ano, a Assembleia Municipal fixa o IMI, a parte do IRS que fica no município e a derrama.
          Aqui está o que foi decidido desde 2015 e como foi votada cada deliberação.
        </p>
        <dl className="mt-6 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">IMI, prédios urbanos</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(imiAtual.urbanos)}</dd>
              <dd className="text-sm text-apagado">para {imiAtual.paraAno}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">IMI, prédios rústicos</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(imiAtual.rusticos, 1)}</dd>
              <dd className="text-sm text-apagado">para {imiAtual.paraAno}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Participação no IRS</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(irsAtual.percentagem, 1)}</dd>
              <dd className="text-sm text-apagado">fixada em {dataCurta(irsAtual.sessao).split(" de ").slice(1).join(" de ")}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Derrama</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(derramaAtual.normal, 1)}</dd>
              <dd className="text-sm text-apagado">reduzida: {pc(derramaAtual.reduzida)}</dd>
            </div>
          </dl>
      </div>

      <div className="space-y-14">
        <section aria-label="IMI">
          <h3 className="text-xl font-bold tracking-tight text-tinta">IMI: Imposto Municipal sobre Imóveis</h3>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            A taxa dos prédios urbanos que a Assembleia fixou em cada ano, para valer no ano seguinte. A dos prédios rústicos
            é 0,8% em todos os anos em que o valor consta.
          </p>
          <div className="max-w-3xl">
            <Grafico periodos={imiAnos} series={[{ nome: "Prédios urbanos", valores: imiComTaxa.map((x) => x.urbanos) }]} unidade="%" semComparar casas={2} />
            <p className="mt-2 text-xs text-apagado">No eixo, o ano da deliberação (a taxa decidida em {imiAnos[imiAnos.length - 1]} é a de {imiAtual.paraAno}).</p>
          </div>
          <Tabela
            colunas={["Deliberação", "Para o ano", "Urbanos", "Rústicos", "Votação"]}
            linhas={[...imi].reverse().map((x) => [
              <a key="u" href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {dataCurta(x.sessao)} ↗
              </a>,
              String(x.paraAno),
              pc(x.urbanos),
              pc(x.rusticos, 1),
              textoVoto(x, x.sessao),
            ])}
          />
          <p className="mt-2 text-sm text-apagado">Até 2018 o texto da deliberação não diz a taxa (está num anexo): só se mostra a votação.</p>
        </section>

        <section aria-label="IRS">
          <h3 className="text-xl font-bold tracking-tight text-tinta">Participação variável no IRS</h3>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            A percentagem do IRS dos residentes que o município fica a receber (o resto vai para o Estado).
          </p>
          <div className="max-w-3xl">
            <Grafico
              periodos={irsAnos}
              series={[{ nome: "Participação no IRS", valores: irsAnos.map((a) => irsAnoOk.find((x) => x.sessao.startsWith(a))?.percentagem ?? null) }]}
              unidade="%"
              semComparar
              casas={1}
            />
            <p className="mt-2 text-xs text-apagado">No eixo, o ano da deliberação.</p>
          </div>
          <Tabela
            colunas={["Deliberação", "Percentagem", "Votação"]}
            linhas={[...irs].reverse().map((x) => [
              <a key="u" href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {dataCurta(x.sessao)} ↗{x.retificacao ? " (retificação)" : ""}
              </a>,
              x.retificacao ? "—" : x.percentagem !== null && x.percentagem < 1 ? `${pc(x.percentagem)} *` : pc(x.percentagem, 1),
              textoVoto(x, x.sessao),
            ])}
          />
          <p className="mt-2 max-w-3xl text-sm text-apagado">
            * O texto da deliberação de 3 de dezembro de 2020 diz 0,48%. A Assembleia retificou essa deliberação em 19 de
            janeiro de 2021 (o texto da retificação não repete o valor), por isso a linha fica fora do gráfico.
          </p>
        </section>

        <section aria-label="Derrama">
          <h3 className="text-xl font-bold tracking-tight text-tinta">Derrama</h3>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            Imposto sobre o lucro das empresas com sede no concelho. Há uma taxa normal e, desde 2020, uma reduzida para as
            empresas com menor volume de negócios.
          </p>
          <div className="max-w-3xl">
            <Grafico
              periodos={derramaAnos}
              series={[
                { nome: "Taxa normal", valores: derramaComTaxa.map((x) => x.normal) },
                { nome: "Taxa reduzida", valores: derramaComTaxa.map((x) => x.reduzida) },
              ]}
              unidade="%"
              semComparar
              casas={2}
            />
            <p className="mt-2 text-xs text-apagado">No eixo, o ano da deliberação.</p>
          </div>
          <Tabela
            colunas={["Deliberação", "Normal", "Reduzida", "Votação"]}
            linhas={[...derrama].reverse().map((x) => [
              <a key="u" href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {dataCurta(x.sessao)} ↗
              </a>,
              pc(x.normal, 1),
              pc(x.reduzida),
              textoVoto(x.votoNormal, x.sessao),
            ])}
          />
        </section>

        <p className="max-w-3xl text-sm text-apagado">
          Fonte: deliberações da Assembleia Municipal da Trofa (mun-trofa.pt), lidas ponto a ponto, com a votação tal como
          está no documento. Dados até à deliberação de {dataCurta(ultimaSessao)}. Cada ligação abre o PDF original. A taxa da derrama reduzida aplica-se, segundo o texto, a quem
          tem um volume de negócios abaixo de um limite fixado em cada deliberação. Nas votações do mandato atual (desde
          outubro de 2025) os grupos aparecem pelo nome da lista: Unidos pela Trofa (PSD e CDS-PP) e Trofa em Primeiro (PS, PAN
          e Livre).{" "}
          <Link href="/dados/assembleia" className="underline underline-offset-2 hover:text-tinta">
            Ver todas as votações da Assembleia
          </Link>
          .
        </p>
      </div>
    </>
  );
}

function Tabela({ colunas, linhas }: { colunas: string[]; linhas: React.ReactNode[][] }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-linha">
      <table className="w-full text-sm">
        <thead className="bg-cinza text-left text-apagado">
          <tr>
            {colunas.map((c) => (
              <th key={c} scope="col" className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i} className="border-t border-linha align-top">
              {l.map((c, k) => (
                <td key={k} className={`px-4 py-2.5 ${k === 0 ? "font-medium text-tinta" : "tabular-nums text-texto"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
