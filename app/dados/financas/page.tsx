import type { Metadata } from "next";
import Grafico from "@/components/dados/Grafico";
import ImpostosMunicipais from "@/components/dados/ImpostosMunicipais";
import TaxasLocais from "@/components/dados/TaxasLocais";
import { compacto, milhoes, numero } from "@/lib/dados/formatar";
import {
  ANOS,
  FONTE_ORCAMENTO,
  RELATORIOS,
  comparacaoReceitas,
  porHabitante,
  crescimento,
  primeiroAno,
  valorEm,
  dividaEfetiva,
  dividaTotal,
  despesaBensServicos,
  despesaCorrente,
  despesaPessoalPaga,
  gastosFse,
  gastosPessoal,
  impostosDiretos,
  orcamento,
  pesoPessoal,
  receitaCorrente,
  receitaTotal,
  transferenciasCorrentes,
  receitaPorImposto,
  type SerieContas,
} from "@/lib/dados/financas";

export const metadata: Metadata = {
  title: "Finanças do município",
  description: "Receitas, despesas, dívida, orçamento e impostos locais da Câmara Municipal da Trofa, desde 2010 e para 2026, com base nos relatórios de gestão e contas do município e no INE.",
};

const ultimo = (s: SerieContas) => s.valores[s.valores.length - 1];
// O gráfico começa no primeiro ano em que alguma série tem valor (a receita só existe desde 2017 e a dívida desde 2013),
// para não ficar um espaço vazio à esquerda.
function desdeOPrimeiroAno(series: { nome: string; valores: (number | null)[] }[]) {
  const inicios = series.map((s) => s.valores.findIndex((v) => v !== null)).filter((i) => i >= 0);
  const i = inicios.length ? Math.min(...inicios) : 0;
  return { periodos: ANOS.slice(i), series: series.map((s) => ({ nome: s.nome, valores: s.valores.slice(i) })) };
}
// variação com sinal: "+66%" e "−65%" (sinal de menos verdadeiro, não o hífen)
const pc = (v: number | null, casas = 0) => (v === null ? "—" : `${v > 0 ? "+" : v < 0 ? "−" : ""}${numero(Math.abs(v), casas)}%`);
const m = (v: number | null, casas = 2) => (v === null ? "—" : numero(v / 1_000_000, casas));

function Quadros({ itens }: { itens: SerieContas[] }) {
  return (
    <details className="mt-3 text-sm text-apagado">
      <summary className="cursor-pointer hover:text-tinta">Fonte: relatórios de gestão e contas de cada ano. Ver os quadros usados</summary>
      <ul className="mt-2 space-y-1.5">
        {itens.map((s) => (
          <li key={s.id}>
            <span className="text-texto">{s.nome}:</span> {s.quadro}
          </li>
        ))}
      </ul>
    </details>
  );
}

