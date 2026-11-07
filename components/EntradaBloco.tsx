import Link from "next/link";

export type Entrada = {
  titulo: string;
  texto: string;
  href: string;
  // Dado vivo ou resumo curto, a destacar por cima do título (ex.: "3 próximos eventos").
  detalhe?: string;
};

// Primeira coisa que se vê ao abrir um bloco do menu: o que lá está e para onde levar.
export default function EntradaBloco({ itens, titulo = "Neste bloco" }: { itens: Entrada[]; titulo?: string }) {
  return (
    <section aria-label={titulo} className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
      <ul
        className={`grid gap-4 sm:grid-cols-2 ${itens.length >= 4 ? "lg:grid-cols-4" : itens.length === 3 ? "lg:grid-cols-3" : ""}`}
      >
        {itens.map((i) => (
          <li key={i.href + i.titulo}>
            <Link
              href={i.href}
              className="group flex h-full flex-col rounded-2xl border-2 border-mist bg-white p-6 transition hover:-translate-y-0.5 hover:border-cyan hover:shadow-lg"
            >
              {i.detalhe && (
                <span className="text-xs font-bold uppercase tracking-widest text-pink">{i.detalhe}</span>
              )}
              <span className="font-display mt-1 text-xl font-bold leading-tight text-navy">{i.titulo}</span>
              <span className="mt-2 flex-1 text-sm text-ink/75">{i.texto}</span>
              <span className="mt-4 font-bold text-cyan-dark group-hover:underline">Abrir →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
