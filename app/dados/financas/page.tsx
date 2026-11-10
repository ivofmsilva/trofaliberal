import type { Metadata } from "next";
import Link from "next/link";
import Grafico from "@/components/dados/Grafico";
import { compacto, numero } from "@/lib/dados/formatar";
import {
  ANOS,
  FONTE_CONTAS,
  PAGINA_RELATORIOS,
  crescimento,
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
  transferenciasCorrentes,
  type SerieContas,
} from "@/lib/dados/financas";

export const metadata: Metadata = {
  title: "Finanças do município",
  description: "Gastos com pessoal, receita, dívida e orçamento da Câmara Municipal da Trofa entre 2021 e 2026, tirados das contas oficiais.",
};

const ultimo = (s: SerieContas) => s.valores[s.valores.length - 1];
const pc = (v: number, casas = 0) => `${v > 0 ? "+" : ""}${numero(v, casas)}%`;

function Quadros({ itens }: { itens: SerieContas[] }) {
  return (
    <p className="mt-3 text-sm text-apagado">
      Fonte: Relatório de Gestão 2025, {itens.map((s) => `${s.nome.toLowerCase()}: ${s.quadro}`).join("; ")}.
    </p>
  );
}

function Tabela({ series }: { series: SerieContas[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
      <table className="w-full text-sm">
        <thead className="bg-suave text-left text-apagado">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Em milhões de euros
            </th>
            {ANOS.map((a) => (
              <th key={a} scope="col" className="px-4 py-3 text-right font-medium">
                {a}
              </th>
            ))}
            <th scope="col" className="px-4 py-3 text-right font-medium">
              2021–2025
            </th>
          </tr>
        </thead>
        <tbody>
          {series.map((s) => (
            <tr key={s.id} className="border-t border-linha tabular-nums">
              <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                {s.nome}
              </th>
              {s.valores.map((v, i) => (
                <td key={i} className="px-4 py-2.5 text-right text-texto">
                  {numero(v / 1_000_000, 2)}
                </td>
              ))}
              <td className="px-4 py-2.5 text-right font-medium text-tinta">{pc(crescimento(s.valores))}</td>
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
      <section className="border-b border-linha bg-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Finanças locais</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Finanças do município</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            Quanto a Câmara gasta em pessoal, quanto recebe, quanto deve e o que prevê gastar em 2026. Os valores vêm das
            contas aprovadas pela Câmara e pela Assembleia Municipal, de 2021 a 2025, e do orçamento de 2026.
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
              <dd className="text-sm text-apagado">{pc(crescimento(receitaCorrente.valores))} desde 2021</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Dívida efetiva, 2025</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(dividaEfetiva), "€")}</dd>
              <dd className="text-sm text-apagado">{pc(crescimento(dividaEfetiva.valores))} desde 2021</dd>
            </div>
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              ["pessoal", "Pessoal"],
              ["receita", "Receita"],
              ["divida", "Dívida"],
              ["orcamento", "Orçamento 2026"],
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
                As contas mostram os gastos com pessoal de duas maneiras: os <strong className="font-semibold text-tinta">gastos</strong> do ano
                (contabilidade patrimonial) e o que foi <strong className="font-semibold text-tinta">pago</strong> no ano (contabilidade orçamental).
                Não são iguais, mas contam a mesma história.
              </>
            }
          >
            Gastos com pessoal
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={ANOS}
              series={[
                { nome: gastosPessoal.nome + " (gastos do ano)", valores: gastosPessoal.valores },
                { nome: despesaPessoalPaga.nome + " (pagas)", valores: despesaPessoalPaga.valores },
              ]}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[gastosPessoal, despesaPessoalPaga, gastosFse, despesaBensServicos]} />
          <p className="mt-3 max-w-3xl text-sm text-texto">
            As despesas com pessoal pagas pesam {numero(pesoPessoal[4], 1)}% da despesa corrente paga em 2025. Em 2021 pesavam{" "}
            {numero(pesoPessoal[0], 1)}%, em 2023 {numero(pesoPessoal[2], 1)}% e em 2024 {numero(pesoPessoal[3], 1)}% (cálculo feito com os valores
            do quadro 15).
          </p>
          <p className="mt-2 max-w-3xl text-sm text-texto">
            Em 2025, o Quadro 86 desagrega os 12,00 M€ em 9,40 M€ de remunerações do pessoal, 2,17 M€ da rubrica de acidentes de trabalho e doenças
            profissionais, 0,25 M€ de remunerações dos titulares de órgãos autárquicos e o restante em outros encargos. O relatório indica como
            razões do aumento a atualização remuneratória, o reforço de recursos humanos e a descentralização de competências.
          </p>
          <Quadros itens={[gastosPessoal, despesaPessoalPaga, gastosFse, despesaBensServicos]} />
        </section>

        <section aria-label="Receita">
          <Titulo id="receita" texto="O que a Câmara cobrou em cada ano em receitas correntes (impostos, taxas, transferências do Estado e outras), sem contar o saldo do ano anterior nem os empréstimos.">
            Receita
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={ANOS}
              series={[
                { nome: receitaCorrente.nome, valores: receitaCorrente.valores },
                { nome: transferenciasCorrentes.nome, valores: transferenciasCorrentes.valores },
                { nome: impostosDiretos.nome, valores: impostosDiretos.valores },
              ]}
              unidade="€"
              semComparar
            />
          </div>
          <Tabela series={[receitaCorrente, transferenciasCorrentes, impostosDiretos]} />
          <p className="mt-3 max-w-3xl text-sm text-texto">
            Os impostos diretos são sobretudo o IMI, o IMT e o IUC, mais a participação variável no IRS. Veja as taxas que a
            Assembleia fixou na página{" "}
            <Link href="/dados/taxas" className="underline underline-offset-2 hover:text-tinta">
              Taxas
            </Link>
            .
          </p>
          <Quadros itens={[receitaCorrente, transferenciasCorrentes, impostosDiretos]} />
        </section>

        <section aria-label="Dívida">
          <Titulo
            id="divida"
            texto="A dívida total soma empréstimos, fornecedores e outros credores a 31 de dezembro. A dívida efetiva é a que a lei conta para os limites de endividamento: tira os valores que a lei exclui (os chamados excecionados)."
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
              <thead className="bg-suave text-left text-apagado">
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
            . As contas de 2021 a 2025 estão no{" "}
            <a href={FONTE_CONTAS} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
              Relatório de Gestão de 2025 ↗
            </a>
            . Os valores foram copiados dos quadros e conferidos com o texto do relatório.
          </p>
        </section>
      </div>
    </>
  );
}