// Só aparecem os anos em que alguma das séries tem valor, e a coluna "Desde o 1.º ano" só quando há o que mostrar.
function Tabela({ series, euros = false }: { series: SerieContas[]; euros?: boolean }) {
  // do ano mais recente para o mais antigo (como nas tabelas dos indicadores), para o último ano estar sempre à vista
  const anos = ANOS.map((a, k) => ({ a, k }))
    .filter(({ k }) => series.some((s) => s.valores[k] !== null))
    .reverse();
  const crescimentos = series.map((s) => crescimento(s.valores));
  const comCrescimento = crescimentos.some((c) => c !== null);
  return (
    <>
    <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
      <table className="w-full text-sm" style={{ minWidth: `${14 + anos.length * 4}rem` }}>
        <thead className="bg-cinza text-left text-apagado">
          <tr>
            <th scope="col" className="sticky left-0 bg-cinza px-4 py-3 font-medium">
              {euros ? "Em euros por habitante (contas da Câmara)" : "Em milhões de euros"}
            </th>
            {comCrescimento && (
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Desde o 1.º ano
              </th>
            )}
            {anos.map(({ a }) => (
              <th key={a} scope="col" className="px-3 py-3 text-right font-medium">
                {a}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {series.map((s, n) => (
            <tr key={s.id} className="border-t border-linha tabular-nums">
              <th scope="row" className="sticky left-0 bg-fundo px-4 py-2.5 text-left font-medium text-tinta">
                {s.nome}
                <span className="block text-xs font-normal text-apagado">desde {primeiroAno(s)}</span>
              </th>
              {comCrescimento && <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-tinta">{pc(crescimentos[n])}</td>}
              {anos.map(({ a, k }) => {
                const v = s.valores[k];
                return (
                  <td key={a} className="whitespace-nowrap px-3 py-2.5 text-right text-texto">
                    {euros ? (v === null ? "—" : numero(v)) : m(v)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <AvisoDeslizar />
    </>
  );
}

// Aviso por baixo das tabelas largas (só no telemóvel, onde deslizam).
function AvisoDeslizar() {
  return <p className="mt-2 text-xs text-apagado sm:hidden">Desliza a tabela para o lado para ver os outros anos.</p>;
}

function Titulo({ id, children, texto }: { id: string; children: React.ReactNode; texto: React.ReactNode }) {
  return (
    <>
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-tinta">
        {children}
      </h2>
      <p className="mt-2 mb-6 max-w-2xl text-texto">{texto}</p>
    </>
  );
}

export default function Financas() {
  const impostosMunicipais = receitaPorImposto();
  const pessoalAtual = ultimo(gastosPessoal);
  // Por habitante: só há valores nos anos em que há população média (INE) nos dados recolhidos.
  const habitantes = porHabitante(despesaPessoalPaga).valores;
  const anosHabitante = ANOS.filter((_, k) => habitantes[k] !== null);
  const semHabitante = ANOS.filter((_, k) => habitantes[k] === null && despesaPessoalPaga.valores[k] !== null);
  // Receita total por habitante da Trofa, da AMP e dos 8 concelhos próximos, no último ano com os três (INE).
  const receitaIne = comparacaoReceitas().find((l) => l.rotulo.startsWith("Receita total"));
  return (
    <>
      <section className="topo-escuro">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Finanças locais</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Finanças do município</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            O que a Câmara da Trofa recebe e o que gasta, a dívida, o orçamento para 2026 e os impostos que a Assembleia fixa. Os
            valores vêm dos relatórios de gestão e contas que a Câmara publica (de 2010 a 2025, mas nem todos os dados existem desde
            2010), do orçamento de 2026 e, nos impostos, do INE.
          </p>
          <p className="mt-3 text-sm text-apagado">
            Dados até: relatório de gestão e contas de {ANOS[ANOS.length - 1]} (o último publicado) e orçamento de 2026.
          </p>
          <dl className="mt-8 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Receitas correntes, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(receitaCorrente), "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(receitaCorrente.valores))} desde {primeiroAno(receitaCorrente)}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Despesa corrente paga, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(despesaCorrente), "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(despesaCorrente.valores))} desde {primeiroAno(despesaCorrente)}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Gastos com pessoal, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(pessoalAtual, "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(gastosPessoal.valores))} desde 2021</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Dívida efetiva, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(dividaEfetiva), "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(dividaEfetiva.valores))} desde {primeiroAno(dividaEfetiva)}</dd>
            </div>
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              ["receita", "Receitas"],
              ["taxas", "Taxas e impostos"],
              ["despesas", "Despesas"],
              ["divida", "Dívida"],
              ["orcamento", "Orçamento 2026"],
              ["habitante", "Por habitante"],
            ].map(([id, nome]) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-block rounded-full border border-linha bg-fundo px-4 py-2 text-sm font-medium text-texto transition hover:border-tinta hover:text-tinta">
                  {nome}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6">
        <section aria-label="Receitas">
          <Titulo id="receita" texto="O que a Câmara cobrou em cada ano, sem contar o saldo do ano anterior. Mostra-se a receita total e, em separado, as receitas correntes (impostos, taxas, transferências do Estado e vendas).">
            Receitas
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              {...desdeOPrimeiroAno([
                { nome: receitaTotal.nome, valores: receitaTotal.valores },
                { nome: receitaCorrente.nome, valores: receitaCorrente.valores },
                { nome: transferenciasCorrentes.nome, valores: transferenciasCorrentes.valores },
                { nome: impostosDiretos.nome, valores: impostosDiretos.valores },
              ])}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[receitaTotal, receitaCorrente, transferenciasCorrentes, impostosDiretos]} />
          <p className="mt-3 max-w-3xl text-sm text-texto">
            A <strong className="font-semibold text-tinta">receita total</strong> é a do INE (com dados da DGAL), a mesma dos indicadores. Soma as <strong className="font-semibold text-tinta">receitas correntes</strong> (impostos, taxas, transferências correntes e vendas), as de capital (onde entram os fundos europeus e os empréstimos: 23,7 M€ em 2013 e 24,1 M€ em 2018) e as &ldquo;reposições não abatidas nos pagamentos&rdquo;, isto é, dinheiro que volta à Câmara de pagamentos de anos anteriores. Em 2025: 36,83 M€ de receitas correntes + 11,15 M€ de capital + 0,96 M€ de reposições = 48,94 M€, que é também o total do relatório de contas sem o saldo do ano anterior. Os impostos diretos são o IMI, o IUC, o IMT e a derrama.
          </p>
          {receitaIne && (
            <p className="mt-3 max-w-3xl text-sm text-texto">
              Por habitante, em {receitaIne.ano}, a receita total foi {numero(receitaIne.trofa)} € na Trofa, {numero(receitaIne.amp)} € na Área
              Metropolitana do Porto e {numero(receitaIne.ave)} € nos 8 concelhos próximos (valores do INE).
            </p>
          )}
          <Quadros itens={[receitaTotal, receitaCorrente, transferenciasCorrentes, impostosDiretos]} />

          <h3 id="impostos" className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-tinta">Receita de cada imposto</h3>
          <p className="mt-2 mb-6 max-w-3xl text-texto">
            O que a Câmara recebeu de IMI, IMT, IUC e derrama, e da participação no IRS, de {impostosMunicipais[0]?.periodos[0]} a{" "}
            {impostosMunicipais[0]?.periodos.at(-1)}. Por habitante, a dividir pela população média de cada ano, ao lado da Área
            Metropolitana do Porto, dos 8 concelhos próximos e de Portugal.
          </p>
          <ImpostosMunicipais impostos={impostosMunicipais} />
          <p className="mt-4 max-w-3xl text-sm text-apagado">
            Fonte: INE, com dados da Direção-Geral das Autarquias Locais (receitas das câmaras municipais). A participação no IRS não é
            um imposto da Câmara: é a parte do IRS dos residentes que o Estado transfere para o município.
          </p>
        </section>

        <section aria-label="Taxas e impostos locais">
          <TaxasLocais />
        </section>

        <section aria-label="Despesas">
          <span id="pessoal" aria-hidden className="block scroll-mt-24" />
          <Titulo
            id="despesas"
            texto={
              <>
                O que a Câmara pagou em cada ano: a despesa corrente e as suas duas maiores partes, o pessoal e a aquisição de bens e
                serviços. Nos gastos com pessoal, as contas dão dois valores: o que foi <strong className="font-semibold text-tinta">pago</strong> no ano (contabilidade orçamental, desde 2010) e os <strong className="font-semibold text-tinta">gastos</strong> do ano (contabilidade patrimonial, só desde 2021, quando passou a SNC-AP). Medem coisas diferentes, mas evoluem de forma parecida.
              </>
            }
          >
            Despesas
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              {...desdeOPrimeiroAno([
                { nome: despesaCorrente.nome, valores: despesaCorrente.valores },
                { nome: despesaPessoalPaga.nome, valores: despesaPessoalPaga.valores },
                { nome: despesaBensServicos.nome, valores: despesaBensServicos.valores },
              ])}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[despesaCorrente, despesaPessoalPaga, despesaBensServicos, gastosPessoal, gastosFse]} />
          <p className="mt-3 max-w-3xl text-sm text-texto">
            Em {ANOS[ANOS.length - 1]} a Câmara cobrou {m(ultimo(receitaCorrente))} M€ de receitas correntes e pagou {m(ultimo(despesaCorrente))} M€ de despesa
            corrente. As despesas com pessoal pagas passaram de {m(valorEm(despesaPessoalPaga, "2010"))} M€ em 2010 para {m(valorEm(despesaPessoalPaga, "2025"))} M€ em 2025 (o valor mais baixo foi {m(valorEm(despesaPessoalPaga, "2012"))} M€, em 2012) e pesavam {numero(pesoPessoal[ANOS.indexOf("2016")] ?? 0, 1)}% da despesa corrente paga em 2016, {numero(pesoPessoal[ANOS.indexOf("2020")] ?? 0, 1)}% em 2020 e {numero(pesoPessoal[ANOS.indexOf("2025")] ?? 0, 1)}% em 2025.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-texto">
            Em 2025, o Quadro 86 desagrega os 12,00 M€ de gastos com pessoal em 9,40 M€ de remunerações do pessoal, 2,17 M€ de encargos
            sobre remunerações, 0,25 M€ de remunerações dos titulares de órgãos autárquicos, 0,13 M€ de acidentes no trabalho e doenças
            profissionais e o restante (0,05 M€) em indemnizações, outros gastos com o pessoal e outros encargos sociais. O relatório
            indica como razões do aumento a atualização remuneratória, o reforço de recursos humanos e a descentralização de competências.
          </p>
          <Quadros itens={[despesaCorrente, despesaPessoalPaga, despesaBensServicos, gastosPessoal, gastosFse]} />
        </section>

        <section aria-label="Dívida">
          <Titulo
            id="divida"
            texto="A dívida total soma empréstimos, fornecedores e outros credores a 31 de dezembro (a série começa em 2013). A dívida efetiva é a que a lei conta para os limites de endividamento: tira os valores que a lei exclui (os chamados excecionados)."
          >
            Dívida
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              {...desdeOPrimeiroAno([
                { nome: dividaTotal.nome, valores: dividaTotal.valores },
                { nome: dividaEfetiva.nome, valores: dividaEfetiva.valores },
              ])}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[dividaTotal, dividaEfetiva]} />
          <Quadros itens={[dividaTotal, dividaEfetiva]} />
        </section>

        <section aria-label="Orçamento 2026">
          <Titulo
            id="orcamento"
            texto="O orçamento é uma previsão: o que a Câmara se autorizou a gastar em 2026, comparado com o orçamento inicial de 2025. Foi aprovado pela Câmara a 18 de dezembro de 2025 e pela Assembleia a 29 de dezembro de 2025."
          >
            Orçamento para 2026
          </Titulo>
          <div className="overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm">
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Despesa prevista
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    2025
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    2026
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Variação
                  </th>
                </tr>
              </thead>
              <tbody>
                {orcamento.map((o) => {
                  const total = o.rubrica.startsWith("Total");
                  return (
                    <tr key={o.rubrica} className={`border-t border-linha tabular-nums ${total ? "bg-suave font-semibold" : ""}`}>
                      <th scope="row" className={`px-4 py-2.5 text-left ${total ? "text-tinta" : "font-medium text-tinta"}`}>
                        {o.rubrica}
                      </th>
                      <td className="px-4 py-2.5 text-right text-texto">{milhoes(o.ano2025)}</td>
                      <td className="px-4 py-2.5 text-right text-texto">{milhoes(o.ano2026)}</td>
                      <td className="px-4 py-2.5 text-right text-tinta">{pc(o.variacao, 1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-texto">
            O relatório do orçamento diz que a Câmara tem 502 trabalhadores e que a
            despesa com pessoal inclui o pessoal não docente das escolas (4,14 M€) transferido do Estado. Explica o aumento
            com as atualizações salariais, a descentralização de competências, as mudanças obrigatórias de posição remuneratória, o
            salário mínimo e novos recrutamentos.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-apagado">
            Fonte:{" "}
            <a href={FONTE_ORCAMENTO} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
              Relatório do Orçamento de 2026 (PDF do município) ↗
            </a>
            , Quadros 15 e 16 e capítulo de Recursos Humanos. Os valores foram copiados dos quadros e conferidos com o texto de cada relatório.
          </p>
        </section>

        <section aria-label="Por habitante">
          <Titulo
            id="habitante"
            texto="Receitas, despesas com pessoal e dívida divididas pelo número de habitantes, para se perceber a dimensão e comparar ao longo dos anos."
          >
            Por habitante
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={ANOS.slice(1)}
              series={[porHabitante(receitaCorrente, "Receitas correntes"), porHabitante(despesaPessoalPaga, "Despesas com pessoal pagas"), porHabitante(dividaEfetiva, "Dívida efetiva")].map((x) => ({ nome: x.nome, valores: x.valores.slice(1) }))}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela euros series={[porHabitante(receitaTotal), porHabitante(receitaCorrente), porHabitante(despesaPessoalPaga), porHabitante(dividaEfetiva), porHabitante(dividaTotal)]} />
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Dividido pela população média anual residente da Trofa (INE), que nos dados recolhidos vai de {anosHabitante[0]} a{" "}
            {anosHabitante[anosHabitante.length - 1]}
            {semHabitante.length > 0 ? `; por isso não há valores por habitante para ${semHabitante.join(" nem para ")}` : ""}. Os valores
            arredondam-se ao euro. A comparação com a Área Metropolitana do Porto e os 8 concelhos próximos está nos{" "}
            <a href="#impostos" className="underline underline-offset-2 hover:text-tinta">
              gráficos de cada imposto
            </a>{" "}
            (botão &ldquo;Por habitante&rdquo;).
          </p>
        </section>

        <section aria-label="Relatórios">
          <h2 className="text-2xl font-bold tracking-tight text-tinta">De onde vêm os valores</h2>
          <p className="mt-2 mb-4 max-w-2xl text-texto">
            Cada ano vem do relatório de gestão e contas desse ano, publicado pelo município. Os de 2013 a 2020 são digitalizações; os números foram lidos da imagem de cada quadro.
          </p>
          <ul className="flex flex-wrap gap-2">
            {RELATORIOS.map((r) => (
              <li key={r.ano}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-linha px-4 py-1.5 text-sm font-medium text-texto transition hover:border-tinta hover:text-tinta">
                  Relatório de {r.ano} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </>
  );
}
