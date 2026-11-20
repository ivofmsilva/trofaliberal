import type { Metadata } from "next";
import Grafico from "@/components/dados/Grafico";
import { compacto, numero } from "@/lib/dados/formatar";
import { alteracoesDe, contaEm, contas, contratoEm, contratos, contratosPublicos, recolhido, trofambiente, ultimoContrato } from "@/lib/dados/empresas";

export const metadata: Metadata = {
  title: "Empresas municipais",
  description:
    "A TrofAmbiente (antes Trofáguas), a empresa municipal da Trofa: o que faz, quanto recebe da Câmara em cada contrato-programa desde 2006, as contas desde 2009, os contratos públicos que celebra e os documentos que publica.",
};

const pc = (v: number | null) => (v === null ? "—" : `${v > 0 ? "+" : v < 0 ? "−" : ""}${numero(Math.abs(v), 0)}%`);
const variacao = (a: number | null | undefined, b: number | null | undefined) => (a && b ? ((b - a) / a) * 100 : null);
const euros = (v: number | null | undefined, casas = 2) => (v === null || v === undefined ? "—" : `${v < 0 ? "−" : ""}${numero(Math.abs(v), casas)} €`);
const dataPT = (iso: string | null) => (iso ? iso.split("-").reverse().join("/") : "—");
const semNif = (t: string | null) => (t ?? "—").replace(/^\s*\d{8,9}\s*-\s*/, "").trim();
const ligacao = "text-trofa underline-offset-2 hover:underline";

// Documentos da empresa, procurados pelo título (as ligações são as do site da TrofAmbiente)
const todos = trofambiente.documentos.flatMap((c) => c.documentos);
const doc = (re: RegExp) => todos.find((d) => re.test(d.titulo))?.url ?? trofambiente.site;

const rotuloAlteracao = (t: string) =>
  /parecer/i.test(t) ? "parecer do fiscal único" : /segunda altera/i.test(t) ? "2.ª alteração" : /adenda.*altera/i.test(t) ? "adenda à alteração" : /altera/i.test(t) ? "alteração" : /adenda/i.test(t) ? "adenda" : t;

function Titulo({ id, children, texto }: { id: string; children: React.ReactNode; texto: React.ReactNode }) {
  return (
    <>
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-tinta">
        {children}
      </h2>
      <div className="mt-2 mb-6 max-w-3xl space-y-3 text-texto">{texto}</div>
    </>
  );
}

