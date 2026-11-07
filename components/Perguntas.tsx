import Link from "next/link";

export type Pergunta = { p: string; r: string; href?: string; hrefLabel?: string };

// Perguntas e respostas que se abrem ao toque, sem JavaScript (usa <details>).
export default function Perguntas({ itens }: { itens: Pergunta[] }) {
  return (
    <ul className="space-y-3">
      {itens.map((i, n) => (
        <li key={i.p}>
          <details className="group rounded-2xl bg-white shadow-sm ring-1 ring-navy/10 open:shadow-lg" open={n === 0}>
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
              <span className="font-display flex-1 text-lg font-bold leading-tight text-navy sm:text-xl">{i.p}</span>
              <span aria-hidden className="text-2xl font-bold text-navy transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="border-t-2 border-mist px-5 py-5 sm:px-6">
              <p className="text-ink/85">{i.r}</p>
              {i.href && (
                <Link href={i.href} className="mt-3 inline-block font-bold text-cyan-dark hover:underline">
                  {i.hrefLabel ?? "Saber mais"} →
                </Link>
              )}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
