import Link from "next/link";
import ListaTemas, { type Cartao } from "@/components/dados/ListaTemas";
import {
  atualizado,
  comparacaoUltimo,
  comparavelEmNivel,
  emMilhoes,
  indicadoresDestaque,
  NOME_GRUPO,
  porTema,
  serieColuna,
  ultimo,
  variacaoDe,
  type Indicador,
} from "@/lib/dados/dados";
import { compacto, legenda } from "@/lib/dados/formatar";
import { corDoTema } from "@/lib/dados/temas";
import { contratos } from "@/lib/dados/transparencia";

const seta = { sobe: "▲", desce: "▼", igual: "＝" } as const;

function resumo(i: Indicador): Cartao {
  const u = ultimo(i);
  const v = u ? variacaoDe(i, u.linha) : null;
  const nivel = comparavelEmNivel(i);
  const comp = comparacaoUltimo(i);
  // Compara-se o valor (taxas, por habitante, medianas) ou, quando o grupo é uma soma, a variação de cada um.
  const base = comp.map((c) => (nivel ? (c.v === null ? null : Math.abs(c.v)) : c.varBruta === null ? null : Math.abs(c.varBruta)));
  const maximo = Math.max(0, ...base.filter((x): x is number => x !== null));
  const g = i.colunas.indexOf(NOME_GRUPO);
  return {
    slug: i.slug,
    titulo: i.titulo,
    valor: compacto(u?.v ?? null, i.unidade),
    legenda: emMilhoes(i) ? "milhões de euros" : legenda(i.unidade),
    periodo: u?.periodo ?? "",
    variacao: v?.texto ?? null,
    sinal: v?.sinal ?? null,
    pontos: serieColuna(i, 0),
    grupo: g > 0 ? serieColuna(i, g) : undefined,
    mesmaEscala: nivel,
    comparacao: comp.map((c, k) => ({
      nome: c.nome,
      trofa: c.trofa,
      texto: nivel ? compacto(c.v, i.unidade) : c.variacao ? `${seta[c.variacao.sinal]} ${c.variacao.texto}` : "—",
      fracao: maximo > 0 && base[k] !== null ? (base[k] as number) / maximo : null,
    })),
  };
}

export default function Inicio() {
  const factos = indicadoresDestaque()
    .slice(0, 3)
    .map((i) => {
      const r = resumo(i);
      return { ...r, grupo: r.comparacao?.find((c) => c.nome === "Grupo dos 8")?.texto ?? null };
    });
  const temas = porTema().map((t) => ({
    id: t.id,
    titulo: t.titulo,
    texto: t.texto,
    cor: corDoTema(t.id),
    principais: t.principais,
    itens: t.itens.map(resumo),
  }));
  const total = temas.reduce((n, t) => n + t.itens.length, 0);
  const caixaFacto = "block h-full rounded-2xl border border-white/15 bg-white/[0.07] p-5 transition hover:bg-white/[0.12]";

  return (
    <div className="bg-papel">
      <section className="relative overflow-hidden bg-noite text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(107,63,212,.55),rgba(107,63,212,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b9a7f3]">Dados abertos · fontes oficiais</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">A Trofa em números</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Indicadores oficiais do concelho, comparados com o grupo dos 8 concelhos do Ave e vizinhos, a Área Metropolitana do
            Porto e o país. Cada número liga à sua fonte.
          </p>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {factos.map((f) => (
              <li key={f.slug}>
                <Link href={`/dados/indicadores/${f.slug}`} className={caixaFacto}>
                  <p className="text-sm font-semibold text-white/75">
                    {f.titulo} · {f.periodo}
                  </p>
                  <p className="mt-1.5 text-4xl font-bold tabular-nums tracking-tight">{f.valor}</p>
                  <p className="mt-2 text-sm text-white/85">
                    {f.variacao && f.sinal && (
                      <b className="font-semibold text-white">
                        {seta[f.sinal]} {f.variacao}
                      </b>
                    )}
                    {f.grupo && <span className="text-white/60"> · grupo dos 8: {f.grupo}</span>}
                  </p>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/dados/contratos" className={caixaFacto}>
                <p className="text-sm font-semibold text-white/75">Contratos públicos da Câmara</p>
                <p className="mt-1.5 text-4xl font-bold tabular-nums tracking-tight">{contratos.length.toLocaleString("pt-PT")}</p>
                <p className="mt-2 text-sm text-white/60">no Portal BASE, todos pesquisáveis</p>
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-sm text-white/55">
            {total} indicadores · última atualização {atualizado ?? "—"} ·{" "}
            <Link href="/dados/fontes" className="underline underline-offset-2 hover:text-white">
              fontes e método
            </Link>
          </p>
        </div>
      </section>

      <section aria-label="Explorar por tema" className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-tinta md:text-3xl">Explorar por tema</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {temas.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="flex h-full items-center gap-3 rounded-2xl border border-linha bg-fundo p-4 transition hover:border-trofa">
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold"
                  style={{ background: t.cor.fundo, color: t.cor.tinta }}
                >
                  {t.cor.sigla}
                </span>
                <span>
                  <span className="block text-sm font-bold leading-tight text-tinta">{t.titulo}</span>
                  <span className="text-xs text-apagado">
                    {t.itens.length} {t.itens.length === 1 ? "indicador" : "indicadores"}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Transparência" className="mx-auto grid max-w-6xl gap-4 px-4 pt-8 sm:px-6 md:grid-cols-2">
        <Link href="/dados/contratos" className="group rounded-2xl border border-linha bg-fundo p-6 transition hover:border-trofa">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-apagado">Transparência</p>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-tinta">Contratos públicos</h2>
          <p className="mt-1.5 text-texto">Os contratos celebrados pelo município, do Portal BASE: pesquisa, filtros e valores.</p>
          <span className="mt-3 inline-block text-sm font-semibold text-trofa group-hover:underline">Ver os contratos →</span>
        </Link>
        <Link href="/dados/fundos-europeus" className="group rounded-2xl border border-linha bg-fundo p-6 transition hover:border-trofa">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-apagado">Transparência</p>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-tinta">Fundos europeus</h2>
          <p className="mt-1.5 text-texto">Projetos do Portugal 2020 e do PRR com execução na Trofa.</p>
          <span className="mt-3 inline-block text-sm font-semibold text-trofa group-hover:underline">Ver os projetos →</span>
        </Link>
      </section>

      <div id="temas" className="mx-auto max-w-6xl scroll-mt-4 px-4 sm:px-6">
        <ListaTemas temas={temas} />
      </div>
    </div>
  );
}
