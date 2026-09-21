import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InstagramEmbed, { igId } from "@/components/InstagramEmbed";
import PageHero from "@/components/PageHero";
import { diario } from "@/lib/autarquicas";

export const dynamicParams = false;

export function generateStaticParams() {
  return diario.map((d) => ({ dia: String(d.dia) }));
}

export async function generateMetadata({ params }: { params: Promise<{ dia: string }> }): Promise<Metadata> {
  const { dia } = await params;
  const d = diario.find((x) => String(x.dia) === dia);
  return { title: d ? `Dia ${d.dia} — ${d.tema} — Diário de campanha` : "Diário de campanha" };
}

export default async function Dia({ params }: { params: Promise<{ dia: string }> }) {
  const { dia } = await params;
  const d = diario.find((x) => String(x.dia) === dia);
  if (!d) notFound();
  const anterior = diario.find((x) => x.dia === d.dia - 1);
  const seguinte = diario.find((x) => x.dia === d.dia + 1);

  return (
    <>
      <PageHero eyebrow={`Diário de campanha · Dia ${d.dia}`} title={d.tema} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_420px]">
        <article className="space-y-5 text-lg text-ink/85">
          {d.paragrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </article>
        <aside>
          <InstagramEmbed id={igId(d.href)} titulo={`Dia ${d.dia} — ${d.tema}`} altura={720} />
        </aside>
      </div>
      <nav className="mx-auto flex max-w-7xl justify-between gap-4 px-4 pb-20 sm:px-6" aria-label="Dias">
        {anterior ? (
          <Link href={`/autarquicas-2025/diario/${anterior.dia}`} className="rounded-full border-2 border-navy px-6 py-2 font-bold text-navy transition hover:bg-navy hover:text-white">
            ← Dia {anterior.dia}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/autarquicas-2025/diario" className="self-center font-bold text-cyan-dark hover:underline">
          Todos os dias
        </Link>
        {seguinte ? (
          <Link href={`/autarquicas-2025/diario/${seguinte.dia}`} className="rounded-full border-2 border-navy px-6 py-2 font-bold text-navy transition hover:bg-navy hover:text-white">
            Dia {seguinte.dia} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
