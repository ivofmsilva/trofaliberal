import type { Metadata } from "next";
import Link from "next/link";
import Grafico from "@/components/dados/Grafico";
import ImpostosMunicipais from "@/components/dados/ImpostosMunicipais";
import OrcamentoEPago from "@/components/dados/OrcamentoEPago";
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
  emprestimosContraidos,
  limiteDivida,
  prazoPagamentos,
  trabalhadoresCamara,
  FONTE_TRABALHADORES,
  ffdPorArea,
  type SerieContas,
} from "@/lib/dados/financas";

export const metadata: Metadata = {
  title: "Finanças do município",
  description: "Receitas, despesas, dívida, orçamento (o aprovado e o que se paga, comparado com os concelhos próximos) e impostos locais da Câmara Municipal da Trofa, desde 2010 e para 2027, com base nos relatórios de gestão e contas do município e no INE.",
};

const ultimo = (s: SerieContas) => s.valores[s.valores.length - 1];
// Ano de partida dos quatro números do topo: o mesmo em todos, 10 anos antes do último relatório (há valores dos quatro).
const BASE = String(Number(ANOS[ANOS.length - 1]) - 10);
// O gráfico começa no primeiro ano em que alguma série tem valor (a receita corrente só existe desde 2011 e a dívida desde 2013),
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
  // a receita total vem do INE e as outras séries dos relatórios: o resumo diz as duas fontes quando há mistura
  const comINE = itens.some((s) => s.quadro.startsWith("INE"));
  return (
    <details className="mt-3 text-sm text-apagado">
      <summary className="cursor-pointer hover:text-tinta">
        {comINE ? "Fontes: relatórios de gestão e contas e INE. Ver de onde vem cada série" : "Fonte: relatórios de gestão e contas de cada ano. Ver os quadros usados"}
      </summary>
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
    <details className="mt-6">
    <summary className="cursor-pointer text-sm font-medium text-tinta hover:underline">Ver os valores, ano a ano</summary>
    <div className="mt-3 overflow-x-auto rounded-xl border border-linha">
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
    </details>
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
  // Limite legal (DGAL): último ano e os anos acima de 100%
  const pctLimite = limiteDivida.percentagem?.linhas ?? [];
  const ultLimite = pctLimite[pctLimite.length - 1];
  const valorNoAno = (ind: typeof limiteDivida.limite, per?: string) => ind?.linhas.find((l) => l.periodo === per)?.valores[0]?.v ?? null;
  const acimaLimite = pctLimite.filter((l) => (l.valores[0]?.v ?? 0) > 100).map((l) => l.periodo);
  const ultPrazo = prazoPagamentos?.linhas[prazoPagamentos.linhas.length - 1];
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
            Receitas, despesas, dívida, orçamento e impostos locais da Câmara Municipal da Trofa.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-apagado">
            Fontes: relatórios de gestão e contas do município (até {ANOS[ANOS.length - 1]}, o último publicado), orçamento de 2026 e
            INE. Nem todas as séries começam no mesmo ano.
          </p>
          <p className="mt-8 text-sm text-texto">
            Em {ANOS[ANOS.length - 1]} e a variação em 10 anos, desde {BASE} (em euros de cada ano, sem descontar a inflação):
          </p>
          <dl className="mt-3 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            {[
              ["Receitas correntes", receitaCorrente],
              ["Despesa corrente paga", despesaCorrente],
              ["Despesas com pessoal pagas", despesaPessoalPaga],
              ["Dívida efetiva", dividaEfetiva],
            ].map(([nome, s]) => {
              const serie = s as SerieContas;
              return (
                <div key={serie.id} className="border-t-2 border-tinta pt-3">
                  <dt className="text-sm text-texto">{nome as string}</dt>
                  <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimo(serie), "€")}</dd>
                  <dd className="text-sm text-apagado">
                    {pc(crescimento(serie.valores, BASE))} desde {BASE}
                  </dd>
                </div>
              );
            })}
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              ["receita", "Receitas"],
              ["taxas", "Taxas e impostos"],
              ["despesas", "Despesas"],
              ["divida", "Dívida"],
              ["execucao", "Aprovado e pago"],
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
          <Titulo id="receita" texto="Receita cobrada em cada ano, sem o saldo do ano anterior: a receita total e, à parte, as receitas correntes (impostos, taxas, transferências do Estado e vendas).">
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

          <h3 id="descentralizacao" className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-tinta">Competências transferidas pelo Estado</h3>
          <p className="mt-2 mb-6 max-w-3xl text-texto">
            Desde 2022 a Câmara tem competências que eram do Estado: na educação (desde abril de 2022), na ação social (abril de 2023) e
            na saúde (janeiro de 2024). O Estado paga-as pelo Fundo de Financiamento da Descentralização, que entra nas receitas correntes.
          </p>
          <div className="max-w-2xl overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm">
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-3 py-3 font-medium sm:px-4">Em M€</th>
                  <th scope="col" className="px-2 py-3 text-right font-medium sm:px-3">Educação</th>
                  <th scope="col" className="px-2 py-3 text-right font-medium sm:px-3">Ação social</th>
                  <th scope="col" className="px-2 py-3 text-right font-medium sm:px-3">Saúde</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium sm:px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {[...ffdPorArea].reverse().map((f) => (
                  <tr key={f.ano} className="border-t border-linha tabular-nums">
                    <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left font-medium text-tinta sm:px-4">
                      {f.ano}
                      {f.calculado ? "*" : ""}
                    </th>
                    <td className="px-2 py-2.5 text-right text-texto sm:px-3">{m(f.educacao)}</td>
                    <td className="px-2 py-2.5 text-right text-texto sm:px-3">{m(f.acaoSocial)}</td>
                    <td className="px-2 py-2.5 text-right text-texto sm:px-3">{m(f.saude)}</td>
                    <td className="px-3 py-2.5 text-right font-medium text-tinta sm:px-4">{m(f.educacao + (f.acaoSocial ?? 0) + (f.saude ?? 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Fonte: relatórios de gestão e contas (mapa da transferência de competências); os totais são iguais aos do INE. * Em 2024 o mapa
            do relatório não soma o que foi recebido: a divisão por área é calculada a partir do relatório de 2025. Antes de 2022 a Câmara
            já recebia do Ministério da Educação, por um contrato de execução, sobretudo para o pessoal não docente (1,72 M€ em 2021); esse
            dinheiro não é deste fundo.
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
                Despesa paga em cada ano: a despesa corrente e as suas duas maiores partes, o pessoal e a aquisição de bens e
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
            corrente. As despesas com pessoal pagas passaram de {m(valorEm(despesaPessoalPaga, "2010"))} M€ em 2010 para {m(valorEm(despesaPessoalPaga, "2025"))} M€ em 2025 (o valor mais baixo foi {m(valorEm(despesaPessoalPaga, "2012"))} M€, em 2012) e pesavam {numero(pesoPessoal[ANOS.indexOf("2015")] ?? 0, 1)}% da despesa corrente paga em 2015, {numero(pesoPessoal[ANOS.indexOf("2020")] ?? 0, 1)}% em 2020 e {numero(pesoPessoal[ANOS.indexOf("2025")] ?? 0, 1)}% em 2025.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-texto">
            Em 2013 e 2014, os anos dos{" "}
            <a href="#emprestimos" className="underline underline-offset-2 hover:text-tinta">
              empréstimos para pagar dívidas
            </a>
            , a despesa corrente paga foi de {m(valorEm(despesaCorrente, "2013"), 1)} e {m(valorEm(despesaCorrente, "2014"), 1)} M€,
            contra {m(valorEm(despesaCorrente, "2012"), 1)} M€ em 2012 e {m(valorEm(despesaCorrente, "2015"), 1)} M€ em 2015.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-texto">
            Em 2025, o Quadro 86 desagrega os 12,00 M€ de gastos com pessoal em 9,40 M€ de remunerações do pessoal, 2,17 M€ de encargos
            sobre remunerações, 0,25 M€ de remunerações dos titulares de órgãos autárquicos, 0,13 M€ de acidentes no trabalho e doenças
            profissionais e o restante (0,05 M€) em indemnizações, outros gastos com o pessoal e outros encargos sociais. O relatório
            indica como razões do aumento a atualização remuneratória, o reforço de recursos humanos e a descentralização de competências.
          </p>
          {ultPrazo && (
            <p className="mt-2 max-w-3xl text-sm text-texto">
              Prazo médio de pagamento a fornecedores (DGAL): {numero(ultPrazo.valores[0]?.v ?? 0)} dias em {ultPrazo.periodo}.{" "}
              <Link href="/dados/indicadores/prazo_medio_pagamentos" className="underline underline-offset-2 hover:text-tinta">
                Ver a evolução
              </Link>
            </p>
          )}
          <Quadros itens={[despesaCorrente, despesaPessoalPaga, despesaBensServicos, gastosPessoal, gastosFse]} />

          <h3 id="trabalhadores" className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-tinta">Trabalhadores da Câmara</h3>
          <p className="mt-2 mb-6 max-w-3xl text-texto">
            Quantas pessoas trabalham nos serviços municipais, segundo a DGAL: {trabalhadoresCamara["2016"]} em 2016 e{" "}
            {trabalhadoresCamara["2025"]} em 2025. Não há série pública antes de 2016.
          </p>
          <div className="max-w-3xl">
            <Grafico
              periodos={Object.keys(trabalhadoresCamara)}
              series={[{ nome: "Trabalhadores da Câmara", valores: Object.values(trabalhadoresCamara) }]}
              unidade="pessoas"
              semComparar
              nivel
              casas={0}
            />
          </div>
          <ul className="mt-4 max-w-3xl list-disc space-y-1.5 pl-5 text-sm text-texto">
            <li>
              2009: por contrato com o Ministério da Educação (Contrato n.º 208/2009, Diário da República de 24 de julho de 2009), passaram
              para a Câmara cerca de 150 trabalhadores não docentes das escolas EB 2,3 (Trofa, Alvarelhos e Coronado), das escolas do 1.º
              ciclo e do pré-escolar. Já estão contados desde o início da série.
            </li>
            <li>
              2018: concursos para 70 lugares, com contratos em 2018 e 2019 (relatório de contas de
              2019).
            </li>
            <li>
              Abril de 2022: com a transferência de competências na educação, passaram para a Câmara cerca de 30 trabalhadores que ainda eram
              do Ministério (orçamento de 2026). Desde então, a Câmara contrata o pessoal não docente de todas as escolas do concelho; o
              orçamento de 2026 conta 219 trabalhadores nas escolas.
            </li>
            <li>
              Abril de 2023 e janeiro de 2024: chegaram as competências da ação social e da saúde.
            </li>
            <li>
              Entre 2021 e 2025, o número passou de {trabalhadoresCamara["2021"]} para {trabalhadoresCamara["2025"]} (mais{" "}
              {trabalhadoresCamara["2025"] - trabalhadoresCamara["2021"]}). A passagem de abril de 2022 explica cerca de 30. Os documentos
              usados não dividem as restantes entradas por área.
            </li>
          </ul>
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Fonte:{" "}
            <a href={FONTE_TRABALHADORES} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
              DGAL, Portal Autárquico, número de trabalhadores por município ↗
            </a>{" "}
            (a partir do balanço social). Os relatórios de contas dão números um pouco diferentes (em 2025, 491 no anexo), e o orçamento
            de 2026 conta 502, dos quais 219 nas escolas.
          </p>
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

          {ultLimite && (
            <>
              <h3 id="limite" className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-tinta">Limite legal da dívida</h3>
              <p className="mt-2 mb-6 max-w-3xl text-texto">
                A lei limita a dívida de cada câmara a uma vez e meia a média da receita corrente dos três anos anteriores. Em{" "}
                {ultLimite.periodo}, o limite era {m(valorNoAno(limiteDivida.limite, ultLimite.periodo))} M€ e a dívida que conta para ele, segundo a DGAL,{" "}
                {m(valorNoAno(limiteDivida.divida, ultLimite.periodo))} M€: {numero(ultLimite.valores[0]?.v ?? 0, 1)}% do limite.
                {acimaLimite.length > 0 && ` Esteve acima do limite (mais de 100%) em ${acimaLimite.length === 1 ? acimaLimite[0] : `${acimaLimite.slice(0, -1).join(", ")} e ${acimaLimite[acimaLimite.length - 1]}`}.`}
              </p>
              <div className="max-w-3xl">
                <Grafico
                  periodos={pctLimite.map((l) => l.periodo)}
                  series={[{ nome: "Dívida em % do limite legal", valores: pctLimite.map((l) => l.valores[0]?.v ?? null) }]}
                  unidade="%"
                  casas={1}
                  semComparar
                  nivel
                />
              </div>
              <p className="mt-3 max-w-3xl text-sm text-apagado">
                Fonte: DGAL, Portal Autárquico (os mesmos valores dos indicadores{" "}
                <Link href="/dados/indicadores/divida_percentagem_limite" className="underline underline-offset-2 hover:text-tinta">
                  dívida em % do limite legal
                </Link>{" "}
                e{" "}
                <Link href="/dados/indicadores/limite_endividamento" className="underline underline-offset-2 hover:text-tinta">
                  limite legal
                </Link>
                ). A dívida que a DGAL conta para o limite é quase igual à dívida efetiva dos relatórios de 2021 em diante; antes, a da DGAL é mais alta.
              </p>
            </>
          )}

          <h3 id="emprestimos" className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-tinta">Empréstimos contraídos em cada ano</h3>
          <p className="mt-2 mb-6 max-w-3xl text-texto">
            Dinheiro recebido de empréstimos em cada ano. Entra como receita de capital no ano em que é recebido (um
            empréstimo pode ser recebido ao longo de vários anos); o reembolso paga-se nos anos seguintes.
          </p>
          <div className="max-w-3xl">
            <Grafico {...desdeOPrimeiroAno([{ nome: emprestimosContraidos.nome, valores: emprestimosContraidos.valores }])} unidade="€" emMilhoes semComparar nivel />
          </div>
          <h4 className="mt-8 font-bold text-tinta">Para que foram</h4>
          <ul className="mt-3 max-w-3xl space-y-2 text-texto">
            <li>
              <strong className="font-semibold text-tinta">2011, 0,5 M€:</strong> empréstimo de curto prazo para tesouraria, pago no mesmo ano.
            </li>
            <li>
              <strong className="font-semibold text-tinta">2013 e 2014, 30,3 M€:</strong> para pagar dívidas. 13,76 M€ da Caixa Geral de
              Depósitos, num reequilíbrio financeiro &ldquo;destinado à regularização de dívidas a terceiros&rdquo;, e 16,56 M€ do Estado,
              pelo Programa de Apoio à Economia Local (PAEL), recebidos em duas vezes.
            </li>
            <li>
              <strong className="font-semibold text-tinta">2018, 24,1 M€:</strong> não foi dívida nova. Três empréstimos (Caixa Geral de
              Depósitos, Santander Totta e BPI) substituíram os de 2013 e 2014.
            </li>
            <li>
              <strong className="font-semibold text-tinta">2021, 13,4 M€:</strong> 10,9 M€ de dois empréstimos (BPI e EuroBic) para
              substituir dois dos de 2018, e 2,5 M€ da linha do Banco Europeu de Investimento (BEI) para obras com fundos europeus.
            </li>
            <li>
              <strong className="font-semibold text-tinta">2019, 2020, 2022, 2023 e 2025, de 1,0 a 4,7 M€ por ano:</strong> obras. Da linha
              do BEI, para obras com fundos europeus (a primeira, em 2019, para a Escola Básica Professor Napoleão Sousa Marques), e, desde
              2022, da Caixa de Crédito Agrícola do Médio Ave e, em 2025, da Caixa Geral de Depósitos, para investimento municipal.
            </li>
          </ul>
          <Tabela series={[emprestimosContraidos]} />
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Fonte: INE, com dados da DGAL (receita de passivos financeiros), igual aos relatórios de gestão e contas nos anos com
            empréstimos. Para que foram: mapas de empréstimos obtidos e textos dos relatórios de gestão e contas, e deliberações da
            Assembleia Municipal.
          </p>
        </section>

        <OrcamentoEPago />

        <section aria-label="Orçamento 2026">
          <Titulo
            id="orcamento"
            texto="Previsão da despesa para 2026 (o máximo que se pode gastar), comparada com o orçamento inicial de 2025. Aprovado pela Câmara a 18 de dezembro de 2025 e pela Assembleia a 29 de dezembro de 2025."
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
                      <td className="px-4 py-2.5 text-right text-tinta">{pc(((o.ano2026 - o.ano2025) / o.ano2025) * 100, 1)}</td>
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