function Externa({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={ligacao} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function EmpresasMunicipais() {
  const anterior = contratoEm(ultimoContrato.ano - 1);
  const de2020 = contratoEm(2020);
  const recolha = new Date(recolhido).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
  const ultimaConta = contas[contas.length - 1];

  // Subsídio: contrato-programa (valor inicial) e o que ficou nas contas, no mesmo eixo
  const anos: number[] = [];
  for (let a = contratos[0].ano; a <= ultimoContrato.ano; a++) anos.push(a);
  const periodos = anos.map(String);

  // Contratos públicos (Portal BASE)
  const cp = [...contratosPublicos].sort((a, b) => String(b.data_celebracao).localeCompare(String(a.data_celebracao)));
  const totalCP = cp.reduce((s, c) => s + (c.valor_contratual ?? 0), 0);
  const anosCP = [...new Set(cp.map((c) => c.ano).filter((a): a is number => a !== null))].sort((a, b) => a - b);
  const maior = [...cp].sort((a, b) => (b.valor_contratual ?? 0) - (a.valor_contratual ?? 0))[0];

  return (
    <>
      <section className="border-b border-linha bg-gradient-to-b from-cinza to-suave">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Setor empresarial local</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-tinta md:text-5xl">Empresas municipais</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            A empresa municipal da Trofa é a <strong className="font-semibold text-tinta">TrofAmbiente</strong> (até 2022, Trofáguas). Faz a recolha
            do lixo e fiscaliza, por conta do município, os serviços de água e de saneamento. Todos os anos recebe da Câmara um subsídio fixado num
            contrato-programa. Os números desta página vêm dos documentos que a própria empresa publica e do Portal BASE.
          </p>
          <p className="mt-3 text-sm text-apagado">Documentos recolhidos em {recolha}.</p>
          <dl className="mt-8 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Subsídio da Câmara, {ultimoContrato.ano}</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimoContrato.subsidio, "€")}</dd>
              <dd className="text-sm text-apagado">contrato-programa de {ultimoContrato.ano}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Face a {ultimoContrato.ano - 1}</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(variacao(anterior?.subsidio, ultimoContrato.subsidio))}</dd>
              <dd className="text-sm text-apagado">{compacto(anterior?.subsidio ?? null, "€")} em {ultimoContrato.ano - 1}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Face a 2020</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(variacao(de2020?.subsidio, ultimoContrato.subsidio))}</dd>
              <dd className="text-sm text-apagado">{compacto(de2020?.subsidio ?? null, "€")} por ano de 2016 a 2020</dd>
            </div>
            {ultimaConta && (
              <div className="border-t-2 border-tinta pt-3">
                <dt className="text-sm text-texto">Resultado líquido, {ultimaConta.ano}</dt>
                <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">
                  {ultimaConta.resultadoLiquido < 0 ? "−" : ""}
                  {Math.abs(ultimaConta.resultadoLiquido) >= 1_000_000
                    ? compacto(Math.abs(ultimaConta.resultadoLiquido), "€")
                    : `${numero(Math.abs(ultimaConta.resultadoLiquido) / 1000, 0)} mil €`}
                </dd>
                <dd className="text-sm text-apagado">{ultimaConta.resultadoLiquido < 0 ? "prejuízo" : "lucro"} no relatório e contas</dd>
              </div>
            )}
          </dl>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[
              ["empresa", "A empresa"],
              ["subsidio", "Subsídio da Câmara"],
              ["contas", "Contas"],
              ["contratos", "Contratos públicos"],
              ["agua", "Água, saneamento e piscinas"],
              ["documentos", "Documentos"],
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
        <section aria-label="A empresa">
          <Titulo
            id="empresa"
            texto={
              <>
                <p>
                  <strong className="font-semibold text-tinta">TrofAmbiente, E.M. – Sociedade Unipessoal, Lda.</strong> é uma empresa municipal: o
                  único sócio é o Município da Trofa. Tem sede nos Paços do Concelho e site próprio, onde publica as contas, os contratos com a Câmara
                  e os relatórios de execução. No site da Câmara, o menu &ldquo;Empresas Municipais&rdquo; leva diretamente ao site da TrofAmbiente.
                </p>
                <p>O que faz hoje, segundo os estatutos, os contratos-programa e os relatórios de execução:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>recolha de resíduos urbanos e de biorresíduos, de monstros domésticos, de óleos alimentares (oleões) e de roupa (roupões), e o Ecocentro;</li>
                  <li>fiscalização, por conta do município, da Indaqua, que tem a concessão do abastecimento de água;</li>
                  <li>fiscalização da Águas do Norte, que presta o serviço de saneamento (águas residuais);</li>
                  <li>ações de sensibilização ambiental.</li>
                </ul>
              </>
            }
          >
            A empresa
          </Titulo>
          <ol className="max-w-3xl space-y-4 border-l-2 border-linha pl-6 text-texto">
            <li>
              <p className="font-semibold text-tinta">5 de dezembro de 2002 — nasce a Trofáguas</p>
              <p className="mt-1">
                Constituída por escritura, como &ldquo;Trofáguas – Serviços Ambientais, EM&rdquo;, depois das deliberações da Câmara (11 de setembro de
                2002) e da Assembleia Municipal (30 de setembro de 2002). Capital de 100 000 €, todo do Município. O objeto era a distribuição de água,
                a drenagem e o tratamento de águas residuais e a gestão, por delegação do município, das concessões nessa área.{" "}
                <Externa href={doc(/Pacto Social/i)}>Escritura ↗</Externa>
              </p>
            </li>
            <li>
              <p className="font-semibold text-tinta">2013 — a outra empresa municipal, a TrofaPark</p>
              <p className="mt-1">
                Havia uma segunda empresa municipal, a TrofaPark – Empresa de Reabilitação Urbana, Desenvolvimento Económico, Inovação Empresarial e
                Gestão de Equipamentos, EEM. A 28 de fevereiro de 2013, a Assembleia Municipal aprovou a sua extinção, por fusão na Trofáguas, para
                cumprir a lei das empresas locais (Lei 50/2012); o processo ficou a aguardar o visto do Tribunal de Contas. A adenda ao contrato-programa
                de 2015 já fala da &ldquo;internalização nos serviços da Câmara Municipal&rdquo; da TrofaPark.{" "}
                <Externa href={doc(/Relat.rio e Contas 2014/i)}>Relatório e contas 2014 ↗</Externa> ·{" "}
                <Externa href={doc(/^Adenda Contrato Programa 2015/i)}>Adenda de 2015 ↗</Externa>
              </p>
            </li>
            <li>
              <p className="font-semibold text-tinta">Abril de 2015 — o saneamento passa para a Águas do Norte</p>
              <p className="mt-1">
                A partir de 1 de abril de 2015, a empresa deixou de gerir a drenagem e o tratamento de águas residuais, que passaram para a Águas do
                Noroeste (hoje Águas do Norte), ao abrigo da parceria assinada a 5 de julho de 2013. Deixou também de receber a tarifa de saneamento,
                mas ficou com a dívida desses investimentos (à banca e à Águas do Norte). Por isso as vendas e os gastos com pessoal caem a partir de
                2015 e os números de antes não se comparam diretamente com os de hoje.{" "}
                <Externa href={doc(/Relat.rio e Contas 2024/i)}>Relatório e contas 2024 ↗</Externa>
              </p>
            </li>
            <li>
              <p className="font-semibold text-tinta">Dezembro de 2022 — passa a chamar-se TrofAmbiente</p>
              <p className="mt-1">
                Segundo o relatório e contas de 2022, a mudança de nome serviu para o adequar à atividade principal da empresa: a recolha de resíduos
                urbanos no concelho. <Externa href={doc(/Relat.rio e Contas 2022/i)}>Relatório e contas 2022 ↗</Externa>
              </p>
            </li>
          </ol>
        </section>

        <section aria-label="Subsídio da Câmara">
          <Titulo
            id="subsidio"
            texto={
              <>
                <p>
                  Em cada ano, a Câmara e a empresa assinam um contrato-programa. Na cláusula da &ldquo;comparticipação financeira&rdquo;, a Câmara
                  compromete-se a pagar um subsídio à exploração, em prestações mensais. O gráfico mostra o valor com que cada contrato foi assinado e,
                  ao lado, o que a empresa registou nas contas como subsídios à exploração.
                </p>
                <p className="text-sm text-apagado">
                  Os dois valores nem sempre coincidem. Entre 2006 e 2015, vários contratos foram alterados durante o ano (as alterações estão na tabela);
                  a adenda de 2015, por exemplo, subiu o subsídio desse ano para 521 581,32 €. Nos relatórios de 2010 a 2012, a empresa escreve que o
                  subsídio registado foi &ldquo;ajustado ao equilíbrio dos resultados&rdquo;. E a rubrica das contas pode incluir outros apoios: em 2025,
                  além de 1 150 000 € do contrato-programa, inclui subsídios do Fundo Ambiental e do Norte 2030.
                </p>
              </>
            }
          >
            Subsídio da Câmara (contrato-programa)
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={periodos}
              series={[
                { nome: "Contrato-programa (valor assinado)", valores: anos.map((a) => contratoEm(a)?.subsidio ?? null) },
                { nome: "Subsídios à exploração nas contas", valores: anos.map((a) => contaEm(a)?.subsidiosExploracao ?? null) },
              ]}
              unidade="€"
              emMilhoes
              semComparar
              nivel
            />
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm" style={{ minWidth: "44rem" }}>
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ano</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Contrato-programa (valor assinado)</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Face ao ano anterior</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Subsídios à exploração nas contas</th>
                  <th scope="col" className="px-4 py-3 font-medium">Documentos</th>
                </tr>
              </thead>
              <tbody>
                {[...contratos].reverse().map((c) => {
                  const ant = contratoEm(c.ano - 1);
                  const conta = contaEm(c.ano);
                  const alt = alteracoesDe(c.ano);
                  return (
                    <tr key={c.ano} className="border-t border-linha align-top tabular-nums">
                      <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">{c.ano}</th>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{euros(c.subsidio)}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{ant ? pc(variacao(ant.subsidio, c.subsidio)) : "—"}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{conta ? euros(conta.subsidiosExploracao) : "—"}</td>
                      <td className="px-4 py-2.5">
                        <Externa href={c.url}>Contrato ↗</Externa>
                        {alt.map((a) => (
                          <span key={a.url}>
                            {" · "}
                            <Externa href={a.url}>{rotuloAlteracao(a.titulo)} ↗</Externa>
                          </span>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-texto">
            De 2016 a 2020 o subsídio do contrato-programa foi o mesmo todos os anos ({euros(de2020?.subsidio)}). Depois passou para{" "}
            {euros(contratoEm(2021)?.subsidio)} em 2021 e 2022, {euros(contratoEm(2023)?.subsidio)} em 2023, {euros(contratoEm(2024)?.subsidio)} em 2024,{" "}
            {euros(contratoEm(2025)?.subsidio)} em 2025 e {euros(contratoEm(2026)?.subsidio)} em 2026. O contrato-programa de {ultimoContrato.ano + 1} ainda
            não estava publicado no site da empresa na data da recolha.
          </p>
        </section>

        <section aria-label="Contas">
          <Titulo
            id="contas"
            texto={
              <>
                <p>
                  A demonstração dos resultados de cada ano, tal como a empresa a publica no relatório e contas. Os relatórios são digitalizações: os
                  valores foram passados da página indicada e conferidos, ao cêntimo, pelas somas da própria demonstração.
                </p>
                <p className="text-sm text-apagado">
                  A partir de abril de 2015 a empresa deixou o saneamento (ver em cima), por isso as vendas e os gastos com pessoal de antes e de depois
                  não se comparam diretamente. Os valores de 2009 vêm da coluna comparativa do relatório de 2010, o primeiro feito com as regras de
                  contabilidade atuais (SNC).
                </p>
              </>
            }
          >
            Contas da empresa
          </Titulo>
          <div className="max-w-3xl">
            <Grafico periodos={contas.map((c) => String(c.ano))} series={[{ nome: "Resultado líquido", valores: contas.map((c) => c.resultadoLiquido) }]} unidade="€" semComparar nivel />
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm" style={{ minWidth: "52rem" }}>
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ano</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Vendas e serviços prestados</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Subsídios à exploração</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Fornecimentos e serviços externos</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Gastos com pessoal</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Resultado líquido</th>
                  <th scope="col" className="px-3 py-3 font-medium">Fonte</th>
                </tr>
              </thead>
              <tbody>
                {[...contas].reverse().map((c) => (
                  <tr key={c.ano} className="border-t border-linha align-top tabular-nums">
                    <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">
                      {c.ano}
                      {c.nota && <sup className="ml-0.5 text-apagado">*</sup>}
                    </th>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-texto">{euros(c.vendasServicos, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-texto">{euros(c.subsidiosExploracao, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-texto">{euros(c.fornecimentosServicosExternos, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-texto">{euros(c.gastosPessoal, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-tinta">{euros(c.resultadoLiquido, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <Externa href={c.url}>
                        Relatório {c.relatorio}, p. {c.pagina} ↗
                      </Externa>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 max-w-3xl space-y-1 text-sm text-apagado">
            <p>Valores em euros, arredondados ao euro. A página indicada é a do ficheiro PDF. Gastos com sinal negativo, como na demonstração.</p>
            {contas
              .filter((c) => c.nota)
              .map((c) => (
                <p key={c.ano}>
                  * {c.nota}
                </p>
              ))}
          </div>
        </section>

        <section aria-label="Contratos públicos">
          <Titulo
            id="contratos"
            texto={
              <>
                <p>
                  Os contratos que a TrofAmbiente celebrou como entidade adjudicante e que estão publicados no Portal BASE, desde 2021. São{" "}
                  {cp.length} contratos, no valor total de {euros(totalCP, 0)}.
                </p>
                {maior && (
                  <p>
                    O maior é o de &ldquo;{(maior.objeto ?? "").replace(/\s+/g, " ").trim()}&rdquo;: {euros(maior.valor_contratual)}, por{" "}
                    {(maior.tipoprocedimento ?? "").toLowerCase()}, adjudicado a {semNif(maior.adjudicatario)} a {dataPT(maior.data_celebracao)}, com um
                    prazo de {numero(maior.prazo_execucao ?? 0, 0)} dias (cerca de {numero((maior.prazo_execucao ?? 0) / 365.25, 0)} anos).
                  </p>
                )}
              </>
            }
          >
            Contratos públicos da empresa
          </Titulo>
          <div className="overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm" style={{ minWidth: "24rem" }}>
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ano</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Contratos</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Valor total</th>
                </tr>
              </thead>
              <tbody>
                {anosCP.map((a) => {
                  const doAno = cp.filter((c) => c.ano === a);
                  return (
                    <tr key={a} className="border-t border-linha tabular-nums">
                      <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">{a}</th>
                      <td className="px-4 py-2.5 text-right text-texto">{doAno.length}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{euros(doAno.reduce((s, c) => s + (c.valor_contratual ?? 0), 0))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <details className="mt-4 rounded-xl border border-linha bg-fundo p-4">
            <summary className="cursor-pointer font-medium text-tinta">Ver os {cp.length} contratos</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth: "48rem" }}>
                <thead className="text-left text-apagado">
                  <tr>
                    <th scope="col" className="px-2 py-2 font-medium">Data</th>
                    <th scope="col" className="px-2 py-2 font-medium">Objeto</th>
                    <th scope="col" className="px-2 py-2 font-medium">Adjudicatário</th>
                    <th scope="col" className="px-2 py-2 font-medium">Procedimento</th>
                    <th scope="col" className="px-2 py-2 text-right font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {cp.map((c) => (
                    <tr key={c.idcontrato} className="border-t border-linha align-top">
                      <td className="whitespace-nowrap px-2 py-2 tabular-nums text-texto">{dataPT(c.data_celebracao)}</td>
                      <td className="px-2 py-2 text-texto">
                        <Externa href={`https://www.base.gov.pt/Base4/pt/detalhe/?type=contratos&id=${c.idcontrato}`}>{c.objeto ?? "—"}</Externa>
                      </td>
                      <td className="px-2 py-2 text-texto">{semNif(c.adjudicatario)}</td>
                      <td className="px-2 py-2 text-texto">{c.tipoprocedimento ?? "—"}</td>
                      <td className="whitespace-nowrap px-2 py-2 text-right tabular-nums text-texto">{euros(c.valor_contratual)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>

        <section aria-label="Água, saneamento e piscinas">
          <Titulo
            id="agua"
            texto={
              <>
                <p>Nem todos os serviços públicos do concelho são da Câmara ou da empresa municipal:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>
                    <strong className="font-semibold text-tinta">Água:</strong> o abastecimento está concessionado à Indaqua (Indaqua Santo Tirso/Trofa),
                    uma empresa privada. A TrofAmbiente fiscaliza a concessão por conta do município.
                  </li>
                  <li>
                    <strong className="font-semibold text-tinta">Saneamento:</strong> desde abril de 2015 é prestado pela Águas do Norte, ao abrigo de uma
                    parceria com o município; a TrofAmbiente acompanha e fiscaliza essa atividade.
                  </li>
                  <li>
                    <strong className="font-semibold text-tinta">Aquaplace – Academia Municipal da Trofa (piscinas):</strong> é gerido diretamente pela
                    Câmara. Nos contratos públicos do Município aparecem os nadadores-salvadores, o tratamento da água, os equipamentos e as obras do
                    Aquaplace (por exemplo, a requalificação de salas em 2023). Nos estatutos e nos contratos-programa da TrofAmbiente, o Aquaplace não
                    aparece entre as atividades da empresa.{" "}
                    <a href="/dados/contratos" className={ligacao}>
                      Contratos da Câmara
                    </a>
                  </li>
                </ul>
              </>
            }
          >
            Água, saneamento e piscinas
          </Titulo>
        </section>

        <section aria-label="Documentos">
          <Titulo
            id="documentos"
            texto={
              <p>
                Tudo o que a TrofAmbiente publica no seu <Externa href={trofambiente.site}>site ↗</Externa>, por tema. Cada ligação abre o documento
                original.
              </p>
            }
          >
            Documentos
          </Titulo>
          <div className="grid gap-4 md:grid-cols-2">
            {trofambiente.documentos.map((c) => (
              <details key={c.categoria} className="rounded-xl border border-linha bg-fundo p-4">
                <summary className="cursor-pointer font-medium text-tinta">
                  {c.categoria} <span className="text-sm font-normal text-apagado">({c.documentos.length})</span>
                </summary>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {c.documentos.map((d) => (
                    <li key={d.url}>
                      <a href={d.url} className="text-texto underline-offset-2 hover:text-trofa hover:underline" target="_blank" rel="noopener noreferrer">
                        {d.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
