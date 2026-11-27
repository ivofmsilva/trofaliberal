import type { Metadata } from "next";
import Artigos from "./Artigos";
import { CIFRADO } from "./cifrado";

// Página escondida para o núcleo rever artigos de opinião antes de saírem (pedido do Ivo, 26/11/2026). Só existe na
// pré-visualização (ramo rever-artigos): não vai para o site publicado, não está no menu nem no mapa do site, e o
// texto está cifrado — a chave vai só no link partilhado.
export const metadata: Metadata = {
  title: "Artigos para rever — IL Trofa",
  robots: { index: false, follow: false },
};

export default function ReverArtigos() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-pink">Só para o núcleo · por publicar</p>
      <h1 className="font-display mt-2 text-4xl font-bold text-navy">Artigos de opinião para rever</h1>
      <p className="mt-3 text-lg text-ink/80">Os artigos antes de saírem. Lê e diz o que achas.</p>
      <div className="mt-8">
        <Artigos cifrado={CIFRADO} />
      </div>
    </section>
  );
}
