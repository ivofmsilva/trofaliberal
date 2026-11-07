import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EntradaBloco from "@/components/EntradaBloco";
import ItemCard from "@/components/ItemCard";
import PageHero from "@/components/PageHero";
import { outros, proximos } from "@/lib/eventos";
import { categorias, ordenados, type Categoria } from "@/lib/imprensa";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Imprensa e Eventos — Iniciativa Liberal Trofa" };

const ordem: Categoria[] = ["noticias", "artigos", "comunicados"];

const series = [
  {
    titulo: "LIT — Jornadas Liberais da Trofa",
    texto: "O nosso ciclo de debates temáticos, aberto a toda a comunidade.",
    href: "/eventos/lit",
    cta: "Ver jornadas →",
  },
  {
    titulo: "Aqui há Parlamento",
    texto: "Levamos o debate político para o dia a dia da Trofa.",
    href: "/eventos/aqui-ha-parlamento",
    cta: "Saber mais →",
  },
];

export default function Imprensa() {
  // Categorias sem itens (ex.: artigos de opinião) não aparecem até haver conteúdo.
  const categoriasComItens = ordem.filter((cat) => ordenados(cat).length > 0);
  const n = (cat: Categoria) => ordenados(cat).length;
  const entradas = [
    {
      titulo: "Eventos",
      detalhe: proximos.length ? `${proximos.length} agendado${proximos.length > 1 ? "s" : ""}` : "Sem eventos agendados",
      texto: "Jornadas Liberais, Aqui há Parlamento e as nossas ações na Trofa.",
      href: "/imprensa#eventos",
    },
    ...categoriasComItens.map((cat) => ({
      titulo: categorias[cat].titulo,
      detalhe: `${n(cat)} ${n(cat) > 1 ? "publicados" : "publicado"}`,
      texto: categorias[cat].descricao,
      href: `/imprensa#${cat}`,
    })),
    {
      titulo: "Autárquicas 2025",
      detalhe: "Arquivo da campanha",
      texto: "Programa, candidatos, apresentações, diário de campanha e materiais da Trofa Para Cima.",
      href: "/autarquicas-2025",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Imprensa e Eventos"
        title="Onde estamos e o que se escreve sobre nós"
        image={{ src: "/images/geral/imprensa-reportagem.jpeg", alt: "Reportagem sobre a IL Trofa", w: 673, h: 1008 }}
      >
        Os nossos encontros, debates e ações na Trofa, e o que a imprensa e os nossos comunicados
        dizem do nosso trabalho.
      </PageHero>

      <EntradaBloco itens={entradas} />

      <section id="eventos" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Eventos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Próximos eventos</h2>
        {proximos.length ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {proximos.map((e) => (
              <li key={e.titulo} className="rounded-2xl bg-navy p-8 text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-sun">{e.data}</p>
                <h3 className="font-display mt-2 text-2xl font-bold">{e.titulo}</h3>
                {e.local && <p className="mt-2 text-white/75">{e.local}</p>}
                {e.href && (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-sun hover:underline">
                    Mais informação ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 max-w-xl rounded-2xl bg-mist p-6 text-ink/75">
            Sem eventos agendados no momento. Fica atento aos nossos canais:{" "}
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
              Instagram
            </a>
            ,{" "}
            <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
              Facebook
            </a>{" "}
            e{" "}
            <Link href={links.convite} className="font-bold text-cyan-dark hover:underline">
              WhatsApp (pede convite)
            </Link>
            .
          </p>
        )}

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {series.map((s, i) => (
            <li key={s.href} className="rounded-2xl bg-navy p-8 text-white">
              <span className="font-display text-sm font-bold text-sun">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-3 text-3xl font-bold">{s.titulo}</h3>
              <p className="mt-3 text-white/75">{s.texto}</p>
              <Link href={s.href} className="mt-6 inline-block font-bold text-sun hover:underline">
                {s.cta}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="font-display mt-16 text-3xl font-bold text-navy">Outros eventos</h3>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outros.map((o) => (
            <li key={o.titulo} className="overflow-hidden rounded-2xl border-2 border-mist transition hover:border-pink">
              <Image src={o.imagem} alt={o.titulo} width={480} height={320} sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[3/2] w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-dark">{o.quando}</p>
                <h4 className="font-display mt-2 text-2xl font-bold text-navy">{o.titulo}</h4>
                <p className="mt-3 text-ink/75">{o.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-mist">
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6">
          {categoriasComItens.map((cat) => {
            const c = categorias[cat];
            const [maisRecente] = ordenados(cat);
            return (
              <section key={cat} id={cat} className="scroll-mt-24">
                <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">{c.titulo}</h2>
                <p className="mt-2 max-w-2xl text-ink/75">{c.descricao}</p>
                <div className="mt-8 max-w-2xl">
                  <ItemCard item={maisRecente} />
                  <Link
                    href={`/imprensa/${cat}`}
                    className="mt-5 inline-block rounded-full border-2 border-navy px-7 py-2 font-bold text-navy transition hover:bg-navy hover:text-white"
                  >
                    {c.verTodos}
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
