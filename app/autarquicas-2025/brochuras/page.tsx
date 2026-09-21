import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Brochuras — Autárquicas 2025" };

const brochuras = ["/images/geral/brochura-1.png", "/images/geral/brochura-2.png"];

export default function Brochuras() {
  return (
    <>
      <PageHero eyebrow="Autárquicas 2025" title="Brochuras">
        Os materiais impressos da campanha Trofa Para Cima.
      </PageHero>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <ul className="grid gap-6 sm:grid-cols-2">
          {brochuras.map((s, i) => (
            <li key={s}>
              <a href={s} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl ring-2 ring-transparent transition hover:ring-pink">
                <Image src={s} alt={`Brochura ${i + 1} da campanha Trofa Para Cima`} width={488} height={731} sizes="(min-width: 640px) 480px, 100vw" className="h-auto w-full" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
