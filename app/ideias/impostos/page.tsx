import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroImpostos from "@/components/HeroImpostos";
import { formatarData, itens } from "@/lib/imprensa";
import SimuladorIMI from "@/components/SimuladorIMI";
import SimuladorIRS from "@/components/SimuladorIRS";
import Taxometro from "@/components/Taxometro";
import Grafico from "@/components/dados/Grafico";
import { porSlug } from "@/lib/dados/dados";
import { FONTE_ORCAMENTO, receitaPorImposto } from "@/lib/dados/financas";
import { derrama, imi, imiFamiliar, irs } from "@/lib/dados/taxas";
import { areas } from "@/lib/propostas";

export const metadata: Metadata = {
  title: "Impostos na Trofa — Iniciativa Liberal Trofa",
  description:
    "Quanto a Câmara da Trofa cobra em impostos e taxas, quanto pagas de IMI e de IRS municipal, e o que propomos: menos impostos, mais liberdade.",
};

const etiqueta = "text-sm font-bold uppercase tracking-[0.25em]";

// Orçamento de 2026 da Câmara (Relatório do Orçamento de 2026, Quadro 4, pág. 82): impostos diretos (IMI, IMT, IUC e
// derrama) e taxas, multas e outras penalidades. Aprovado pela Câmara a 18/12/2025 e pela Assembleia a 29/12/2025.
// Cada imposto: Quadro 6 (Receitas fiscais); somam os 13 537 113,41 € com 200 € de impostos abolidos e diversos.
// A parte do IRS não está aqui: no orçamento é uma transferência do Estado (06.03.01.06), não um imposto direto.
const ORCAMENTO_2026 = {
  impostosDiretos: 13_537_113.41,
  taxas: 1_129_078.19,
  imi: 5_963_898.91,
  imt: 3_776_467.69,
  derrama: 2_411_434.52,
  iuc: 1_385_112.29,
};
// Propostas da IL (programa autárquico de 2025, área Fiscalidade).
const PROPOSTA_IRS = 2;
const MINIMO_IMI = 0.3;

// Os cartazes da campanha sobre impostos (os mesmos de /ideias/cartazes).
const CARTAZES = [
  {
    src: "/images/cartazes/cartaz-59.jpeg",
    w: 413,
    h: 516,
    alt: "Cartaz: Farto de ser saco de pancada? Altos impostos, taxas e taxinhas, baixos salários. Liberta-te.",
    legenda: "Farto de ser saco de pancada? Altos impostos, taxas e taxinhas, baixos salários.",
  },
  {
    src: "/images/cartazes/cartaz-60.jpeg",
    w: 384,
    h: 512,
    alt: "Tenda da Iniciativa Liberal com o jogo Chuta ao imposto: IVA, IRC e IRS, por um sistema fiscal mais justo",
    legenda: "Chuta ao imposto: a nossa tenda na rua, por um sistema fiscal mais justo.",
  },
];

// Os artigos de opinião sobre os impostos da Câmara (temas "impostos" e "camara"), do mais recente para o mais antigo.
const artigos = [...itens.artigos, ...itens.noticias, ...itens.comunicados]
  .filter((a) => a.temas?.includes("impostos") && a.temas.includes("camara"))
  .sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));

