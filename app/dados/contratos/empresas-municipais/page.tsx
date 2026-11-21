import type { Metadata } from "next";
import Grafico from "@/components/dados/Grafico";
import AvisoDeslizar from "@/components/dados/AvisoDeslizar";
import SubNav from "@/components/dados/SubNav";
import { compacto, numero } from "@/lib/dados/formatar";
import { contaEm, contas, contratoEm, contratos, contratosPublicos, pessoasAoServico, recolhido, trofambiente, ultimoContrato } from "@/lib/dados/empresas";

export const metadata: Metadata = {
  title: "Empresas municipais",
  description:
    "A TrofAmbiente (antes Trofáguas), a empresa municipal da Trofa: subsídios dos contratos-programa, contas desde 2010, contratos públicos e documentos.",
};

const pc = (v: number | null) => (v === null ? "—" : `${v > 0 ? "+" : v < 0 ? "−" : ""}${numero(Math.abs(v), 0)}%`);
const variacao = (a: number | null | undefined, b: number | null | undefined) => (a && b ? ((b - a) / a) * 100 : null);
const euros = (v: number | null | undefined, casas = 2) => (v === null || v === undefined ? "—" : `${v < 0 ? "−" : ""}${numero(Math.abs(v), casas)} €`);
const dataPT = (iso: string | null) => (iso ? iso.split("-").reverse().join("/") : "—");
const semNif = (t: string | null) => (t ?? "—").replace(/^\s*\d{8,9}\s*-\s*/, "").trim();
const ligacao = "text-trofa underline-offset-2 hover:underline";

// Documentos da empresa, procurados pelo título (ligações para o site da TrofAmbiente)
const todos = trofambiente.documentos.flatMap((c) => c.documentos);
const doc = (re: RegExp) => todos.find((d) => re.test(d.titulo))?.url ?? trofambiente.site;
// Documentos que a TrofAmbiente lista mas cujo ficheiro dá erro 404 no site dela (verificado a 21/11/2026).
const SEM_FICHEIRO = new Set(["https://www.trofambiente.pt/upload_files/1/2/ParecerdoFiscalUnicosobreoCPacelebrarparaoanode2017.pdf"]);


