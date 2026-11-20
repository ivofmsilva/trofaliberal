import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoCSV from "@/components/dados/BotaoCSV";
import { Seta } from "@/components/dados/CartaoIndicador";
import Grafico from "@/components/dados/Grafico";
import OitoConcelhos from "@/components/dados/OitoConcelhos";
import { ROTULO_GRUPO } from "@/lib/dados/rotulos";
import { atualizado, colunasComDados, comparavelEmNivel, emMilhoes, indicadores, porSlug, rotuloColuna, temaDe, ultimo, variacaoDe } from "@/lib/dados/dados";
import { compacto, legenda, milhoes, sufixo, valor } from "@/lib/dados/formatar";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return indicadores.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = porSlug(slug);
  return i ? { title: i.titulo, description: `${i.titulo} na Trofa, por ano. Fonte: ${i.fonte}.` } : {};
}

// Ligação à fonte: a página do indicador no INE (pelo código) ou a da entidade.
function ligacaoFonte(i: { ine?: string; fonte: string }): { nome: string; url: string } | null {
  if (i.ine) return { nome: "Ver no INE", url: `https://www.ine.pt/xportal/xmain?xpid=INE&xpgid=ine_indicadores&indOcorrCod=${i.ine}&contexto=bd&selTab=tab2` };
  if (i.fonte.startsWith("IEFP")) return { nome: "Ver no IEFP", url: "https://www.iefp.pt/estatisticas" };
  if (i.fonte.startsWith("DGAL")) return { nome: "Ver no Portal Autárquico", url: "https://portalautarquico.dgal.gov.pt/" };
  if (i.fonte.startsWith("DGEG")) return { nome: "Ver na DGEG", url: "https://www.dgeg.gov.pt/" };
  if (i.fonte.startsWith("APA")) return { nome: "Ver na APA", url: "https://apambiente.pt/" };
  return null;
}

// Como se calculou a coluna dos 8 concelhos próximos neste indicador.
function comoGrupo(i: { slug: string; metodoGrupo?: string }): string {
  if (i.slug === "densidade_populacional") return "Aqui, o valor dos 8 concelhos próximos é o total de habitantes dos 8 a dividir pela área dos 8.";
  if (/^(taxa_abstencao|votos_brancos|votos_nulos|partido_mais_votado)/.test(i.slug) && i.metodoGrupo === "ponderada")
    return "Aqui, o valor dos 8 concelhos próximos é a média dos 8 pesada pelos eleitores inscritos em cada concelho.";
  switch (i.metodoGrupo) {
    case "soma":
      return "Aqui, o valor dos 8 concelhos próximos é a soma dos 8.";
    case "media":
      return "Aqui, o valor dos 8 concelhos próximos é a média simples dos valores dos 8 (uma aproximação: a mediana do conjunto não é pública).";
    case "ponderada":
      return "Aqui, o valor dos 8 concelhos próximos é a média dos 8 pesada pela população de cada concelho.";
    case "razão das somas":
      return "Aqui, o valor dos 8 concelhos próximos calcula-se com os totais dos 8 (a soma dos numeradores a dividir pela soma dos denominadores).";
    case "portal":
      return "Aqui, o valor dos 8 concelhos próximos vem já calculado do portal de onde partiu a recolha (ver Fontes).";
    default:
      return "";
  }
}

