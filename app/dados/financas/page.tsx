import type { Metadata } from "next";
import Link from "next/link";
import Grafico from "@/components/dados/Grafico";
import TaxasLocais from "@/components/dados/TaxasLocais";
import { compacto, numero } from "@/lib/dados/formatar";
import {
  ANOS,
  COLUNAS_COMPARACAO,
  PAGINA_RELATORIOS,
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
  type SerieContas,
} from "@/lib/dados/financas";

export const metadata: Metadata = {
  title: "Finanças do município",
  description: "Gastos com pessoal, receita, dívida e orçamento da Câmara Municipal da Trofa desde 2010 e para 2026, com base nos relatórios de gestão e contas do município.",
};

const ultimo = (s: SerieContas) => s.valores[s.valores.length - 1];
const pc = (v: number | null, casas = 0) => (v === null ? "—" : `${v > 0 ? "+" : ""}${numero(v, casas)}%`);
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

function Tabela({ series, euros = false }: { series: SerieContas[]; euros?: boolean }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
      <table className="w-full min-w-[56rem] text-sm">
        <thead className="bg-cinza text-left text-apagado">
          <tr>
            <th scope="col" className="sticky left-0 bg-cinza px-4 py-3 font-medium">
              {euros ? "Em euros por habitante" : "Em milhões de euros"}
            </th>
            {ANOS.map((a) => (
              <th key={a} scope="col" className="px-3 py-3 text-right font-medium">
                {a}
              </th>
            ))}
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Desde o 1.º ano
            </th>
          </tr>
        </thead>
        <tbody>
          {series.map((s) => (
            <tr key={s.id} className="border-t border-linha tabular-nums">
              <th scope="row" className="sticky left-0 bg-fundo px-4 py-2.5 text-left font-medium text-tinta">
                {s.nome}
                <span className="block text-xs font-normal text-apagado">desde {primeiroAno(s)}</span>
              </th>
              {s.valores.map((v, i) => (
                <td key={i} className="whitespace-nowrap px-3 py-2.5 text-right text-texto">
                  {euros ? (v === null ? "—" : numero(v)) : m(v)}
                </td>
              ))}
              <td className="whitespace-nowrap px-4 py-2.5 text-right font-medium text-tinta">{pc(crescimento(s.valores))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
  const pessoalAtual = ultimo(gastosPessoal);
  const pessoalOrc = orcamento[0];
  return (
    <>
      <section className="border-b border-linha bg-gradient-to-b from-cinza to-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Finanças locais</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Finanças do município</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Gastos com pessoal, receitas, dívida, orçamento para 2026 e impostos locais do município da Trofa. Os valores vêm dos
            relatórios de gestão e contas que a Câmara publica (de 2010 a 2025, mas nem todos os dados existem desde 2010) e do orçamento de 2026.
          </p>
          <dl className="mt-8 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Gastos com pessoal, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(pessoalAtual, "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(gastosPessoal.valores))} desde 2021</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Orçamento 2026 para pessoal</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(pessoalOrc.ano2026, "€")}</dd>
              <dd className="text-sm text-apagado">{pc(pessoalOrc.variacao, 1)} face ao orçamento de 2025</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Receitas correntes, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(receitaCorrente), "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(receitaCorrente.valores))} desde {primeiroAno(receitaCorrente)}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Dívida efetiva, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(dividaEfetiva), "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(dividaEfetiva.valores))} desde {primeiroAno(dividaEfetiva)}</dd>
            </div>
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              ["pessoal", "Pessoal"],
              ["receita", "Receita"],
              ["divida", "Dívida"],
              ["orcamento", "Orçamento 2026"],
              ["habitante", "Por habitante"],
              ["taxas", "Taxas e impostos"],
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
        <section aria-label="Pessoal">
          <Titulo
            id="pessoal"
            texto={
              <>
                As contas mostram os gastos com pessoal de duas maneiras: o que foi <strong className="font-semibold text-tinta">pago</strong> no ano (contabilidade orçamental, disponível desde 2010) e os <strong className="font-semibold text-tinta">gastos</strong> do ano (contabilidade patrimonial, só desde 2021, quando passou a SNC-AP). Não são iguais, mas contam a mesma história.
              </>
            }
          >
            Gastos com pessoal
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={ANOS}
              series={[
                { nome: despesaPessoalPaga.nome, valores: despesaPessoalPaga.valores },
                { nome: gastosPessoal.nome + " (gastos do ano, desde 2021)", valores: gastosPessoal.valores },
              ]}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[gastosPessoal, despesaPessoalPaga, gastosFse, despesaBensServicos]} />
          <p className="mt-3 max-w-3xl text-sm text-texto">
            As despesas com pessoal pagas passaram de {m(valorEm(despesaPessoalPaga, "2010"))} M€ em 2010 para {m(valorEm(despesaPessoalPaga, "2025"))} M€ em 2025. O valor mais baixo da série foi {m(valorEm(despesaPessoalPaga, "2012"))} M€, em 2012. Pesavam {numero(pesoPessoal[ANOS.indexOf("2016")] ?? 0, 1)}% da despesa corrente paga em 2016, {numero(pesoPessoal[ANOS.indexOf("2020")] ?? 0, 1)}% em 2020 e {numero(pesoPessoal[ANOS.indexOf("2025")] ?? 0, 1)}% em 2025 (cálculo feito com os valores dos relatórios).
          </p>
          <p className="mt-2 max-w-3xl text-sm text-texto">
            Em 2025, o Quadro 86 desagrega os 12,00 M€ em 9,40 M€ de remunerações do pessoal, 2,17 M€ da rubrica de acidentes de trabalho e doenças
            profissionais, 0,25 M€ de remunerações dos titulares de órgãos autárquicos e o restante em outros encargos. O relatório indica como
            razões do aumento a atualização remuneratória, o reforço de recursos humanos e a descentralização de competências.
          </p>
          <Quadros itens={[gastosPessoal, despesaPessoalPaga, gastosFse, despesaBensServicos]} />
        </section>

        <section aria-label="Receita">
          <Titulo id="receita" texto="O que a Câmara cobrou em cada ano, sem contar o saldo do ano anterior. Mostra-se a receita total e, em separado, as receitas correntes (impostos, taxas, transferências do Estado e vendas).">
            Receita
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={ANOS}
              series={[
                { nome: receitaTotal.nome, valores: receitaTotal.valores },
                { nome: receitaCorrente.nome, valores: receitaCorrente.valores },
                { nome: transferenciasCorrentes.nome, valores: transferenciasCorrentes.valores },
                { nome: impostosDiretos.nome, valores: impostosDiretos.valores },
              ]}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[receitaTotal, receitaCorrente, transferenciasCorrentes, impostosDiretos]} />
          <p className="mt-3 max-w-3xl text-sm text-texto">
            Há dois totais: a <strong className="font-semibold text-tinta">receita total</strong> inclui as receitas de capital (como os fundos europeus) e os empréstimos contraídos; as <strong className="font-semibold text-tinta">receitas correntes</strong> são só impostos, taxas, transferências correntes e vendas. O valor da receita total dos municípios que o INE publica (e que aparece nos indicadores da página inicial) é o primeiro: 41,2 M€ em 2021, 35,7 M€ em 2022 e 40,0 M€ em 2023, muito próximo do das contas da Câmara. Em 2018 a receita total inclui 24,1 M€ de empréstimos contraídos para pagar dívida antiga.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-texto">
            Os impostos diretos são sobretudo o IMI, o IMT e o IUC, mais a participação variável no IRS. Veja as taxas que a
            Assembleia fixou, mais abaixo, em{" "}
            <a href="#taxas" className="underline underline-offset-2 hover:text-tinta">
              Taxas e impostos locais
            </a>
            .
          </p>
          <Quadros itens={[receitaTotal, receitaCorrente, transferenciasCorrentes, impostosDiretos]} />
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
              periodos={ANOS}
              series={[
                { nome: dividaTotal.nome, valores: dividaTotal.valores },
                { nome: dividaEfetiva.nome, valores: dividaEfetiva.valores },
              ]}
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
                      <td className="px-4 py-2.5 text-right text-texto">{compacto(o.ano2025, "€")}</td>
                      <td className="px-4 py-2.5 text-right text-texto">{compacto(o.ano2026, "€")}</td>
                      <td className="px-4 py-2.5 text-right text-tinta">{pc(o.variacao, 1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-texto">
            O relatório do orçamento diz que a Câmara tem 502 trabalhadores, dos quais 25 têm entre 60 e 64 anos, e que a
            despesa com pessoal inclui o pessoal não docente das escolas (4,14 M€) transferido do Estado. Explica o aumento
            com as atualizações salariais, a descentralização de competências, as mudanças obrigatórias de posição remuneratória, o
            salário mínimo e novos recrutamentos.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-apagado">
            Fonte: Relatório do Orçamento de 2026, Quadros 15 e 16 e capítulo de Recursos Humanos, na{" "}
            <a href={PAGINA_RELATORIOS} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
              página de relatórios e contas do município ↗
            </a>
            . Os valores foram copiados dos quadros e conferidos com o texto de cada relatório.
          </p>
        </section>

        <section aria-label="Por habitante">
          <Titulo
            id="habitante"
            texto="Os mesmos valores divididos pelo número de habitantes, para se perceber a dimensão e comparar com outros territórios."
          >
            Por habitante e comparação
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={ANOS.slice(1, 15)}
              series={[porHabitante(despesaPessoalPaga, "Despesas com pessoal pagas"), porHabitante(receitaCorrente, "Receitas correntes"), porHabitante(dividaEfetiva, "Dívida efetiva")].map((x) => ({ nome: x.nome, valores: x.valores.slice(1, 15) }))}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela euros series={[porHabitante(despesaPessoalPaga), porHabitante(receitaCorrente), porHabitante(receitaTotal), porHabitante(dividaEfetiva), porHabitante(dividaTotal)]} />
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Dividido pela população média anual residente da Trofa (INE), que só existe desde 2011. Os valores arredondam-se ao euro.
          </p>

          <h3 className="mt-10 text-lg font-bold text-tinta">Receitas por habitante: a Trofa e a sua região</h3>
          <p className="mt-2 max-w-2xl text-texto">
            O que a Câmara cobra por habitante, comparado com a Área Metropolitana do Porto e com o grupo “Ave e concelhos vizinhos”
            (um agregado do portal de origem dos dados, que não indica que concelhos inclui).
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Euros por habitante
                  </th>
                  {COLUNAS_COMPARACAO.map((c) => (
                    <th key={c} scope="col" className="px-3 py-3 text-right font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparacaoReceitas().map((l) => (
                  <tr key={l.rotulo} className="border-t border-linha tabular-nums">
                    <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                      {l.rotulo} <span className="text-xs font-normal text-apagado">({l.ano})</span>
                    </th>
                    <td className="px-3 py-2.5 text-right font-semibold text-tinta">{numero(l.trofa)}</td>
                    <td className="px-3 py-2.5 text-right text-texto">{numero(l.amp)}</td>
                    <td className="px-3 py-2.5 text-right text-texto">{numero(l.ave)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Fonte: INE (receitas dos municípios, a partir da Direção-Geral das Autarquias Locais), através do portal de origem, e
            população média anual residente. Os agregados juntam concelhos de dimensões muito diferentes; para comparar com concelhos concretos, veja os indicadores de{" "}
            <Link href="/dados#ambiente" className="underline underline-offset-2 hover:text-tinta">
              água, saneamento e ambiente
            </Link>
            , que trazem Santo Tirso, a Maia, Vila do Conde e Vila Nova de Famalicão.
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

        <section aria-label="Taxas e impostos locais">
          <TaxasLocais />
        </section>
      </div>
    </>
  );
}
