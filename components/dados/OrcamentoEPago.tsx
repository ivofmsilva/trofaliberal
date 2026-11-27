import Grafico from "@/components/dados/Grafico";
import { porSlug } from "@/lib/dados/dados";
import { milhoes, numero } from "@/lib/dados/formatar";
import { FONTE_DESPESA_PAGA, execucao8, orcamentoTrofa, pagoDoAprovado, revisao2025, santoTirso2027 } from "@/lib/dados/orcamentoExecucao";

// "O orçamento aprovado e o que se paga" (página das Finanças): a Trofa ano a ano e os 8 concelhos próximos.
// Dados e fontes em lib/orcamentoExecucao.ts.

const pc = (v: number | null) => (v === null ? "—" : `${numero(v, 0)}%`);
const M = (v: number | null) => (v === null ? "—" : numero(v / 1_000_000, 2));

// População média residente de 2025 (INE), para o orçamento de 2027 e a despesa de 2025 por habitante.
function populacao(concelho: string, ano: string) {
  const l = porSlug("populacao_media_residente")?.linhas.find((x) => x.periodo === ano);
  return l?.concelhos?.[concelho] ?? null;
}

export default function OrcamentoEPago() {
  const anos = orcamentoTrofa.map((a) => a.ano);
  const a2025 = orcamentoTrofa.find((a) => a.ano === "2025")!;
  const a2027 = orcamentoTrofa.find((a) => a.ano === "2027")!;
  const ordem = [...execucao8].sort(
    (a, b) => (pagoDoAprovado(a.anos["2025"].inicial, a.anos["2025"].pago) ?? 0) - (pagoDoAprovado(b.anos["2025"].inicial, b.anos["2025"].pago) ?? 0),
  );
  const st = execucao8.find((c) => c.concelho === "Santo Tirso")!;
  const popTrofa = populacao("Trofa", "2025");
  const popST = populacao("Santo Tirso", "2025");
  return (
    <section aria-label="Orçamento aprovado e despesa paga">
      <h2 id="execucao" className="scroll-mt-24 text-2xl font-bold tracking-tight text-tinta">
        O orçamento aprovado e o que se paga
      </h2>
      <p className="mt-2 mb-6 max-w-2xl text-texto">
        O orçamento é o máximo que a Câmara pode gastar num ano. Vai sendo revisto ao longo do ano e, no fim, o que conta é o que
        se pagou.
      </p>
      <div className="max-w-3xl">
        <Grafico
          periodos={anos}
          series={[
            { nome: "Orçamento aprovado", valores: orcamentoTrofa.map((a) => a.inicial) },
            { nome: "Despesa paga", valores: orcamentoTrofa.map((a) => a.pago) },
          ]}
          unidade="€"
          semComparar
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
        <table className="w-full min-w-[36rem] text-sm">
          <caption className="sr-only">Trofa: orçamento aprovado, depois das revisões e despesa paga, em milhões de euros</caption>
          <thead className="bg-cinza text-left text-apagado">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Ano</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Aprovado (M€)</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Depois das revisões (M€)</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Pago (M€)</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Pago do aprovado</th>
            </tr>
          </thead>
          <tbody>
            {[...orcamentoTrofa].reverse().map((a) => (
              <tr key={a.ano} className="border-t border-linha tabular-nums">
                <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                  {a.ano}
                  {a.nota && <span className="block text-xs font-normal text-apagado">{a.nota}</span>}
                </th>
                <td className="px-4 py-2.5 text-right text-texto">
                  {a.inicialAprox ? "~" : ""}
                  {a.inicialAprox ? numero(a.inicial! / 1_000_000, 0) : M(a.inicial)}
                </td>
                <td className="px-4 py-2.5 text-right text-texto">
                  {a.corrigidoCalculado ? "≈" : ""}
                  {a.corrigidoCalculado ? numero(a.corrigido! / 1_000_000, 1) : M(a.corrigido)}
                </td>
                <td className="px-4 py-2.5 text-right text-texto">{M(a.pago)}</td>
                <td className="px-4 py-2.5 text-right font-semibold text-tinta">{pc(pagoDoAprovado(a.inicial, a.pago))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-3xl text-sm text-texto">
        Em 2025, a Câmara aprovou {milhoes(a2025.inicial)}, reviu o orçamento para {milhoes(a2025.corrigido)} e pagou{" "}
        {milhoes(a2025.pago)}: {pc(pagoDoAprovado(a2025.inicial, a2025.pago))} do aprovado. O relatório de contas explica a revisão com a
        reprogramação da receita prevista de projetos cofinanciados: contava com {milhoes(revisao2025.transferenciasCapital.inicial)} de
        transferências de capital (sobretudo fundos europeus) e passou a contar com {milhoes(revisao2025.transferenciasCapital.corrigido)}; o
        investimento previsto desceu de {milhoes(revisao2025.investimento.inicial)} para {milhoes(revisao2025.investimento.corrigido)}. A
        taxa de execução de {numero(revisao2025.grauExecucao, 2)}% que o relatório apresenta compara o que se pagou com o orçamento já
        revisto.
      </p>
      <p className="mt-2 max-w-3xl text-sm text-apagado">
        ~ valor arredondado na fonte. ≈ calculado: despesa paga a dividir pelo grau de execução do relatório de 2025 (Quadro 16).
        Fontes do aprovado:{" "}
        {orcamentoTrofa.map((a, i) => (
          <span key={a.ano}>
            {i > 0 && "; "}
            {a.ano}:{" "}
            {a.fonte.url ? (
              <a href={a.fonte.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
                {a.fonte.texto} ↗
              </a>
            ) : (
              a.fonte.texto
            )}
          </span>
        ))}
        . Despesa paga:{" "}
        <a href={FONTE_DESPESA_PAGA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
          INE, com dados da DGAL ↗
        </a>
        .
      </p>

      <h3 className="mt-12 text-xl font-bold tracking-tight text-tinta">Nos 8 concelhos próximos</h3>
      <p className="mt-2 mb-4 max-w-2xl text-texto">Quanto do orçamento aprovado no início do ano cada câmara pagou.</p>
      <div className="overflow-x-auto rounded-xl border border-linha">
        <table className="w-full min-w-[36rem] text-sm">
          <caption className="sr-only">Orçamento aprovado e despesa paga nos 8 concelhos próximos, em 2025 e 2024</caption>
          <thead className="bg-cinza text-left text-apagado">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Concelho</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Aprovado 2025 (M€)</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Pago 2025 (M€)</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Pago do aprovado 2025</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">2024</th>
            </tr>
          </thead>
          <tbody>
            {ordem.map((c) => {
              const trofa = c.concelho === "Trofa";
              const x = c.anos["2025"];
              const y = c.anos["2024"];
              return (
                <tr key={c.concelho} className={`border-t border-linha tabular-nums ${trofa ? "bg-suave font-semibold" : ""}`}>
                  <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                    <a href={x.fonte} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {c.concelho}
                    </a>
                  </th>
                  <td className="px-4 py-2.5 text-right text-texto">
                    {x.aprox ? "~" : ""}
                    {numero(x.inicial / 1_000_000, x.aprox && x.inicial % 1_000_000 === 0 ? 0 : 1)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-texto">{numero(x.pago / 1_000_000, 1)}</td>
                  <td className="px-4 py-2.5 text-right text-tinta">{pc(pagoDoAprovado(x.inicial, x.pago))}</td>
                  <td className="px-4 py-2.5 text-right text-texto">
                    <a href={y.fonte} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {pc(pagoDoAprovado(y.inicial, y.pago))}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 max-w-3xl text-sm text-texto">
        Para 2027, a Trofa aprovou ~{numero(a2027.inicial! / 1_000_000, 0)} M€
        {popTrofa ? `, cerca de ${numero(Math.round(a2027.inicial! / popTrofa / 10) * 10)} € por habitante` : ""}, e Santo Tirso{" "}
        <a href={santoTirso2027.fonte} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
          {numero(santoTirso2027.valor / 1_000_000, 1)} M€
        </a>
        {popST ? `, cerca de ${numero(Math.round(santoTirso2027.valor / popST / 10) * 10)} € por habitante` : ""}. Em 2025, a despesa paga por habitante
        foi de {popTrofa ? numero(Math.round(a2025.pago! / popTrofa)) : "—"} € na Trofa e de {popST ? numero(Math.round(st.anos["2025"].pago / popST)) : "—"} € em
        Santo Tirso (população média residente de 2025, INE).
      </p>
      <p className="mt-2 max-w-3xl text-sm text-apagado">
        O nome de cada concelho liga à fonte do orçamento de 2025 e a percentagem de 2024 à desse ano (documentos das câmaras ou
        imprensa). ~ valor arredondado na fonte. Acima de 100%: a câmara reforçou o orçamento durante o ano (por exemplo, com o saldo
        do ano anterior) e pagou mais do que tinha aprovado no início. Despesa paga:{" "}
        <a href={FONTE_DESPESA_PAGA} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-tinta">
          INE, com dados da DGAL ↗
        </a>
        .
      </p>
    </section>
  );
}
