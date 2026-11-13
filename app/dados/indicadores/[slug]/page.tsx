import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Grafico from "@/components/dados/Grafico";
import { colunasComDados, emMilhoes, indicadores, porSlug, temaDe, ultimo, variacaoDe } from "@/lib/dados/dados";
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

const seta = { sobe: "▲", desce: "▼", igual: "＝" } as const;

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

  const pos = tema ? tema.slugs.indexOf(slug) : -1;
  const anterior = tema && pos > 0 ? porSlug(tema.slugs[pos - 1]) : undefined;
  const seguinte = tema && pos >= 0 && pos < tema.slugs.length - 1 ? porSlug(tema.slugs[pos + 1]) : undefined;

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
      <nav aria-label="Caminho" className="text-sm text-apagado">
        <Link href="/dados" className="hover:text-tinta hover:underline">
          Início
        </Link>
        <span aria-hidden> / </span>
        {tema ? (
          <Link href={`/dados#${tema.id}`} className="hover:text-tinta hover:underline">
            {tema.titulo}
          </Link>
        ) : (
          <span>{i.categoria}</span>
        )}
      </nav>

      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-tinta md:text-5xl">{i.titulo}</h1>
      {i.texto && <p className="mt-4 max-w-2xl text-lg text-texto">{i.texto}</p>}
      <p className="mt-3 text-sm text-apagado">Fonte: {i.fonte}</p>

      {u && (
        <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-3 border-y border-linha py-6">
          <div>
            <p className="text-5xl font-bold tabular-nums tracking-tight text-tinta md:text-6xl">{compacto(u.v, i.unidade)}</p>
            <p className="mt-2 text-sm text-apagado">
              {unidadeLonga ? `${unidadeLonga} · ` : ""}
              {u.periodo}
            </p>
          </div>
          {v && (
            <p className="pb-1 text-lg tabular-nums text-texto">
              <span aria-hidden>{seta[v.sinal]}</span> {v.texto}
              <span className="ml-2 text-sm text-apagado">face ao valor anterior</span>
            </p>
          )}
        </div>
      )}

      {periodos.length >= 2 && (
        <section aria-label="Evolução" className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-tinta">Evolução</h2>
          <Grafico periodos={periodos} series={series} unidade={i.unidade} semComparar={Boolean(i.ine)} emMilhoes={milhoesDeEuros} />
        </section>
      )}

      <section aria-label="Valores por período" className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-tinta">Valores por período</h2>
        <div className="overflow-x-auto rounded-xl border border-linha">
          <table className="w-full text-sm">
            <thead className="bg-cinza text-left text-apagado">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Período
                </th>
                {colunas.map((c) => (
                  <th key={c} scope="col" className={`px-4 py-3 text-right font-medium ${c === 0 ? "text-tinta" : ""}`}>
                    {i.colunas[c]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentes.map((l) => (
                <tr key={l.periodo} className="border-t border-linha">
                  <th scope="row" className="px-4 py-2.5 text-left font-medium text-texto">
                    {l.periodo}
                  </th>
                  {colunas.map((c) => {
                    const p = l.valores[c] ?? { v: null, var: null };
                    const vv = variacaoDe(i, l.linha, c);
                    return (
                      <td key={c} className={`px-4 py-2.5 text-right tabular-nums ${c === 0 ? "bg-suave/60 font-semibold text-tinta" : "text-texto"}`}>
                        <span className="block">{milhoesDeEuros ? milhoes(p.v) : valor(p.v, i.unidade)}</span>
                        {vv && (
                          <span className="block text-xs font-normal text-apagado">
                            {seta[vv.sinal]} {vv.texto}
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
        {u && (milhoesDeEuros || sufixo(i.unidade) === "") && unidadeLonga && (
          <p className="mt-3 text-sm text-apagado">
            Unidade: {unidadeLonga.replace(/.$/, "")}
            {milhoesDeEuros ? " (M€)" : ""}.
          </p>
        )}
        <p className="mt-2 text-sm text-apagado">
          A seta mostra a variação em relação ao período anterior da série
          {emPercentagem ? ", em pontos percentuais (p.p.), porque o indicador já é uma percentagem" : ", em percentagem"}. Uma linha
          sem seta é o primeiro valor da série ou não tem valor anterior.
        </p>
        {i.colunas.includes("Ave e concelhos vizinhos") && (
          <p className="mt-2 text-sm text-apagado">
            “Ave e concelhos vizinhos” é um agregado que já vem feito do portal de onde se recolheram estes dados (ver{" "}
            <Link href="/dados/fontes" className="underline underline-offset-2 hover:text-tinta">
              Fontes
            </Link>
            ).
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
    </article>
  );
}
