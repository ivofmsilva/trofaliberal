import Link from "next/link";
import Grafico from "@/components/dados/Grafico";
import { dataCurta, derrama, imi, imiFamiliar, irs, pc, textoVoto } from "@/lib/dados/taxas";

const ultimo = <T,>(l: T[], ok: (x: T) => boolean) => [...l].reverse().find(ok);

// Participação no IRS que falta no texto das deliberações, tirada da consulta oficial do Portal das Finanças ("Taxa de
// Participação no IRS dos Municípios", lida a 20/11/2026). Cada deliberação vale para os rendimentos do ano seguinte; de
// 2018 a 2025 a taxa da deliberação é sempre a que foi comunicada às Finanças nesse ano. Até 2017 a taxa estava num anexo;
// a deliberação de 3/12/2020 diz 0,48% por engano (retificada a 19/01/2021) e a taxa comunicada foi 4,8%.
const FINANCAS = "https://www.portaldasfinancas.gov.pt/pt/consultarTaxasIRSMunicipiosForm.action";
const IRS_FINANCAS: Record<string, number> = { "2015-09-24": 5, "2016-09-30": 5, "2017-11-23": 5, "2020-12-03": 4.8 };
// IMI de 2015 a 2017: o texto da deliberação não traz a taxa (está num anexo) e a consulta das Finanças por município exige
// autenticação. Valores das listas de taxas de IMI publicadas pelo economiafinancas.com a partir das da Autoridade Tributária
// (lidas a 21/11/2026; a de 2016 bate com o que se disse na sessão da Assembleia de 30/09/2016).
const IMI_LISTAS: Record<string, { urbanos: number; rusticos: number; url: string }> = {
  "2015-09-24": { urbanos: 0.5, rusticos: 0.8, url: "https://economiafinancas.com/2016/taxas-de-imi-por-municipio-para-o-ano-2015/" },
  "2016-09-30": { urbanos: 0.45, rusticos: 0.8, url: "https://economiafinancas.com/2016/taxas-de-imi-por-municipio-a-pagar-em-2017/" },
  "2017-11-23": { urbanos: 0.45, rusticos: 0.8, url: "https://economiafinancas.com/2018/taxas-imi-municipio-pagar-2018/" },
};
const imiUrbanos = (x: { sessao: string; urbanos: number | null }) => x.urbanos ?? IMI_LISTAS[x.sessao]?.urbanos ?? null;
const imiRusticos = (x: { sessao: string; rusticos: number | null }) => x.rusticos ?? IMI_LISTAS[x.sessao]?.rusticos ?? null;

// IMI familiar em texto: os anos seguidos com os mesmos valores juntam-se ("de 2021 a 2024, 20 €, 40 € e 70 €").
function textoIMIFamiliar() {
  const l = imiFamiliar.filter((x) => !x.retificacao).sort((a, b) => a.paraAno - b.paraAno);
  // Anos em que a deliberação foi depois retificada e o texto publicado da retificação não traz os valores (IMI pago em
  // 2024: deliberação de 15/12/2023 com 20/40/70 €, retificada na Câmara a 28/12/2023 e na Assembleia a 02/02/2024).
  const retificados = new Set(imiFamiliar.filter((x) => x.retificacao && x.um === null).map((x) => x.paraAno));
  const grupos: { de: number; ate: number; v: [number, number, number] | null; retificado?: boolean }[] = [];
  for (const x of l) {
    const v: [number, number, number] | null = x.um !== null && x.dois !== null && x.tres !== null ? [x.um, x.dois, x.tres] : null;
    const g = grupos[grupos.length - 1];
    if (retificados.has(x.paraAno)) grupos.push({ de: x.paraAno, ate: x.paraAno, v, retificado: true });
    else if (g && v && g.v && !g.retificado && g.ate === x.paraAno - 1 && g.v.join() === v.join()) g.ate = x.paraAno;
    else grupos.push({ de: x.paraAno, ate: x.paraAno, v });
  }
  const anos = (g: { de: number; ate: number }) => (g.de === g.ate ? `em ${g.de}` : g.ate === g.de + 1 ? `em ${g.de} e ${g.ate}` : `de ${g.de} a ${g.ate}`);
  const partes = grupos.map((g, k) =>
    g.retificado
      ? `${anos(g)}, a deliberação diz ${g.v ? `${g.v[0]} €, ${g.v[1]} € e ${g.v[2]} €` : "os valores"}, mas foi retificada e o texto publicado da retificação não diz os valores`
      : g.v
        ? k === grupos.findIndex((x) => x.v)
          ? `${anos(g)}, ${g.v[0]} € com 1 dependente, ${g.v[1]} € com 2 e ${g.v[2]} € com 3 ou mais`
          : `${anos(g)}, ${g.v[0]} €, ${g.v[1]} € e ${g.v[2]} €`
        : `${anos(g)} (o texto da deliberação não diz os valores)`,
  );
  // anos sem deliberação entre o primeiro e o último
  const falta: number[] = [];
  for (let a = l[0]?.paraAno ?? 0; a <= (l[l.length - 1]?.paraAno ?? 0); a++) if (!l.some((x) => x.paraAno === a)) falta.push(a);
  // depois do intervalo sem deliberações: foram todas por unanimidade?
  const depois = falta.length ? l.filter((x) => x.paraAno > falta[falta.length - 1]) : l;
  const unanimesDesde = depois.length > 0 && depois.every((x) => x.tipo === "unanimidade") ? depois[0].sessao : null;
  return { partes, falta, unanimesDesde };
}

