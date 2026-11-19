import type { Metadata } from "next";
import Link from "next/link";

// Página de erro (endereço que não existe), em português e com caminhos para continuar.
export const metadata: Metadata = {
  title: "Página não encontrada — Iniciativa Liberal Trofa",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink">Erro 404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">Esta página não existe (ou mudou de sítio).</h1>
      <p className="mt-4 text-lg text-navy/80">Confirma o endereço, ou segue por um destes caminhos.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        <li>
          <Link href="/" className="inline-block rounded-full bg-navy px-6 py-3 font-bold text-white transition hover:bg-pink">
            Ir para o início
          </Link>
        </li>
        <li>
          <Link href="/ideias" className="inline-block rounded-full bg-white px-6 py-3 font-bold text-navy ring-2 ring-navy transition hover:bg-sun">
            Ver as ideias
          </Link>
        </li>
        <li>
          <Link href="/participa?t=contactos" className="inline-block rounded-full bg-white px-6 py-3 font-bold text-navy ring-2 ring-navy transition hover:bg-sun">
            Fala connosco
          </Link>
        </li>
      </ul>
    </section>
  );
}
