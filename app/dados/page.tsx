import Link from "next/link";
import ListaTemas, { type Cartao } from "@/components/dados/ListaTemas";
import { Seta } from "@/components/dados/CartaoIndicador";
import {
  atualizado,
  comparacaoUltimo,
  comparavelEmNivel,
  emMilhoes,
  indicadores,
  indicadoresDestaque,
  NOME_GRUPO,
  porTema,
  serieColuna,
  temaDe,
  ultimo,
  variacaoDe,
  type Indicador,
} from "@/lib/dados/dados";
import { ROTULO_GRUPO } from "@/lib/dados/rotulos";
import { compacto, legenda } from "@/lib/dados/formatar";
import { corDoTema } from "@/lib/dados/temas";

const semAcentos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function resumo(i: Indicador): Cartao {
  const tema = temaDe(i.slug)?.titulo ?? "";
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
    tema,
    desde: v?.desde ?? null,
    procura: semAcentos([i.titulo, tema, i.unidade, i.texto ?? "", i.palavras ?? ""].join(" ")),
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
      texto: nivel ? compacto(c.v, i.unidade) : (c.variacao?.texto ?? "—"),
      sinal: nivel ? null : (c.variacao?.sinal ?? null),
      // barra só quando se comparam valores (subir e descer não se medem na mesma barra)
      fracao: nivel && maximo > 0 && base[k] !== null ? (base[k] as number) / maximo : null,
    })),
  };
}

export default function Inicio() {
  // No topo: 3 números em destaque. Na frase do grupo diz-se se é a variação ou o valor. (Os contratos e os fundos europeus
  // não aparecem aqui, para não misturar: estão no menu "Contratos e fundos".)
  const factos = indicadoresDestaque()
    .slice(0, 3)
    .map((i) => {
      const r = resumo(i);
      const g = r.comparacao?.find((c) => c.nome === ROTULO_GRUPO);
      return { ...r, grupo: g ? { texto: g.texto, sinal: g.sinal } : null };
    });
  const temas = porTema().map((t) => ({
    id: t.id,
    titulo: t.titulo,
    texto: t.texto,
    cor: corDoTema(t.id),
    verTambem: t.verTambem,
    itens: t.itens.map(resumo),
  }));
  const destaques = indicadoresDestaque().map(resumo);
  const total = indicadores.length;
  const caixaFacto = "block h-full rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 transition hover:bg-white/[0.12] sm:p-5";

  return (
    <div className="bg-papel">
      <section className="relative overflow-hidden bg-noite text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(107,63,212,.55),rgba(107,63,212,0)_70%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12 md:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c9bbf6]">Dados abertos · fontes oficiais</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">A Trofa em números</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 sm:mt-4 sm:text-lg">
            <b className="font-semibold text-white">Portal de dados abertos sobre o concelho da Trofa.</b> Os números são os das
            fontes oficiais (INE, IEFP, DGAL e outras), sem comentários nem leitura política.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-4">
            {factos.map((f) => (
              <li key={f.slug}>
                <Link href={`/dados/indicadores/${f.slug}`} className={caixaFacto}>
                  <p className="text-sm font-semibold text-white/80">
                    {f.titulo} · {f.periodo}
                  </p>
                  <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight sm:text-4xl">{f.valor}</p>
                  <p className="mt-2 text-sm text-white/85">
                    {f.variacao && f.sinal && (
                      <b className="whitespace-nowrap font-semibold text-white">
                        <Seta sinal={f.sinal} /> {f.variacao}
                        {f.desde ? ` face a ${f.desde}` : ""}
                      </b>
                    )}
                    {f.grupo && (
                      <span className="mt-0.5 hidden text-white/70 sm:block">
                        {f.grupo.sinal ? "8 concelhos próximos: " : "Nos 8 concelhos próximos: "}
                        <span className="whitespace-nowrap">
                          {f.grupo.sinal && <Seta sinal={f.grupo.sinal} />} {f.grupo.texto}
                        </span>
                      </span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/70">
            {total} indicadores · atualizado a {atualizado ?? "—"} ·{" "}
            <Link href="/dados/fontes" className="underline underline-offset-2 hover:text-white">
              fontes e método
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <ListaTemas temas={temas} destaques={destaques} total={total} />
      </div>

    </div>
  );
}
