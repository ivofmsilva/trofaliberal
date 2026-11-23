import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
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
const ORCAMENTO_2026 = { impostosDiretos: 13_537_113.41, taxas: 1_129_078.19 };
// Propostas da IL (programa autárquico de 2025, área Fiscalidade).
const PROPOSTA_IRS = 2;
const MINIMO_IMI = 0.3;

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
      <PageHero eyebrow="Ideias" title="Impostos na Trofa">
        Quanto a Câmara cobra, quanto pagas tu e o que propomos. {fiscalidade.lema}.
      </PageHero>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6">
        <section>
          <Taxometro totalAno={ORCAMENTO_2026.impostosDiretos + ORCAMENTO_2026.taxas} ano={2026} />
          <p className="mt-3 max-w-3xl text-sm text-ink/70">
            Fonte:{" "}
            <a href={FONTE_ORCAMENTO} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy">
              Relatório do Orçamento de 2026 ↗
            </a>{" "}
            (Quadro 4): {m(ORCAMENTO_2026.impostosDiretos)} de impostos diretos e {m(ORCAMENTO_2026.taxas)} de taxas, multas e outras
            penalidades. O orçamento faz a previsão pela média dos últimos dois anos; em {B} a Câmara cobrou mais do que isto em
            impostos.
          </p>
        </section>

        <section>
          <p className={`${etiqueta} text-cyan-dark`}>A receita dos impostos</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">A Câmara cobra cada vez mais</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <li className="rounded-2xl bg-mist p-6">
              <p className="font-display text-5xl font-bold text-pink">+{subida(em(B), em(A))}%</p>
              <p className="mt-3 font-bold leading-snug text-navy">
                na receita de impostos em 10 anos: de {m(em(A))} em {A} para {m(em(B))} em {B}
              </p>
            </li>
            <li className="rounded-2xl bg-mist p-6">
              <p className="font-display text-5xl font-bold text-pink">+{subida(popEm(B), popEm(A))}%</p>
              <p className="mt-3 font-bold leading-snug text-navy">
                de habitantes no mesmo tempo: de {grupos(popEm(A))} para {grupos(popEm(B))}
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
            Conta-se o IMI, o IMT, o IUC, a derrama e a parte do IRS dos trofenses que fica na Câmara. A receita do IMI ficou
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

        <section>
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

        <section className="rounded-3xl bg-navy p-8 text-white md:p-12">
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
          <p className="mt-6 text-white/80">
            Do nosso programa autárquico de 2025.{" "}
            <Link href="/autarquicas-2025/programa" className="font-bold text-sun underline underline-offset-2">
              Ver o programa
            </Link>
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