export default async function Pagina({ params }: Props) {
  const { slug } = await params;
  const i = porSlug(slug);
  if (!i) notFound();

  const tema = temaDe(slug);
  const u = ultimo(i);
  const v = u ? variacaoDe(i, u.linha) : null;
  const cres = i.linhas; // do mais antigo para o mais recente
  const periodos = cres.map((l) => l.periodo);
  // Uma coluna de comparação sem nenhum valor não entra no gráfico nem na tabela.
  const colunas = colunasComDados(i);
  const semDados = i.colunas.filter((_, c) => !colunas.includes(c));
  const series = colunas.map((c) => ({ nome: i.colunas[c], valores: cres.map((l) => l.valores[c]?.v ?? null) }));
  const recentes = cres.map((l, linha) => ({ ...l, linha })).reverse();
  const milhoesDeEuros = emMilhoes(i);
  const emPercentagem = i.unidade.startsWith("%");
  const unidadeLonga = milhoesDeEuros ? "milhões de euros" : legenda(i.unidade);

  // o último período com o valor de cada um dos 8 concelhos (só nos indicadores que recolhemos nós)
  const comOito = [...cres].reverse().find((l) => l.concelhos && l.concelhos.Trofa != null && Object.values(l.concelhos).filter((x) => x != null).length >= 2);

  const fonte = ligacaoFonte(i);
  const pos = tema ? tema.slugs.indexOf(slug) : -1;
  const anterior = tema && pos > 0 ? porSlug(tema.slugs[pos - 1]) : undefined;
  const seguinte = tema && pos >= 0 && pos < tema.slugs.length - 1 ? porSlug(tema.slugs[pos + 1]) : undefined;

  return (
    <article>
      <div className="topo-escuro">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <nav aria-label="Caminho" className="text-sm text-apagado">
        <Link href="/dados" className="inline-block py-2 hover:text-tinta hover:underline">
          Início
        </Link>
        <span aria-hidden> / </span>
        {tema ? (
          <Link href={`/dados#${tema.id}`} className="inline-block py-2 hover:text-tinta hover:underline">
            {tema.titulo}
          </Link>
        ) : (
          <Link href="/dados/indicadores" className="inline-block py-2 hover:text-tinta hover:underline">
            Todos os indicadores
          </Link>
        )}
      </nav>

      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-tinta md:text-5xl">{i.titulo}</h1>
      {i.texto && <p className="mt-4 max-w-2xl text-lg text-texto">{i.texto}</p>}
      <p className="mt-3 text-sm text-apagado">
        Fonte: {i.fonte}
        {fonte && (
          <>
            {" · "}
            <a href={fonte.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-trofa underline underline-offset-2">
              {fonte.nome} ↗
            </a>
          </>
        )}
        {i.origem === "portal" ? (
          <>
            {" · "}valores do portal de origem (ver{" "}
            <Link href="/dados/fontes" className="underline underline-offset-2 hover:text-tinta">
              Fontes
            </Link>
            )
          </>
        ) : (
          <>{" · "}atualizado a {atualizado ?? "—"}</>
        )}
      </p>
      {i.notaColunas && <p className="mt-1 text-sm text-apagado">{i.notaColunas}</p>}

      {u && (
        <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-3 border-y border-linha py-6">
          <div>
            <p className="text-5xl font-bold tabular-nums tracking-tight text-trofa md:text-6xl">{compacto(u.v, i.unidade)}</p>
            <p className="mt-2 text-sm text-apagado">
              {unidadeLonga ? `${unidadeLonga} · ` : ""}
              {u.periodo}
            </p>
          </div>
          {v && (
            <p className="pb-1 text-lg tabular-nums text-texto">
              <Seta sinal={v.sinal} /> {v.texto}
              <span className="ml-2 text-sm text-apagado">face a {v.desde}</span>
            </p>
          )}
        </div>
      )}
      </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 md:pb-14">
      {periodos.length >= 2 && (
        <section aria-label="Evolução" className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-tinta">Evolução</h2>
          <Grafico periodos={periodos} series={series} unidade={i.unidade} emMilhoes={milhoesDeEuros} nivel={comparavelEmNivel(i)} />
        </section>
      )}

      {comOito?.concelhos && <OitoConcelhos periodo={comOito.periodo} concelhos={comOito.concelhos} unidade={i.unidade} emMilhoes={milhoesDeEuros} />}

      <section aria-label="Valores por período" className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-tinta">Valores por período</h2>
        <div className="overflow-x-auto rounded-xl border border-linha">
          <table className="w-full text-sm">
            <thead className="bg-cinza text-left text-apagado">
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-cinza px-2 py-3 font-medium sm:px-4">
                  Período
                </th>
                {colunas.map((c) => (
                  <th key={c} scope="col" className={`px-2 py-3 text-right font-medium sm:px-4 ${c === 0 ? "text-tinta" : ""}`}>
                    {i.colunas[c] === "Área Metropolitana do Porto" ? (
                      <>
                        <abbr title="Área Metropolitana do Porto" className="no-underline sm:hidden">
                          AMP
                        </abbr>
                        <span className="hidden sm:inline">Área Metropolitana do Porto</span>
                      </>
                    ) : i.colunas[c] === "Ave e concelhos vizinhos" ? (
                      ROTULO_GRUPO
                    ) : (
                      i.colunas[c]
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentes.map((l) => (
                <tr key={l.periodo} className="border-t border-linha">
                  <th scope="row" className="sticky left-0 z-10 whitespace-nowrap bg-fundo px-2 py-2.5 text-left font-medium text-texto sm:px-4">
                    {l.periodo}
                  </th>
                  {colunas.map((c) => {
                    const p = l.valores[c] ?? { v: null, var: null };
                    const vv = variacaoDe(i, l.linha, c);
                    return (
                      <td key={c} className={`px-2 py-2.5 text-right tabular-nums sm:px-4 ${c === 0 ? "bg-trofa-suave font-semibold text-trofa" : "text-texto"}`}>
                        <span className="block whitespace-nowrap">{milhoesDeEuros ? milhoes(p.v) : valor(p.v, i.unidade)}</span>
                        {vv && (
                          <span className="block whitespace-nowrap text-xs font-normal text-apagado">
                            <Seta sinal={vv.sinal} /> {vv.texto}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <BotaoCSV
            nome={i.slug}
            cabecalho={["Período", ...colunas.map((c) => (i.colunas[c] === "Ave e concelhos vizinhos" ? rotuloColuna(i.colunas[c]) : i.colunas[c]))]}
            linhas={cres.map((l) => [l.periodo, ...colunas.map((c) => l.valores[c]?.v ?? null)])}
          />
        </div>
        {u && (milhoesDeEuros || sufixo(i.unidade) === "") && unidadeLonga && (
          <p className="mt-3 text-sm text-apagado">
            Unidade: {unidadeLonga.replace(/\.$/, "")}
            {milhoesDeEuros ? " (M€)" : ""}.
          </p>
        )}
        <p className="mt-2 text-sm text-apagado">
          A seta mostra a variação em relação ao período anterior com valor
          {emPercentagem ? ", em pontos percentuais (p.p.), porque o indicador já é uma percentagem" : ", em percentagem"}. Uma linha
          sem seta é o primeiro valor da série ou não tem valor anterior.
        </p>
        {i.colunas.includes("Ave e concelhos vizinhos") && (
          <p className="mt-2 text-sm text-apagado">
            Os “8 concelhos próximos” são a Trofa, Santo Tirso, a Maia, Vila do Conde, Vila Nova de Famalicão,
            Guimarães, Vizela e Fafe. {comoGrupo(i)} Mais em{" "}
            <Link href="/dados/fontes" className="underline underline-offset-2 hover:text-tinta">
              Fontes e método
            </Link>
            .
          </p>
        )}
        {semDados.length > 0 && (
          <p className="mt-2 text-sm text-apagado">
            Sem valores de {semDados.join(" e ")} para este indicador: {semDados.length === 1 ? "a coluna não se mostra" : "as colunas não se mostram"}.
          </p>
        )}
      </section>

      {(anterior || seguinte) && (
        <nav aria-label="Outros indicadores" className="mt-14 grid gap-4 border-t border-linha pt-8 sm:grid-cols-2">
          {anterior ? (
            <Link href={`/dados/indicadores/${anterior.slug}`} className="rounded-xl border border-linha p-4 transition hover:border-tinta">
              <span className="text-xs text-apagado">← Anterior</span>
              <span className="mt-1 block font-semibold text-tinta">{anterior.titulo}</span>
            </Link>
          ) : (
            <span />
          )}
          {seguinte && (
            <Link href={`/dados/indicadores/${seguinte.slug}`} className="rounded-xl border border-linha p-4 text-right transition hover:border-tinta">
              <span className="text-xs text-apagado">Seguinte →</span>
              <span className="mt-1 block font-semibold text-tinta">{seguinte.titulo}</span>
            </Link>
          )}
        </nav>
      )}
      </div>
    </article>
  );
}