function Externa({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={ligacao} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Titulo({ id, children, texto }: { id: string; children: React.ReactNode; texto?: React.ReactNode }) {
  return (
    <>
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight text-tinta">
        {children}
      </h2>
      {texto && <div className="mt-2 mb-6 max-w-3xl space-y-2 text-texto">{texto}</div>}
    </>
  );
}

export default function EmpresasMunicipais() {
  const anterior = contratoEm(ultimoContrato.ano - 1);
  const de2020 = contratoEm(2020);
  const recolha = new Date(recolhido).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
  const ultimaConta = contas[contas.length - 1];

  // Comparação só desde 2016: até 2015 os contratos foram alterados depois de assinados, vários incluíam também apoio ao
  // investimento (2007–2012) e a empresa ainda tinha o saneamento (até abril de 2015). Os contratos antigos ficam nos documentos.
  const DESDE = 2016;
  const recentes = contratos.filter((c) => c.ano >= DESDE);
  const anos = recentes.map((c) => c.ano);

  const cp = [...contratosPublicos].sort((a, b) => String(b.data_celebracao).localeCompare(String(a.data_celebracao)));
  const totalCP = cp.reduce((s, c) => s + (c.valor_contratual ?? 0), 0);
  const anosCP = [...new Set(cp.map((c) => c.ano).filter((a): a is number => a !== null))].sort((a, b) => b - a);

  const marcos: [string, string, string, string][] = [
    ["2002", "Criada a 5 de dezembro, com o nome Trofáguas e 100 000 € de capital, todo do Município.", "Escritura", doc(/Pacto Social/i)],
    ["2015", "Em abril deixa de gerir o saneamento, que passa para a Águas do Noroeste (hoje Águas do Norte).", "Relatório e contas 2024", doc(/Relat.rio e Contas 2024/i)],
    ["2022", "Em dezembro passa a chamar-se TrofAmbiente.", "Relatório e contas 2022", doc(/Relat.rio e Contas 2022/i)],
  ];

  return (
    <>
      <SubNav atual="empresas" />
      <section className="topo-escuro">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="text-4xl font-bold tracking-tight text-tinta md:text-5xl">Empresas municipais</h1>
          <p className="mt-4 max-w-2xl text-lg text-texto">
            A Trofa tem uma empresa municipal, a <strong className="font-semibold text-tinta">TrofAmbiente</strong> (até 2022, Trofáguas). Gere a
            recolha de resíduos e fiscaliza, por conta do município, o contrato da água (Indaqua) e o do saneamento (Águas do Norte). Todos os anos
            recebe da Câmara um subsídio, fixado num contrato-programa.
          </p>
          <p className="mt-3 text-sm text-apagado">Fonte: documentos publicados pela TrofAmbiente e Portal BASE, recolhidos em {recolha}.</p>
          <dl className="mt-8 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Subsídio da Câmara, {ultimoContrato.ano}</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{compacto(ultimoContrato.subsidio, "€")}</dd>
              <dd className="text-sm text-apagado">contrato-programa</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Face a {ultimoContrato.ano - 1}</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(variacao(anterior?.subsidio, ultimoContrato.subsidio))}</dd>
              <dd className="text-sm text-apagado">{compacto(anterior?.subsidio ?? null, "€")} em {ultimoContrato.ano - 1}</dd>
            </div>
            <div className="border-t-2 border-tinta pt-3">
              <dt className="text-sm text-texto">Face a 2020</dt>
              <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">{pc(variacao(de2020?.subsidio, ultimoContrato.subsidio))}</dd>
              <dd className="text-sm text-apagado">{compacto(de2020?.subsidio ?? null, "€")} em 2020</dd>
            </div>
            {ultimaConta && (
              <div className="border-t-2 border-tinta pt-3">
                <dt className="text-sm text-texto">Resultado líquido, {ultimaConta.ano}</dt>
                <dd className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-tinta">
                  {ultimaConta.resultadoLiquido < 0 ? "−" : ""}
                  {numero(Math.abs(ultimaConta.resultadoLiquido) / 1000, 0)} mil €
                </dd>
                <dd className="text-sm text-apagado">relatório e contas {ultimaConta.ano}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6">
        <section aria-label="A empresa">
          <Titulo id="empresa">A empresa</Titulo>
          <ul className="mt-4 max-w-3xl space-y-3 text-texto">
            {marcos.map(([ano, texto, fonte, url]) => (
              <li key={ano} className="grid grid-cols-[3.5rem_1fr] gap-3">
                <span className="font-semibold tabular-nums text-tinta">{ano}</span>
                <span>
                  {texto} <Externa href={url}>{fonte} ↗</Externa>
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 max-w-3xl list-disc space-y-2 pl-5 text-sm text-texto">
            <li>
              Segundo a adenda ao contrato-programa de 2015, a TrofaPark, outra empresa municipal, foi internalizada nos serviços da Câmara.{" "}
              <Externa href={doc(/^Adenda Contrato Programa 2015/i)}>Adenda ↗</Externa>
            </li>
            <li>
              As piscinas Aquaplace não aparecem nos estatutos nem nos contratos-programa da TrofAmbiente: a gestão do Aquaplace é um
              pelouro de uma vereadora da Câmara (vê os pelouros na{" "}
              <a href="/dados/camara" className={ligacao}>
                página da Câmara
              </a>
              ).
            </li>
          </ul>
        </section>

        <section aria-label="Subsídio da Câmara">
          <Titulo
            id="subsidio"
            texto={
              <p>
                Desde {DESDE}: o valor de cada contrato-programa e o que a empresa registou nas contas como subsídios à exploração, que podem incluir
                outros apoios (em 2025, do Fundo Ambiental e do Norte 2030).
              </p>
            }
          >
            Subsídio da Câmara
          </Titulo>
          <div className="max-w-3xl">
            <Grafico
              periodos={anos.map(String)}
              series={[
                { nome: "Contrato-programa", valores: anos.map((a) => contratoEm(a)?.subsidio ?? null) },
                { nome: "Subsídios à exploração nas contas", valores: anos.map((a) => contaEm(a)?.subsidiosExploracao ?? null) },
              ]}
              unidade="€"
              emMilhoes
              semComparar
              nivel
            />
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm" style={{ minWidth: "42rem" }}>
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ano</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Contrato-programa</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Variação</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Nas contas</th>
                  <th scope="col" className="px-4 py-3 font-medium">Documentos</th>
                </tr>
              </thead>
              <tbody>
                {[...recentes].reverse().map((c) => {
                  const ant = c.ano > DESDE ? contratoEm(c.ano - 1) : null;
                  const conta = contaEm(c.ano);
                  return (
                    <tr key={c.ano} className="border-t border-linha align-top tabular-nums">
                      <th scope="row" className="px-4 py-2.5 text-left font-medium text-tinta">{c.ano}</th>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{euros(c.subsidio)}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{ant ? pc(variacao(ant.subsidio, c.subsidio)) : "—"}</td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-texto">{conta ? euros(conta.subsidiosExploracao) : "—"}</td>
                      <td className="px-4 py-2.5">
                        <Externa href={c.url}>contrato ↗</Externa>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <AvisoDeslizar />
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Os contratos de {contratos[0].ano} a {DESDE - 1} estão nos <a href="#documentos" className={ligacao}>documentos</a>. Não entram aqui porque foram
            alterados depois de assinados e vários incluíam também apoio ao investimento.
          </p>
        </section>

        <section aria-label="Contas">
          <Titulo
            id="contas"
            texto={<p>Da demonstração de resultados de cada relatório e contas (página indicada). Desde abril de 2015 a empresa já não tem o saneamento.</p>}
          >
            Contas da empresa
          </Titulo>
          <div className="max-w-3xl">
            <Grafico periodos={contas.map((c) => String(c.ano))} series={[{ nome: "Resultado líquido", valores: contas.map((c) => c.resultadoLiquido) }]} unidade="€" semComparar nivel />
          </div>
          <div className="mt-6 overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm" style={{ minWidth: "42rem" }}>
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ano</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Vendas e serviços</th>
                  <th scope="col" className="px-3 py-3 text-right font-medium">Subsídios à exploração</th>
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
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-texto">{euros(c.gastosPessoal, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right font-medium text-tinta">{euros(c.resultadoLiquido, 0)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <Externa href={c.url}>
                        relatório {c.relatorio}, p. {c.pagina} ↗
                      </Externa>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AvisoDeslizar />
          <p className="mt-3 max-w-3xl text-sm text-apagado">
            Euros, arredondados. Página do ficheiro PDF.
            {contas
              .filter((c) => c.nota)
              .map((c) => (
                <span key={c.ano}> * {c.ano}: como corrigido no relatório de {c.relatorio}.</span>
              ))}
          </p>

          <h3 id="trabalhadores" className="mt-12 scroll-mt-24 text-xl font-bold tracking-tight text-tinta">Trabalhadores</h3>
          <p className="mt-2 mb-6 max-w-3xl text-texto">
            Número médio de pessoas ao serviço da empresa em cada ano. Em abril de 2015 o saneamento passou para a Águas do Noroeste (hoje Águas do Norte) e,
            segundo o relatório e contas de 2015, &ldquo;grande parte da estrutura de pessoal acompanhou essa transferência&rdquo;.
          </p>
          <div className="max-w-3xl">
            {(() => {
              const anosP = Array.from({ length: pessoasAoServico.at(-1)!.ano - pessoasAoServico[0].ano + 1 }, (_, k) => pessoasAoServico[0].ano + k);
              return (
                <Grafico
                  periodos={anosP.map(String)}
                  series={[{ nome: "Número médio de pessoas ao serviço", valores: anosP.map((a) => pessoasAoServico.find((p) => p.ano === a)?.media ?? null) }]}
                  unidade="pessoas"
                  semComparar
                  nivel
                  casas={0}
                />
              );
            })()}
          </div>
          <details className="mt-3 text-sm text-apagado">
            <summary className="cursor-pointer hover:text-tinta">
              Fonte: nota dos gastos com o pessoal de cada relatório e contas. Ver as páginas
            </summary>
            <p className="mt-2 max-w-3xl">
              {pessoasAoServico.map((p, k) => (
                <span key={p.ano}>
                  {k > 0 ? " · " : ""}
                  <Externa href={doc(new RegExp(`^Relat.rio e contas ${p.ano}$`, "i"))}>
                    {p.ano}: {p.media}, p. {p.pagina} ↗
                  </Externa>
                </span>
              ))}
              . Página do ficheiro PDF. Não há número para 2010 e 2011. O relatório de 2014 repete o quadro de 2013.
            </p>
          </details>
        </section>

        <section aria-label="Contratos públicos">
          <Titulo
            id="contratos"
            texto={
              <p>
                Contratos celebrados pela TrofAmbiente de {anosCP[anosCP.length - 1]} a {anosCP[0]}, publicados no Portal BASE: {cp.length}, no valor de{" "}
                {euros(totalCP, 0)}.
              </p>
            }
          >
            Contratos públicos da empresa
          </Titulo>
          <div className="overflow-x-auto rounded-xl border border-linha">
            <table className="w-full text-sm" style={{ minWidth: "20rem" }}>
              <thead className="bg-cinza text-left text-apagado">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ano</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Contratos</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Valor</th>
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
              <table className="w-full text-sm" style={{ minWidth: "46rem" }}>
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
            <AvisoDeslizar />
          </details>
        </section>

        <section aria-label="Documentos">
          <Titulo
            id="documentos"
            texto={
              <p>
                O que a TrofAmbiente publica no seu <Externa href={trofambiente.site}>site ↗</Externa>, por tema.
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
                      {SEM_FICHEIRO.has(d.url) ? (
                        <span className="text-apagado">{d.titulo} (o ficheiro não abre no site da TrofAmbiente)</span>
                      ) : (
                        <a href={d.url} className="text-texto underline-offset-2 hover:text-trofa hover:underline" target="_blank" rel="noopener noreferrer">
                          {d.titulo}
                        </a>
                      )}
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
