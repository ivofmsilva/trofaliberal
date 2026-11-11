import Link from "next/link";
import ListaTemas, { type Cartao } from "@/components/dados/ListaTemas";
import { atualizado, indicadoresDestaque, porTema, serieTrofa, ultimo, type Indicador } from "@/lib/dados/dados";
import { compacto, legenda, variacao } from "@/lib/dados/formatar";

function resumo(i: Indicador): Cartao {
  const u = ultimo(i);
  const v = variacao(u?.var ?? null);
  return {
    slug: i.slug,
    titulo: i.titulo,
    valor: compacto(u?.v ?? null, i.unidade),
    legenda: legenda(i.unidade),
    periodo: u?.periodo ?? "",
    variacao: v?.texto ?? null,
    sinal: v?.sinal ?? null,
    pontos: serieTrofa(i).map((p) => p.v),
  };
}

const seta = { sobe: "▲", desce: "▼", igual: "＝" } as const;

export default function Inicio() {
  const destaques = indicadoresDestaque().map(resumo);
  const temas = porTema().map((t) => ({ id: t.id, titulo: t.titulo, texto: t.texto, itens: t.itens.map(resumo) }));
  const total = temas.reduce((n, t) => n + t.itens.length, 0);

  return (
    <>
      <section className="border-b border-linha bg-gradient-to-b from-cinza to-suave">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-apagado">Dados abertos</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-tinta sm:text-5xl md:text-6xl">
            A Trofa em números
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-texto">
            Indicadores sobre o concelho da Trofa, com os dados do INE e do Pordata.
          </p>
          <p className="mt-6 text-sm text-apagado">
            {total} indicadores · última atualização {atualizado ?? "—"} ·{" "}
            <Link href="/dados/fontes" className="underline underline-offset-2 hover:text-tinta">
              fontes e método
            </Link>
          </p>
        </div>
      </section>

      <section aria-label="Principais números" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((d) => (
            <li key={d.slug} className="border-t-2 border-tinta pt-4">
              <Link href={`/dados/indicadores/${d.slug}`} className="group block">
                <p className="text-sm font-semibold text-texto group-hover:text-tinta group-hover:underline">{d.titulo}</p>
                <p className="mt-2 text-5xl font-bold tabular-nums tracking-tight text-tinta md:text-6xl">{d.valor}</p>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-3 text-sm text-apagado">
                  <span>
                    {d.legenda.length > 36 ? "índice" : d.legenda} · {d.periodo}
                  </span>
                  {d.variacao && d.sinal && (
                    <span className="tabular-nums">
                      <span aria-hidden>{seta[d.sinal]}</span> {d.variacao}
                    </span>
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Transparência" className="border-t border-linha bg-cinza">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:px-6 md:grid-cols-2">
          <Link href="/dados/contratos" className="group rounded-2xl border border-linha bg-fundo p-7 transition hover:border-tinta">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apagado">Transparência</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-tinta">Contratos públicos</h2>
            <p className="mt-2 text-texto">Os contratos celebrados pelo município, do Portal BASE: pesquisa, filtros e valores.</p>
            <span className="mt-4 inline-block text-sm font-semibold text-tinta group-hover:underline">Ver os contratos →</span>
          </Link>
          <Link href="/dados/fundos-europeus" className="group rounded-2xl border border-linha bg-fundo p-7 transition hover:border-tinta">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-apagado">Transparência</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-tinta">Fundos europeus</h2>
            <p className="mt-2 text-texto">Projetos do Portugal 2020 e do PRR com execução na Trofa.</p>
            <span className="mt-4 inline-block text-sm font-semibold text-tinta group-hover:underline">Ver os projetos →</span>
          </Link>
        </div>
      </section>

      <div id="temas" className="mx-auto max-w-6xl scroll-mt-4 px-4 sm:px-6">
        <ListaTemas temas={temas} />
      </div>
    </>
  );
}
