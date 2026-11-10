import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Grafico from "@/components/dados/Grafico";
import { indicadores, porSlug, temaDe, ultimo } from "@/lib/dados/dados";
import { compacto, legenda, sufixo, valor, variacao } from "@/lib/dados/formatar";

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
  const v = variacao(u?.var ?? null);
  const cres = i.linhas; // do mais antigo para o mais recente
  const periodos = cres.map((l) => l.periodo);
  const series = i.colunas.map((nome, c) => ({ nome, valores: cres.map((l) => l.valores[c]?.v ?? null) }));
  const recentes = [...cres].reverse();

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
      <p className="mt-3 text-sm text-apagado">Fonte: {i.fonte}</p>

      {u && (
        <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-3 border-y border-linha py-6">
          <div>
            <p className="text-5xl font-bold tabular-nums tracking-tight text-tinta md:text-6xl">{compacto(u.v, i.unidade)}</p>
            <p className="mt-2 text-sm text-apagado">
              {legenda(i.unidade) ? `${legenda(i.unidade)} · ` : ""}
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
          <Grafico periodos={periodos} series={series} unidade={i.unidade} />
        </section>
      )}

      <section aria-label="Valores por período" className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-tinta">Valores por período</h2>
        <div className="overflow-x-auto rounded-xl border border-linha">
          <table className="w-full text-sm">
            <thead className="bg-suave text-left text-apagado">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Período
                </th>
                {i.colunas.map((c, k) => (
                  <th key={c} scope="col" className={`px-4 py-3 text-right font-medium ${k === 0 ? "text-tinta" : ""}`}>
                    {c}
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
                  {l.valores.map((p, k) => {
                    const vv = variacao(p.var);
                    return (
                      <td key={k} className={`px-4 py-2.5 text-right tabular-nums ${k === 0 ? "bg-suave/60 font-semibold text-tinta" : "text-texto"}`}>
                        <span className="block">{valor(p.v, i.unidade)}</span>
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
        {u && sufixo(i.unidade) === "" && legenda(i.unidade) && (
          <p className="mt-3 text-sm text-apagado">Unidade: {legenda(i.unidade)}.</p>
        )}
        <p className="mt-2 text-sm text-apagado">
          A seta mostra a variação em relação ao período anterior da série. Uma linha sem seta é o primeiro valor da série ou
          não tem valor anterior.
        </p>
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
