import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { outros, proximos } from "@/lib/eventos";
import { links } from "@/lib/site";

export const metadata: Metadata = { title: "Eventos — Iniciativa Liberal Trofa" };

export default function Eventos() {
  return (
    <>
      <PageHero eyebrow="Eventos" title="Encontros, debates e ação na Trofa">
        Para promover o espírito liberal e o envolvimento local, organizamos regularmente
        encontros, debates e ações na Trofa. Acompanha o nosso calendário e não deixes escapar as
        novidades.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Calendário</p>
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
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-dark hover:underline">
              WhatsApp
            </a>
            .
          </p>
        )}
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-navy-soft p-8">
            <span className="font-display text-sm font-bold text-sun">01</span>
            <h2 className="font-display mt-3 text-3xl font-bold">LIT — Jornadas Liberais da Trofa</h2>
            <p className="mt-3 text-white/75">O nosso ciclo de debates temáticos, aberto a toda a comunidade.</p>
            <Link href="/eventos/lit" className="mt-6 inline-block font-bold text-sun hover:underline">
              Ver jornadas →
            </Link>
          </div>
          <div className="rounded-2xl bg-navy-soft p-8">
            <span className="font-display text-sm font-bold text-sun">02</span>
            <h2 className="font-display mt-3 text-3xl font-bold">Aqui há Parlamento</h2>
            <p className="mt-3 text-white/75">Levamos o debate político para o dia a dia da Trofa.</p>
            <Link href="/eventos/aqui-ha-parlamento" className="mt-6 inline-block font-bold text-sun hover:underline">
              Saber mais →
            </Link>
          </div>
        </div>
      </section>

      <section id="outros" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-dark">Outros eventos</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Entre outros</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outros.map((o) => (
            <li key={o.titulo} className="overflow-hidden rounded-2xl border-2 border-mist transition hover:border-pink">
              <Image src={o.imagem} alt={o.titulo} width={480} height={320} sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[3/2] w-full object-cover" />
              <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-dark">{o.quando}</p>
              <h3 className="font-display mt-2 text-2xl font-bold text-navy">{o.titulo}</h3>
              <p className="mt-3 text-ink/75">{o.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