const taxaIRS = (x: { sessao: string; percentagem: number | null }) =>
  IRS_FINANCAS[x.sessao] ?? (x.percentagem !== null && x.percentagem >= 1 ? x.percentagem : null);

export default function TaxasLocais() {
  const imiAtual = ultimo(imi, (x) => x.urbanos !== null)!;
  const irsAtual = ultimo(irs, (x) => x.percentagem !== null && !x.retificacao)!;
  const derramaAtual = ultimo(derrama, (x) => x.normal !== null)!;

  // Os três gráficos têm no eixo o ano em que a taxa se aplica, que é sempre o ano a seguir ao da deliberação:
  //  - IMI: a deliberação diz "para o ano N+1" (o IMI pago nesse ano);
  //  - IRS: a taxa é a dos rendimentos de N+1 (consulta do Portal das Finanças);
  //  - derrama: incide sobre os lucros de N e paga-se em N+1 (Lei 73/2013: comunicada até 31 de dezembro do ano anterior ao da cobrança).
  const seguinte = (sessao: string) => String(Number(sessao.slice(0, 4)) + 1);
  const imiComTaxa = imi.filter((x) => imiUrbanos(x) !== null);
  const imiAnos = imiComTaxa.map((x) => String(x.paraAno));
  const ultimaSessao = [...imi, ...irs, ...derrama].map((x) => x.sessao).sort().pop()!;
  const irsComTaxa = irs.filter((x) => !x.retificacao && taxaIRS(x) !== null);
  const irsAnos = irsComTaxa.map((x) => seguinte(x.sessao));
  const derramaComTaxa = derrama.filter((x) => x.normal !== null);
  const derramaAnos = derramaComTaxa.map((x) => seguinte(x.sessao));

  return (
    <>
      <div>
        <h2 id="taxas" className="scroll-mt-24 text-2xl font-bold tracking-tight text-tinta">
          Taxas e impostos locais
        </h2>
        <p className="mt-2 max-w-2xl text-texto">
          Todos os anos, em geral no fim do ano, a Assembleia Municipal fixa o IMI, a parte do IRS que fica no município e a derrama.
          Aqui estão as deliberações desde 2015 e como foi votada cada uma. Nas de 2015 a 2017, o texto não diz a taxa da derrama.
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
              <dd className="text-sm text-apagado">rendimentos de {seguinte(irsAtual.sessao)}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Derrama</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(derramaAtual.normal, 1)}</dd>
              <dd className="text-sm text-apagado">paga em {seguinte(derramaAtual.sessao)}; reduzida: {pc(derramaAtual.reduzida)}</dd>
            </div>
          </dl>
      </div>

      <div className="space-y-14">
        <section aria-label="IMI" id="taxa-imi" className="scroll-mt-24">
          <h3 className="text-xl font-bold tracking-tight text-tinta">IMI: Imposto Municipal sobre Imóveis</h3>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            A taxa dos prédios urbanos que a Assembleia fixou em cada ano, para valer no ano seguinte. A dos prédios rústicos
            é 0,8% em todos os anos em que o valor consta.
          </p>
          <div className="max-w-3xl">
            <Grafico periodos={imiAnos} series={[{ nome: "Prédios urbanos", valores: imiComTaxa.map((x) => imiUrbanos(x)) }]} unidade="%" semComparar casas={2} />
            <p className="mt-2 text-xs text-apagado">No eixo, o ano em que se paga o IMI com essa taxa (a decidida em {Number(imiAtual.paraAno) - 1} é a do IMI pago em {imiAtual.paraAno}).</p>
          </div>
          <Tabela
            colunas={["Deliberação", "Para o ano", "Urbanos", "Rústicos", "Votação"]}
            linhas={[...imi].reverse().map((x) => [
              <a key="u" href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {dataCurta(x.sessao)} ↗
              </a>,
              String(x.paraAno),
              IMI_LISTAS[x.sessao] && x.urbanos === null ? `${pc(imiUrbanos(x))} †` : pc(x.urbanos),
              IMI_LISTAS[x.sessao] && x.rusticos === null ? `${pc(imiRusticos(x), 1)} †` : pc(x.rusticos, 1),
              textoVoto(x, x.sessao),
            ])}
          >
          <p className="mt-2 max-w-3xl text-sm text-apagado">
            † Até 2017 o texto da deliberação não diz a taxa (está num anexo). Valor das listas de taxas de IMI publicadas a partir
            das da Autoridade Tributária ({Object.entries(IMI_LISTAS).map(([sessao, l], k) => (
              <span key={sessao}>
                {k > 0 ? ", " : ""}
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                  {Number(sessao.slice(0, 4)) + 1} ↗
                </a>
              </span>
            ))}).
          </p>
          </Tabela>
          {imiFamiliar.length > 0 &&
            (() => {
              const { partes, falta, unanimesDesde } = textoIMIFamiliar();
              return (
                <div className="mt-8 max-w-3xl">
                  <h4 className="font-bold text-tinta">IMI familiar (redução por dependentes)</h4>
                  <p className="mt-2 text-texto">
                    A Assembleia aprovou uma redução do IMI para as famílias com dependentes, no IMI pago {partes.join("; ")}.
                    {falta.length > 0 && ` Nas deliberações publicadas não há esta redução para o IMI pago de ${falta[0]} a ${falta[falta.length - 1]}.`}
                    {unanimesDesde && ` Desde a deliberação de ${dataCurta(unanimesDesde)}, foi sempre aprovada por unanimidade.`}
                  </p>
                  <p className="mt-2 text-sm text-apagado">
                    Deliberações:{" "}
                    {imiFamiliar.map((x, k) => (
                      <span key={x.sessao}>
                        {k > 0 ? " · " : ""}
                        <a href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                          {dataCurta(x.sessao)}
                          {x.retificacao ? " (retificação)" : ""} ↗
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              );
            })()}
        </section>

        <section aria-label="IRS" id="taxa-irs" className="scroll-mt-24">
          <h3 className="text-xl font-bold tracking-tight text-tinta">Participação variável no IRS</h3>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            A parte do IRS dos residentes que fica para o município (até 5%). O que o município não fica é devolvido aos contribuintes.
          </p>
          <div className="max-w-3xl">
            <Grafico
              periodos={irsAnos}
              series={[{ nome: "Participação no IRS", valores: irsComTaxa.map((x) => taxaIRS(x)) }]}
              unidade="%"
              semComparar
              casas={1}
            />
            <p className="mt-2 text-xs text-apagado">No eixo, o ano dos rendimentos a que a taxa se aplica (a decidida no fim de um ano vale para os rendimentos do ano seguinte).</p>
          </div>
          <Tabela
            colunas={["Deliberação", "Rendimentos de", "Percentagem", "Votação"]}
            linhas={[...irs].reverse().map((x) => [
              <a key="u" href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {dataCurta(x.sessao)} ↗{x.retificacao ? " (retificação)" : ""}
              </a>,
              x.retificacao ? "—" : seguinte(x.sessao),
              x.retificacao ? "—" : IRS_FINANCAS[x.sessao] !== undefined ? `${pc(IRS_FINANCAS[x.sessao], 1)} *` : pc(x.percentagem, 1),
              textoVoto(x, x.sessao),
            ])}
          >
          <p className="mt-2 max-w-3xl text-sm text-apagado">
            * Valor da{" "}
            <a href={FINANCAS} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
              consulta do Portal das Finanças ↗
            </a>{" "}
            (taxa comunicada às Finanças para esse ano de rendimentos). Até 2017 a taxa não está no texto da deliberação; a de 3 de
            dezembro de 2020 diz 0,48% e foi retificada a 19 de janeiro de 2021.
          </p>
          </Tabela>
        </section>

        <section aria-label="Derrama" id="taxa-derrama" className="scroll-mt-24">
          <h3 className="text-xl font-bold tracking-tight text-tinta">Derrama</h3>
          <p className="mt-2 mb-6 max-w-2xl text-texto">
            Imposto municipal sobre o lucro tributável das empresas, na parte gerada no concelho. Há uma taxa normal e, na derrama paga desde 2021, uma reduzida para as
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
            <p className="mt-2 text-xs text-apagado">No eixo, o ano em que se paga (a derrama incide sobre os lucros do ano anterior, o da deliberação).</p>
          </div>
          <Tabela
            colunas={["Deliberação", "Paga em", "Normal", "Reduzida", "Votação"]}
            linhas={[...derrama].reverse().map((x) => [
              <a key="u" href={x.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {dataCurta(x.sessao)} ↗
              </a>,
              seguinte(x.sessao),
              pc(x.normal, 1),
              pc(x.reduzida),
              textoVoto(x.votoNormal, x.sessao),
            ])}
          />
        </section>

        <p className="max-w-3xl text-sm text-apagado">
          Fonte: deliberações da Assembleia Municipal da Trofa (mun-trofa.pt), lidas ponto a ponto, com a votação tal como
          está no documento. Dados até à deliberação de {dataCurta(ultimaSessao)}. Cada ligação abre o PDF original. Nos anos
          antigos em que a deliberação não diz a taxa do IMI ou do IRS, o valor vem de outra fonte, indicada por baixo das
          deliberações. A taxa da derrama reduzida aplica-se, segundo o texto, a quem
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

// Fechada por defeito, para a página não ficar enorme; as notas (* e †) vão dentro, junto da tabela a que se referem.
function Tabela({ colunas, linhas, children }: { colunas: string[]; linhas: React.ReactNode[][]; children?: React.ReactNode }) {
  return (
    <details className="mt-6">
    <summary className="cursor-pointer text-sm font-medium text-tinta hover:underline">Ver as deliberações e as votações</summary>
    <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
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
    {children}
    </details>
  );
}