const m = (v: number) => `${(v / 1e6).toFixed(1).replace(".", ",")} M€`;
const grupos = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function Impostos() {
  // Taxas em vigor: as últimas deliberações da Assembleia Municipal.
  const imiAtual = [...imi].reverse().find((x) => x.urbanos !== null)!;
  const irsAtual = [...irs].reverse().find((x) => !x.retificacao && x.percentagem !== null && x.percentagem >= 1)!;
  const derramaAtual = [...derrama].reverse().find((x) => x.normal !== null)!;
  const familiar = [...imiFamiliar].reverse().find((x) => !x.retificacao && x.um !== null) ?? null;
  const anoRendimentos = Number(irsAtual.sessao.slice(0, 4)) + 1;

  // Receita do IMI, IMT, IUC, derrama e participação no IRS (INE, com dados da DGAL), por ano.
  const impostos = receitaPorImposto();
  const periodos = impostos[0].periodos;
  const total = periodos.map((_, k) => impostos.reduce((a, i) => a + (i.total[k] ?? 0), 0));
  const em = (ano: string) => total[periodos.indexOf(ano)];
  const de = (slug: string, ano: string) => impostos.find((i) => i.slug === slug)!.total[periodos.indexOf(ano)] ?? 0;
  const pop = porSlug("populacao_media_residente")!;
  const popEm = (ano: string) => pop.linhas.find((l) => l.periodo === ano)!.valores[0].v as number;
  const A = "2015", B = periodos[periodos.length - 1];
  const subida = (b: number, a: number) => Math.round((b / a - 1) * 100);
  const fiscalidade = areas.find((a) => a.nome === "Fiscalidade")!;

  return (
    <>
      <HeroImpostos />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6">
        <section>
          <Taxometro totalAno={ORCAMENTO_2026.impostosDiretos + ORCAMENTO_2026.taxas} ano={2026} />
          <p className="mt-3 max-w-3xl text-sm text-ink/70">
            Fonte:{" "}
            <a href={FONTE_ORCAMENTO} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy">
              Relatório do Orçamento de 2026 ↗
            </a>{" "}
            (Quadros 4 e 6): {m(ORCAMENTO_2026.impostosDiretos)} de impostos diretos (IMI {m(ORCAMENTO_2026.imi)}, IMT{" "}
            {m(ORCAMENTO_2026.imt)}, derrama {m(ORCAMENTO_2026.derrama)} e IUC {m(ORCAMENTO_2026.iuc)}) e {m(ORCAMENTO_2026.taxas)} de
            taxas, multas e outras penalidades.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-ink/70">
            <strong className="text-ink/85">Porque fica abaixo dos {m(em(B))} de {B}?</strong> O taxómetro usa o valor do orçamento
            de 2026, e há duas diferenças. Primeiro, a lei obriga a Câmara a prever os impostos no orçamento com prudência: no
            máximo, a média do que cobrou nos 24 meses anteriores. Por isso o orçamento fica abaixo do que se cobrou em {B}: só
            nestes quatro impostos, foram {m(em(B) - de("receita_participacao_irs", B))} (o IMT rendeu {m(de("receita_imt", B))} e
            está previsto em {m(ORCAMENTO_2026.imt)}). Segundo, o taxómetro não conta a parte do IRS (
            {m(de("receita_participacao_irs", B))} em {B}), que no orçamento entra como transferência do Estado e não como imposto.
          </p>
        </section>

        <section>
          <p className={`${etiqueta} text-cyan-dark`}>A receita dos impostos</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Quanto rendem os impostos à Câmara</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-2xl bg-mist p-6">
              <p className="font-display text-5xl font-bold text-pink">{m(em(B))}</p>
              <p className="mt-3 font-bold leading-snug text-navy">
                em impostos em {B} ({m(em(A))} em {A}, {subida(em(B), em(A)) >= 0 ? "+" : ""}
                {subida(em(B), em(A))}%)
              </p>
            </li>
            <li className="rounded-2xl bg-mist p-6">
              <p className="font-display text-5xl font-bold text-pink">{m(de("receita_participacao_irs", B))}</p>
              <p className="mt-3 font-bold leading-snug text-navy">
                da parte do IRS dos trofenses ({m(de("receita_participacao_irs", A))} em {A})
              </p>
            </li>
            <li className="rounded-2xl bg-mist p-6">
              <p className="font-display text-5xl font-bold text-pink">{grupos(em(B) / popEm(B))} €</p>
              <p className="mt-3 font-bold leading-snug text-navy">
                por habitante em {B} ({grupos(em(A) / popEm(A))} € em {A})
              </p>
            </li>
            <li className="rounded-2xl bg-mist p-6">
              <p className="font-display text-5xl font-bold text-pink">{m(de("receita_imt", B))}</p>
              <p className="mt-3 font-bold leading-snug text-navy">
                de IMT, pago por quem compra casa ({m(de("receita_imt", A))} em {A})
              </p>
            </li>
          </ul>
          <p className="mt-6 max-w-3xl text-lg text-ink/85">
            Conta-se o IMI, o IMT, o IUC, a derrama e a parte do IRS dos trofenses que fica na Câmara. Os {m(em(B))} de {B} são:
            IMI {m(de("receita_imi", B))}, IMT {m(de("receita_imt", B))}, derrama {m(de("receita_derrama", B))}, parte do IRS{" "}
            {m(de("receita_participacao_irs", B))} e IUC {m(de("receita_iuc", B))}. A receita do IMI ficou
            perto dos 6 M€ por ano: a taxa desceu de 0,45% (em 2019) para {String(imiAtual.urbanos).replace(".", ",")}% (em{" "}
            {imiAtual.paraAno}), mas continua acima do mínimo da lei, 0,30%. O que mais cresceu foi o IMT, pago na compra de
            casas, seguido da parte do IRS e da derrama.
          </p>
          <div className="mt-8 max-w-4xl">
            <Grafico
              periodos={periodos}
              series={impostos.map((i) => ({ nome: i.nome, valores: i.total }))}
              unidade="€"
              emMilhoes
              semComparar
              nivel
            />
          </div>
          <p className="mt-3 max-w-3xl text-sm text-ink/70">
            Receita de cada imposto, em euros de cada ano (sem descontar a inflação). Fonte: INE, com dados da Direção-Geral das
            Autarquias Locais. Cada imposto por habitante, ao lado da Área Metropolitana e dos concelhos vizinhos, está nas{" "}
            <Link href="/dados/financas#impostos" className="underline underline-offset-2 hover:text-navy">
              finanças do município
            </Link>
            .
          </p>
        </section>

        <section id="contas" className="scroll-mt-24">
          <p className={`${etiqueta} text-cyan-dark`}>Quanto pagas tu</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Faz as contas</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <SimuladorIMI
              taxa={imiAtual.urbanos!}
              minimo={MINIMO_IMI}
              ano={imiAtual.paraAno}
              deducoes={familiar ? { um: familiar.um!, dois: familiar.dois!, tres: familiar.tres! } : null}
            />
            <SimuladorIRS taxa={irsAtual.percentagem!} proposta={PROPOSTA_IRS} anoRendimentos={anoRendimentos} />
          </div>
          <p className="mt-6 max-w-3xl text-ink/85">
            E as empresas pagam derrama: {String(derramaAtual.normal).replace(".", ",")}% do lucro tributável, o máximo que a lei
            permite, e {String(derramaAtual.reduzida).replace(".", ",")}% para as que faturam até 150 mil euros por ano.
          </p>
        </section>

        <section id="propostas" className="scroll-mt-24 rounded-3xl bg-navy p-8 text-white md:p-12">
          <p className={`${etiqueta} text-sun`}>O que propomos</p>
          <h2 className="font-display mt-3 text-3xl font-bold md:text-4xl">{fiscalidade.lema}</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {fiscalidade.medidas.map((t, k) => (
              <li key={t} className="flex gap-4 rounded-2xl bg-navy-soft p-5">
                <span className="font-display text-xl font-bold text-sun">{String(k + 1).padStart(2, "0")}</span>
                <span className="text-lg font-bold">{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-white/90">
            Do nosso programa autárquico de 2025.{" "}
            <Link href="/autarquicas-2025/programa" className="font-bold text-sun underline underline-offset-2">
              Ver o programa
            </Link>
          </p>
        </section>

        <section>
          <p className={`${etiqueta} text-cyan-dark`}>Na rua</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Liberta-te</h2>
          <ul className="mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
            {CARTAZES.map((c) => (
              <li key={c.src}>
                <figure>
                  <Image src={c.src} alt={c.alt} width={c.w} height={c.h} className="h-auto w-full rounded-2xl" sizes="(min-width: 640px) 28rem, 100vw" />
                  <figcaption className="mt-3 font-bold text-navy">{c.legenda}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink/80">
            Estes e os outros cartazes estão em{" "}
            <Link href="/ideias/cartazes" className="font-bold text-cyan-dark underline underline-offset-2">
              Cartazes
            </Link>
            .
          </p>
        </section>

        <section>
          <p className={`${etiqueta} text-cyan-dark`}>O que temos escrito</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Os impostos da Câmara, há anos</h2>
          <ul className="mt-8 divide-y divide-mist border-y border-mist">
            {artigos.map((a) => (
              <li key={a.href}>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="font-display text-xl font-bold text-navy group-hover:underline">{a.titulo} ↗</span>
                  <span className="shrink-0 text-sm text-ink/70">
                    {a.fonte ? `${a.fonte} · ` : ""}
                    {formatarData(a.data)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink/80">
            Todos os artigos de opinião em{" "}
            <Link href="/imprensa?t=artigos" className="font-bold text-cyan-dark underline underline-offset-2">
              Imprensa e eventos
            </Link>
            .
          </p>
        </section>

        <p className="max-w-3xl text-sm text-ink/70">
          As taxas são as das deliberações da Assembleia Municipal (IMI de {imiAtual.paraAno} e participação no IRS dos
          rendimentos de {anoRendimentos}), com as votações em{" "}
          <Link href="/dados/financas#taxas" className="underline underline-offset-2 hover:text-navy">
            Taxas e impostos locais
          </Link>
          . A população é a média anual residente do INE.
        </p>
      </div>
    </>
  );
}
